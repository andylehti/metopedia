# Metopedia Jekyll plugin and automation setup

This source package uses GitHub Pages-supported Jekyll plugins only by default:

- `jekyll-sitemap`: automatically creates `/sitemap.xml` from pages included in the build.
- `jekyll-seo-tag`: creates canonical, Open Graph, Twitter, JSON-LD, and other SEO metadata from site/page front matter.
- `jekyll-feed`: prepares RSS/Atom feed support for future posts or update streams.
- `jekyll-redirect-from`: allows future redirect aliases through front matter.
- `jemoji`: enables GitHub-style emoji handling.

The site also uses Liquid loops to auto-build:

- `/Special/AllPages/`
- `/Special/Categories/`
- `/Special/Sitemap/`
- the browser search index embedded into each page

## Adding a new page

Create a new file in `pages/`, for example:

```md
---
title: "New Research Page"
description: "Short search/SEO summary."
permalink: "/New_Research_Page/"
wiki_page: true
slug_name: "New_Research_Page"
wiki_categories: ["Research", "Metopedia"]
last_modified: "2026-04-25"
---

Page content here.
```

After commit/push, Jekyll rebuilds the site. The page appears in All Pages, Categories, search, and the sitemap without editing a manual index file.

## GitHub Pages mode

For the most automation, set GitHub Pages to **GitHub Actions** and use `.github/workflows/pages.yml`.

If you keep the older **Deploy from a branch** mode, GitHub Pages will still build supported plugins, but the Actions workflow will not be used as the deployment source.

## Unsupported plugins

Plugins such as custom wikilink generators, advanced backlink engines, or custom converters can be added later if the site is deployed through GitHub Actions. They should not be added to the managed branch-build mode unless they are listed as GitHub Pages-supported plugins.
