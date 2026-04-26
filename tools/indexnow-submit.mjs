#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const buildDir = process.env.INDEXNOW_BUILD_DIR || "_site";
const siteUrlRaw = process.env.INDEXNOW_SITE_URL;
const key = process.env.INDEXNOW_KEY;
const endpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const dryRun = (process.env.INDEXNOW_DRY_RUN || "false").toLowerCase() === "true";

if (!siteUrlRaw || !key) {
  console.log("IndexNow skipped: INDEXNOW_SITE_URL or INDEXNOW_KEY is not set.");
  process.exit(0);
}

const siteUrl = siteUrlRaw.replace(/\/$/, "");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      return [fullPath];
    })
  );
  return files.flat();
}

function toUrl(filePath) {
  const rel = path.relative(buildDir, filePath).replaceAll(path.sep, "/");

  if (rel === "index.html") return `${siteUrl}/`;
  if (rel.endsWith("/index.html")) return `${siteUrl}/${rel.slice(0, -"index.html".length)}`;
  return `${siteUrl}/${rel}`;
}

const allFiles = await walk(buildDir);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
const urls = [...new Set(htmlFiles.map(toUrl))].sort();

if (!urls.length) {
  console.log(`IndexNow skipped: no HTML files found in ${buildDir}.`);
  process.exit(0);
}

const payload = {
  host: new URL(siteUrl).host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: urls,
};

if (dryRun) {
  console.log(`IndexNow dry-run: ${urls.length} URL(s) prepared for submission.`);
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

if (response.ok || response.status === 202) {
  console.log(`IndexNow submitted ${urls.length} URL(s). Status: ${response.status}`);
  process.exit(0);
}

const body = await response.text();
console.error(`IndexNow failed. Status: ${response.status}. Body: ${body}`);
process.exit(1);
