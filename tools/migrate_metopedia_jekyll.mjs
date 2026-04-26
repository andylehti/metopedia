import fs from 'fs';
import path from 'path';

const srcRoot = '/mnt/data/jekyll_work';
const outRoot = '/mnt/data/metopedia_jekyll';
fs.rmSync(outRoot, { recursive: true, force: true });
fs.mkdirSync(outRoot, { recursive: true });

const siteIndex = JSON.parse(fs.readFileSync(path.join(srcRoot, 'Snippets/site-index.json'), 'utf8'));

const pageBySlug = new Map();
for (const p of siteIndex) pageBySlug.set(p.slug, p);

function titleFromSlug(slug){
  return slug.split('/').pop().replace(/^.*:/,'').replace(/_/g,' ').replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
}

function cleanUrl(slug){
  if (!slug || slug === 'Main_Page') return '/';
  if (slug.startsWith('Special:')) return '/' + slug.replace(/^Special:/,'Special/').replace(/_/g,'_') + '/';
  if (slug.includes(':')) {
    const [ns, rest] = slug.split(':');
    return '/' + ns + '/' + rest.replace(/^\//,'').replace(/\/+/g,'/') + '/';
  }
  return '/' + slug + '/';
}

function htmlEscape(s){
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function attrEscape(s){ return htmlEscape(s).replace(/'/g,'&#39;'); }

function splitFrontMatter(raw){
  if (!raw.startsWith('---\n')) return [{}, raw];
  const end = raw.indexOf('\n---', 4);
  if (end < 0) return [{}, raw];
  const yaml = raw.slice(4, end).trim();
  const body = raw.slice(raw.indexOf('\n', end + 1) + 1);
  const meta = {};
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1,-1);
    meta[m[1]] = v;
  }
  return [meta, body];
}

function convertWikiLinks(text){
  // External MediaWiki links: [https://url Label]
  text = text.replace(/\[(https?:\/\/[^\s\]]+)\s+([^\]]+)\]/g, (m, url, label) => `<a class="external" href="${attrEscape(url)}">${convertInline(label)}</a>`);
  text = text.replace(/\[mailto:([^\s\]]+)\s+([^\]]+)\]/g, (m, mail, label) => `<a class="external" href="mailto:${attrEscape(mail)}">${convertInline(label)}</a>`);
  // Markdown links
  text = text.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\)]+)\)/g, (m, label, url) => `<a class="external" href="${attrEscape(url)}">${convertInline(label)}</a>`);
  text = text.replace(/\[([^\]\n]+)\]\(([^\)]+)\)/g, (m, label, url) => `<a href="${attrEscape(url)}">${convertInline(label)}</a>`);
  // Internal links
  text = text.replace(/\[\[([^\]|#]+)#([^\]|]+)\|([^\]]+)\]\]/g, (m, slug, anchor, label) => `<a href="${cleanUrl(slug)}#${slugify(anchor)}">${convertInline(label)}</a>`);
  text = text.replace(/\[\[#([^\]|]+)\|([^\]]+)\]\]/g, (m, anchor, label) => `<a href="#${slugify(anchor)}">${convertInline(label)}</a>`);
  text = text.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (m, slug, label) => {
    if (slug.startsWith('Category:')) return `<a href="/Special/Categories/#${slugify(slug.slice(9))}">${convertInline(label)}</a>`;
    return `<a href="${cleanUrl(slug)}">${convertInline(label)}</a>`;
  });
  text = text.replace(/\[\[([^\]]+)\]\]/g, (m, slug) => {
    if (slug.startsWith('Category:')) return '';
    if (slug.startsWith('#')) return `<a href="#${slugify(slug.slice(1))}">${htmlEscape(slug.slice(1))}</a>`;
    return `<a href="${cleanUrl(slug)}">${htmlEscape(pageBySlug.get(slug)?.title || titleFromSlug(slug))}</a>`;
  });
  return text;
}

function convertInline(text){
  if (text == null) return '';
  text = String(text);
  // Protect inline HTML code/math tags enough to avoid escaping them.
  text = htmlEscape(text);
  text = text.replace(/&lt;(\/?(?:code|math|sup|sub|br|span|small|b|i|em|strong|a))([^>]*)&gt;/g, (m, tag, attrs) => '<' + tag + attrs.replace(/&quot;/g, '"') + '>');
  text = text.replace(/'''''([^']+)'''''/g, '<b><i>$1</i></b>');
  text = text.replace(/'''([^']+)'''/g, '<b>$1</b>');
  text = text.replace(/''([^']+)''/g, '<i>$1</i>');
  text = convertWikiLinks(text);
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  return text;
}

function slugify(s){
  return String(s || '').toLowerCase().replace(/<[^>]+>/g,'').replace(/&[^;]+;/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'section';
}

function parseAttrs(attrsRaw){
  const attrs = {};
  if (!attrsRaw) return attrs;
  const classMatch = attrsRaw.match(/class="([^"]+)"/);
  if (classMatch) attrs.class = classMatch[1];
  const colspanMatch = attrsRaw.match(/colspan="?([^"\s]+)"?/);
  if (colspanMatch) attrs.colspan = colspanMatch[1];
  const rowspanMatch = attrsRaw.match(/rowspan="?([^"\s]+)"?/);
  if (rowspanMatch) attrs.rowspan = rowspanMatch[1];
  return attrs;
}

function attrsToString(attrs){
  return Object.entries(attrs).map(([k,v]) => ` ${k}="${attrEscape(v)}"`).join('');
}

function splitCells(line, header=false){
  let body = line.slice(1).trim();
  const sepRegex = header ? (/!!/.test(body) ? /!!/ : /\|\|/) : /\|\|/;
  const cells = body.split(sepRegex).map(c => c.trim());
  return cells.map(cell => {
    const m = cell.match(/^([^|]+?)\s*\|\s*(.*)$/);
    if (m && /=|class|colspan|rowspan|style/.test(m[1])) {
      return { attrs: parseAttrs(m[1]), text: m[2].trim() };
    }
    return { attrs: {}, text: cell };
  });
}

function convertTable(lines, startIndex){
  let first = lines[startIndex].trim();
  const isNav = /class="navbox"/.test(first);
  let html = isNav ? '<div class="navbox-shell"><table class="navbox">' : '<div class="wikitable-wrap"><table class="wikitable">';
  let i = startIndex + 1;
  let inRow = false;
  const closeRow = () => { if (inRow) { html += '</tr>'; inRow = false; } };
  while (i < lines.length) {
    const l = lines[i].trim();
    if (l === '|}') { closeRow(); html += '</table></div>'; return { html, next: i + 1 }; }
    if (l.startsWith('|+')) { html += `<caption>${convertInline(l.slice(2).trim())}</caption>`; i++; continue; }
    if (l === '|-') { closeRow(); html += '<tr>'; inRow = true; i++; continue; }
    if (l.startsWith('!')) {
      if (!inRow) { html += '<tr>'; inRow = true; }
      const cells = splitCells(l, true);
      for (const c of cells) html += `<th${attrsToString(c.attrs)}>${convertInline(c.text)}</th>`;
      i++; continue;
    }
    if (l.startsWith('|')) {
      if (!inRow) { html += '<tr>'; inRow = true; }
      const cells = splitCells(l, false);
      for (const c of cells) html += `<td${attrsToString(c.attrs)}>${convertInline(c.text)}</td>`;
      i++; continue;
    }
    i++;
  }
  closeRow(); html += '</table></div>'; return { html, next: i };
}

function parseTemplateBlock(lines, startIndex, templateName){
  let raw = lines[startIndex] + '\n';
  let i = startIndex + 1;
  while (i < lines.length) {
    raw += lines[i] + '\n';
    if (lines[i].trim() === '}}') break;
    i++;
  }
  return { raw, next: i + 1 };
}

function convertInfobox(raw){
  const rows = [];
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\|\s*([^=]+?)\s*=\s*(.*)$/);
    if (!m) continue;
    rows.push({ key: m[1].trim(), val: m[2].trim() });
  }
  if (!rows.length) return '';
  let title = rows.find(r => /^title$/i.test(r.key))?.val || '';
  let sub = rows.find(r => /^subheader$/i.test(r.key))?.val || '';
  let html = '<table class="infobox">';
  if (title) html += `<tr><th colspan="2" class="infobox-header">${convertInline(title)}</th></tr>`;
  if (sub) html += `<tr><th colspan="2" class="infobox-subheader">${convertInline(sub)}</th></tr>`;
  for (const r of rows) {
    if (/^(title|subheader|image|caption)$/i.test(r.key)) continue;
    if (!r.val) continue;
    html += `<tr><th class="infobox-label">${htmlEscape(r.key)}</th><td>${convertInline(r.val)}</td></tr>`;
  }
  html += '</table>';
  return html;
}

function processReferences(text){
  const refs = [];
  const nameMap = new Map();
  let count = 0;
  text = text.replace(/<ref\s+name="([^"]+)"\s*>([\s\S]*?)<\/ref>/g, (m, name, body) => {
    if (!nameMap.has(name)) { count++; const obj = { name, index: count, body, cites: [] }; nameMap.set(name, obj); refs.push(obj); }
    const ref = nameMap.get(name);
    const citeNum = ref.cites.length + 1;
    const citeId = `cite_ref-${slugify(name)}_${citeNum}`;
    ref.cites.push(citeId);
    return `<sup id="${citeId}" class="reference"><a href="#cite_note-${slugify(name)}">[${ref.index}]</a></sup>`;
  });
  text = text.replace(/<ref\s+name="([^"]+)"\s*\/?\s*>/g, (m, name) => {
    if (!nameMap.has(name)) { count++; nameMap.set(name, { index: count, body: 'Named reference not defined.', cites: [] }); refs.push({ name, index: count, body: 'Named reference not defined.', cites: [] }); }
    const ref = nameMap.get(name);
    const citeNum = ref.cites.length + 1;
    const citeId = `cite_ref-${slugify(name)}_${citeNum}`;
    ref.cites.push(citeId);
    return `<sup id="${citeId}" class="reference"><a href="#cite_note-${slugify(name)}">[${ref.index}]</a></sup>`;
  });
  text = text.replace(/<ref>([\s\S]*?)<\/ref>/g, (m, body) => {
    count++;
    const name = `note-${count}`;
    const citeId = `cite_ref-${slugify(name)}_1`;
    refs.push({ name, index: count, body, cites: [citeId] });
    return `<sup id="${citeId}" class="reference"><a href="#cite_note-${slugify(name)}">[${count}]</a></sup>`;
  });
  const refHtml = refs.length ? `<ol class="references">${refs.map(r => `<li id="cite_note-${slugify(r.name)}"><span class="mw-cite-backlink">${r.cites.map((c,j)=>`<a href="#${c}">↑${r.cites.length>1 ? String.fromCharCode(97+j) : ''}</a>`).join(' ')}</span> ${convertInline(r.body)}</li>`).join('')}</ol>` : '';
  text = text.replace(/<references\s*\/>|{{reflist}}/gi, refHtml);
  if (refs.length && !/<ol class="references">/.test(text)) text += `\n\n<h2 id="references">References</h2>\n${refHtml}`;
  return text;
}

function convertBody(raw, pageTitle){
  let text = raw.replace(/\r\n/g,'\n');
  text = text.replace(/^{{short description\|[^}]+}}\s*/m, '');
  text = text.replace(/\[\[Category:[^\]]+\]\]\s*/g, '');
  text = processReferences(text);
  const preBlocks = [];
  text = text.replace(/<pre>([\s\S]*?)<\/pre>/gi, (m, body) => {
    const idx = preBlocks.length;
    preBlocks.push(`<pre>${htmlEscape(body.trim())}</pre>`);
    return `\n@@PRE${idx}@@\n`;
  });
  const lines = text.split('\n');
  let html = '';
  let i = 0;
  let paragraph = [];
  let listType = null;
  let headingIds = new Map();
  const closeParagraph = () => { if (paragraph.length) { html += `<p>${convertInline(paragraph.join(' '))}</p>\n`; paragraph = []; } };
  const closeList = () => { if (listType) { html += `</${listType}>\n`; listType = null; } };
  const openList = (type) => { if (listType !== type) { closeList(); html += `<${type}>\n`; listType = type; } };
  const makeId = (heading) => {
    let base = slugify(heading);
    let n = headingIds.get(base) || 0;
    headingIds.set(base, n+1);
    return n ? `${base}-${n+1}` : base;
  };
  while (i < lines.length) {
    let line = lines[i];
    let trim = line.trim();
    if (trim === '') { closeParagraph(); closeList(); i++; continue; }
    if (trim.startsWith('@@PRE')) { closeParagraph(); closeList(); html += trim + '\n'; i++; continue; }
    if (trim.startsWith('{{Infobox')) { closeParagraph(); closeList(); const block = parseTemplateBlock(lines,i,'Infobox'); html += convertInfobox(block.raw) + '\n'; i = block.next; continue; }
    if (trim.startsWith('{|')) { closeParagraph(); closeList(); const t = convertTable(lines,i); html += t.html + '\n'; i = t.next; continue; }
    if (/^=+\s*[^=].*?\s*=+$/.test(trim)) {
      closeParagraph(); closeList();
      const m = trim.match(/^(=+)\s*(.*?)\s*=+$/);
      let level = Math.min(6, Math.max(1, m[1].length));
      let htext = m[2].trim();
      // Drop duplicate first h1 matching page title.
      if (level === 1 && htext.toLowerCase() === String(pageTitle).toLowerCase()) { i++; continue; }
      if (level === 1) level = 2;
      html += `<h${level} id="${makeId(htext)}">${convertInline(htext)}</h${level}>\n`;
      i++; continue;
    }
    if (/^\*\s+/.test(trim)) { closeParagraph(); openList('ul'); html += `<li>${convertInline(trim.replace(/^\*\s+/,''))}</li>\n`; i++; continue; }
    if (/^#\s+/.test(trim)) { closeParagraph(); openList('ol'); html += `<li>${convertInline(trim.replace(/^#\s+/,''))}</li>\n`; i++; continue; }
    if (/^#{2,6}\s+/.test(trim)) {
      closeParagraph(); closeList();
      const m = trim.match(/^(#{2,6})\s+(.*)$/);
      const level = Math.min(6, m[1].length);
      const htext = m[2].trim();
      html += `<h${level} id="${makeId(htext)}">${convertInline(htext)}</h${level}>\n`;
      i++; continue;
    }
    if (/^----+$/.test(trim)) { closeParagraph(); closeList(); html += '<hr>\n'; i++; continue; }
    // Raw block-level HTML passthrough if self-contained
    if (/^<\/?(div|table|tr|td|th|blockquote|section|figure|figcaption|p|ul|ol|li|h[1-6])\b/i.test(trim)) { closeParagraph(); closeList(); html += convertWikiLinks(line) + '\n'; i++; continue; }
    paragraph.push(line.trim());
    i++;
  }
  closeParagraph(); closeList();
  html = html.replace(/@@PRE(\d+)@@/g, (m,n) => preBlocks[Number(n)] || '');
  return html;
}

function ensureDir(dir){ fs.mkdirSync(dir, {recursive:true}); }
function writeFile(rel, content){ const fp = path.join(outRoot, rel); ensureDir(path.dirname(fp)); fs.writeFileSync(fp, content); }
function yamlString(v){ return JSON.stringify(String(v || '')); }
function yamlArray(arr){ return '[' + (arr || []).map(x=>JSON.stringify(String(x))).join(', ') + ']'; }

const pages = [];
for (const p of siteIndex) {
  console.error("PAGE", p.slug);
  const srcPath = path.join(srcRoot, p.path.replace(/^\.\//,''));
  if (!fs.existsSync(srcPath)) continue;
  const raw = fs.readFileSync(srcPath, 'utf8');
  const [fm, body] = splitFrontMatter(raw);
  const title = p.title || fm.title || titleFromSlug(p.slug);
  const url = cleanUrl(p.slug);
  const categories = p.categories || [];
  const html = convertBody(body, title);
  const front = `---\nlayout: wiki\ntitle: ${yamlString(title)}\ndescription: ${yamlString(p.description || fm.description || '')}\nkeywords: ${yamlString(p.keywords || fm.keywords || '')}\nauthor: ${yamlString(p.author || fm.author || 'Metopedia Editorial')}\nrobots: ${yamlString(p.robots || fm.robots || 'index,follow,max-image-preview:large')}\nog_image: ${yamlString(p.ogImage || fm.ogImage || '/assets/metopedia-og.png')}\npermalink: ${yamlString(url)}\ncanonical_url: ${yamlString(url)}\nwiki_page: true\nslug_name: ${yamlString(p.slug)}\nsource_path: ${yamlString(p.path)}\nwiki_categories: ${yamlArray(categories)}\nlast_modified: ${yamlString(p.lastModified || '2026-04-25')}\n---\n`;
  const rel = url === '/' ? 'index.html' : path.join(url.replace(/^\//,'').replace(/\/$/,''), 'index.html');
  writeFile(rel, front + html);
  pages.push({slug:p.slug, title, url, description:p.description||fm.description||'', categories, path:p.path});
}
// Main_Page alias redirects to root
writeFile('Main_Page/index.html', `---\nlayout: redirect\ntitle: ${yamlString('Metopedia')}\npermalink: "/Main_Page/"\nredirect_to: "/"\nsitemap: false\n---\n`);

// Special pages
writeFile('Special/AllPages/index.html', `---\nlayout: wiki\ntitle: "All pages"\ndescription: "Alphabetical list of Metopedia pages."\npermalink: "/Special/AllPages/"\nsitemap: false\n---\n<p>This page lists indexed Metopedia entries and application pages.</p>\n<ul class="search-results-list">\n{% assign all_pages = site.pages | where: "wiki_page", true | sort: "title" %}\n{% for p in all_pages %}<li><a href="{{ p.url | relative_url }}">{{ p.title }}</a><div class="search-hit-meta">{{ p.description }}</div></li>{% endfor %}\n</ul>`);
writeFile('Special/Categories/index.html', `---\nlayout: wiki\ntitle: "Categories"\ndescription: "Category index for Metopedia."\npermalink: "/Special/Categories/"\nsitemap: false\n---\n<p>This page groups Metopedia pages by editorial category.</p>\n{% assign all_pages = site.pages | where: "wiki_page", true %}\n{% assign cats = "" | split: "" %}\n{% for p in all_pages %}{% for c in p.wiki_categories %}{% assign cats = cats | push: c %}{% endfor %}{% endfor %}\n{% assign unique_cats = cats | uniq | sort %}\n{% for c in unique_cats %}\n<h2 id="{{ c | slugify }}">{{ c }}</h2>\n<ul>{% for p in all_pages %}{% if p.wiki_categories contains c %}<li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>{% endif %}{% endfor %}</ul>\n{% endfor %}`);
writeFile('Special/Sitemap/index.html', `---\nlayout: wiki\ntitle: "Sitemap"\ndescription: "Human-readable sitemap for Metopedia."\npermalink: "/Special/Sitemap/"\nsitemap: false\n---\n<p>For the XML sitemap, see <a href="{{ '/sitemap.xml' | relative_url }}">sitemap.xml</a>.</p>\n<ul>{% assign all_pages = site.pages | where: "wiki_page", true | sort: "title" %}{% for p in all_pages %}<li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>{% endfor %}</ul>`);
writeFile('Special/Search/index.html', `---\nlayout: wiki\ntitle: "Search"\ndescription: "Search Metopedia page titles and descriptions."\npermalink: "/Special/Search/"\nsitemap: false\n---\n<p>Search results are filtered in the browser from the static page index.</p>\n<input id="search-page-input" type="search" placeholder="Search Metopedia" style="width:100%;max-width:34rem;padding:.45em;border:1px solid var(--border-color);">\n<ul id="search-page-results" class="search-results-list"></ul>`);
writeFile('Special/WhatLinksHere/Main_Page/index.html', `---\nlayout: wiki\ntitle: "What links here: Main Page"\ndescription: "Static link index placeholder for Metopedia."\npermalink: "/Special/WhatLinksHere/Main_Page/"\nsitemap: false\n---\n<p>In the Jekyll version, links are resolved at build time. Use the repository search to inspect inbound links to a page.</p>`);

// Data files
writeFile('_data/pages.json', JSON.stringify(pages, null, 2));
writeFile('_data/sidebar.yml', `Navigation:\n  - label: Main page\n    url: /\n  - label: Featured page\n    url: /Featured_Page/\n  - label: Research areas\n    url: /Research_Areas/\n  - label: About Metopedia\n    url: /About/\nContribute:\n  - label: Help\n    url: /Help/Wiki_markup/\n  - label: Methodology\n    url: /Methodology/\n  - label: Editorial guide\n    url: /Editorial_Guide/\nProjects:\n  - label: Research\n    url: /Metopedia/Research/\n  - label: Reputation Flair\n    url: /Reputation_Flair/\nTools:\n  - label: Sitemap\n    url: /Special/Sitemap/\n  - label: All pages\n    url: /Special/AllPages/\n  - label: Categories\n    url: /Special/Categories/\n  - label: What links here\n    url: /Special/WhatLinksHere/Main_Page/\n  - label: Printable version\n    url: javascript:window.print()\n`);
writeFile('_data/footer.yml', `- label: Privacy policy\n  url: /Privacy_Policy/\n- label: About Metopedia\n  url: /About/\n- label: Contact Metopedia\n  url: /Contact/\n- label: Cookie statement\n  url: /Cookies/\n- label: Mobile view\n  url: /Mobile/\n- label: Sitemap\n  url: /Special/Sitemap/\n`);

// Extract CSS from current index and adjust slightly
let oldIndex = fs.readFileSync(path.join(srcRoot, 'index.html'), 'utf8');
let cssMatch = oldIndex.match(/<style id="wiki-styles">([\s\S]*?)<\/style>/);
let css = cssMatch ? cssMatch[1].trim() : '';
css += `\n\n/* Jekyll migration refinements */\n.mw-parser-output::after{content:"";display:block;clear:both;}\n.infobox{max-width:100%;}\n.infobox th,.infobox td{overflow-wrap:anywhere;}\n.wikitable-wrap{clear:both;}\n#p-logo{display:block;width:11em;margin:0 auto 1em auto;padding:0 .55em;text-decoration:none;text-align:center;}\n#p-logo-img{display:block;width:9.9em;max-width:100%;height:auto;margin:0 auto;}\n#mobile-logo{display:inline-flex;align-items:center;color:inherit;text-decoration:none;min-width:0;}\n#mobile-logo-img{display:block;width:8.2em;max-width:54vw;height:auto;flex:0 0 auto;}\nbody.theme-dark #p-logo-img,body.theme-dark #mobile-logo-img{filter:invert(1);}\n#firstHeading a{color:inherit;text-decoration:none;}\n.references{font-size:90%;}\n.reference a{white-space:nowrap;}\nmath[display=block], .katex-display{font-size:1.22em;}\n#search-page-results li{margin-bottom:.5em;}\n@media (max-width:1080px){#mw-head-base{padding-bottom:.55em;}#left-navigation{order:2;}#right-navigation{order:1;}#header-actions{flex:0 0 auto;}.header-icon-button{min-width:2.45em;height:2.45em;}#right-navigation{display:flex;align-items:center;gap:.55em;}.vectorTabs{width:100%;}.vectorTabs ul{width:100%;}.vectorTabs li{flex:1 1 auto;}.vectorTabs li a,.vectorTabs li button{width:100%;}}\n@media (max-width:640px){#right-navigation{flex-wrap:nowrap;}#header-actions{margin-left:0;}#p-search{min-width:0;flex:1 1 auto;order:0;}#simpleSearch{min-width:0;}#mobile-menu-toggle,#theme-toggle{flex:0 0 auto;}.header-icon-button{padding:0 .5em;}}\n`;
writeFile('assets/css/metopedia.css', css);

// JS
writeFile('assets/js/site.js', `
(function(){
  const pages = window.METOPEDIA_PAGES || [];
  function legacyPath(slug){
    if(!slug || slug === 'Main_Page') return '/';
    if(slug.startsWith('Special:')) return '/' + slug.replace(/^Special:/,'Special/') + '/';
    if(slug.includes(':')){ const parts = slug.split(':'); return '/' + parts[0] + '/' + parts.slice(1).join(':').replace(/^\\//,'') + '/'; }
    return '/' + slug + '/';
  }
  if(location.hash && location.hash.startsWith('#/')){
    const slug = decodeURIComponent(location.hash.slice(2));
    location.replace(legacyPath(slug));
    return;
  }
  function applyTheme(theme){
    const next = theme === 'dark' ? 'dark' : 'light';
    document.body.classList.toggle('theme-dark', next === 'dark');
    const btn = document.getElementById('theme-toggle');
    if(btn){ btn.textContent = next === 'dark' ? '☀' : '☾'; btn.title = next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'; btn.setAttribute('aria-label', btn.title); }
    try{ localStorage.setItem('metopedia-theme', next); }catch(e){}
  }
  function initTheme(){
    let stored = null; try{ stored = localStorage.getItem('metopedia-theme'); }catch(e){}
    if(!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) stored = 'dark';
    applyTheme(stored || 'light');
  }
  function setMobileMenu(open){
    document.body.classList.toggle('menu-open', open);
    const overlay = document.getElementById('mobile-panel-overlay');
    if(overlay){ overlay.classList.toggle('open', open); overlay.setAttribute('aria-hidden', String(!open)); }
  }
  function renderMath(){
    if(!window.katex) return;
    document.querySelectorAll('math').forEach(el => {
      const tex = el.textContent || '';
      const displayMode = el.getAttribute('display') === 'block';
      const span = document.createElement(displayMode ? 'div' : 'span');
      span.className = displayMode ? 'katex-display math-rendered' : 'math-rendered';
      try{ window.katex.render(tex, span, { displayMode, throwOnError:false }); el.replaceWith(span); }catch(e){}
    });
  }
  function setupSearch(){
    const form = document.getElementById('search-form');
    const input = document.getElementById('searchInput');
    if(form && input){
      form.addEventListener('submit', e => {
        e.preventDefault();
        const q = input.value.trim();
        if(!q) return;
        const n = q.toLowerCase().replace(/\s+/g,'_');
        const exact = pages.find(p => p.slug.toLowerCase() === n || p.title.toLowerCase() === q.toLowerCase());
        if(exact) location.href = exact.url;
        else location.href = '/Special/Search/?q=' + encodeURIComponent(q);
      });
    }
    const searchPageInput = document.getElementById('search-page-input');
    const results = document.getElementById('search-page-results');
    if(searchPageInput && results){
      const params = new URLSearchParams(location.search);
      searchPageInput.value = params.get('q') || '';
      const render = () => {
        const q = searchPageInput.value.trim().toLowerCase();
        const matches = pages.filter(p => !q || (p.title+' '+p.slug+' '+(p.description||'')).toLowerCase().includes(q)).slice(0,80);
        results.innerHTML = matches.map(p => '<li><a href="'+p.url+'">'+p.title+'</a><div class="search-hit-meta">'+(p.description||'')+'</div></li>').join('') || '<li>No matching pages found.</li>';
      };
      searchPageInput.addEventListener('input', render); render();
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    document.getElementById('theme-toggle')?.addEventListener('click', () => applyTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark'));
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => setMobileMenu(true));
    document.getElementById('mobile-menu-close')?.addEventListener('click', () => setMobileMenu(false));
    document.getElementById('mobile-panel-backdrop')?.addEventListener('click', () => setMobileMenu(false));
    setupSearch();
    renderMath();
  });
})();
`);

// Layouts
writeFile('_layouts/wiki.html', `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>{% if page.title %}{{ page.title }} - {% endif %}{{ site.title }}</title>\n  <meta name="description" content="{{ page.description | default: site.description | escape }}">\n  <meta name="keywords" content="{{ page.keywords | escape }}">\n  <meta name="author" content="{{ page.author | default: site.author | escape }}">\n  <meta name="robots" content="{{ page.robots | default: 'index,follow,max-image-preview:large' }}">\n  <meta property="og:site_name" content="{{ site.title }}">\n  <meta property="og:title" content="{{ page.title | default: site.title | escape }}">\n  <meta property="og:description" content="{{ page.description | default: site.description | escape }}">\n  <meta property="og:type" content="article">\n  <meta property="og:url" content="{{ page.url | absolute_url }}">\n  <meta property="og:image" content="{{ page.og_image | default: site.og_image | absolute_url }}">\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:title" content="{{ page.title | default: site.title | escape }}">\n  <meta name="twitter:description" content="{{ page.description | default: site.description | escape }}">\n  <meta name="twitter:image" content="{{ page.og_image | default: site.og_image | absolute_url }}">\n  <link rel="canonical" href="{{ page.url | absolute_url }}">\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">\n  <link rel="stylesheet" href="{{ '/assets/css/metopedia.css' | relative_url }}">\n  {% if site.google_analytics %}\n  <script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>\n  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','{{ site.google_analytics }}');</script>\n  {% endif %}\n</head>\n<body>\n  <div id="mw-page-base"></div>\n  <div id="mw-head-base">\n    <div id="left-navigation"><div class="vectorTabs"><ul><li class="selected"><a href="{{ page.url | relative_url }}">Read</a></li><li><a href="{{ site.github_repository }}/blob/main{{ page.source_path | default: page.path | remove_first: '.' }}">View source</a></li></ul></div></div>\n    <div id="right-navigation">\n      <div id="p-search"><form id="search-form"><div id="simpleSearch"><input type="search" id="searchInput" placeholder="Search Metopedia" autocomplete="off"><button type="submit" aria-label="Search">⌕</button></div></form></div>\n      <div id="header-actions"><button type="button" id="theme-toggle" class="header-icon-button" aria-label="Toggle dark mode" title="Toggle dark mode">☾</button><button type="button" id="mobile-menu-toggle" class="header-icon-button" aria-label="Open menu" title="Open menu">☰</button></div>\n    </div>\n  </div>\n  <div id="mw-panel">\n    <a id="p-logo" href="{{ '/' | relative_url }}" aria-label="Metopedia home"><img id="p-logo-img" src="{{ '/assets/metopedia-logo.png' | relative_url }}" alt="Metopedia"></a>\n    <div id="sidebar-content">{% include sidebar.html %}</div>\n  </div>\n  <div id="mobile-panel-overlay" aria-hidden="true"><div id="mobile-panel-backdrop"></div><aside id="mobile-panel"><div class="mobile-panel-header"><a id="mobile-logo" href="{{ '/' | relative_url }}" aria-label="Metopedia home"><img id="mobile-logo-img" src="{{ '/assets/metopedia-logo.png' | relative_url }}" alt="Metopedia"></a><button type="button" id="mobile-menu-close" class="mobile-menu-close" aria-label="Close menu" title="Close menu">✕</button></div><div id="mobile-sidebar-content">{% include sidebar.html %}</div></aside></div>\n  <div id="content">\n    <h1 id="firstHeading">{{ page.title }}</h1>\n    <div id="siteSub">{{ site.tagline }}</div>\n    <div id="bodyContent" class="mw-parser-output">{{ content }}</div>\n  </div>\n  <div id="footer"><div id="footer-license">Text is available under the <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 License</a>; additional terms may apply. By using this site, you agree to the <a href="{{ '/Terms_of_Use/' | relative_url }}">Terms of Use</a> and <a href="{{ '/Privacy_Policy/' | relative_url }}">Privacy Policy</a>.</div><ul>{% for item in site.data.footer %}<li><a href="{{ item.url | relative_url }}">{{ item.label }}</a></li>{% endfor %}</ul></div>\n  <script>window.METOPEDIA_PAGES={{ site.data.pages | jsonify }};</script>\n  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>\n  <script defer src="{{ '/assets/js/site.js' | relative_url }}"></script>\n</body>\n</html>\n`);
writeFile('_layouts/redirect.html', `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url={{ page.redirect_to }}"><link rel="canonical" href="{{ page.redirect_to | absolute_url }}"><title>Redirecting...</title></head><body><p>Redirecting to <a href="{{ page.redirect_to }}">{{ page.redirect_to }}</a>.</p></body></html>`);
writeFile('_includes/sidebar.html', `{% for section in site.data.sidebar %}<div class="portal"><h3>{{ section[0] }}</h3><ul>{% for item in section[1] %}<li><a href="{{ item.url | relative_url }}">{{ item.label }}</a></li>{% endfor %}</ul></div>{% endfor %}`);

// Config, sitemap, robots, 404
writeFile('_config.yml', `title: Metopedia\ntagline: From Metopedia, the free encyclopedia\ndescription: Metopedia is an independent encyclopedic repository devoted to interdisciplinary inquiry across cognition, bias, textual study, mathematical logic, applications, forensics, and institutional analysis.\nauthor: Metopedia Foundation\nurl: https://metopedia.com\nbaseurl: ""\nog_image: /assets/metopedia-og.png\ngoogle_analytics: G-E3YFRYPVTK\ngithub_repository: https://github.com/andylehti/metopedia\nmarkdown: kramdown\nkramdown:\n  input: GFM\n  hard_wrap: false\npermalink: pretty\nexclude:\n  - wiki-source\n  - tools\n  - metopedia-main.zip\n  - package-lock.json\n  - node_modules\n`);
writeFile('Gemfile', `source "https://rubygems.org"\ngem "github-pages", group: :jekyll_plugins\n`);
writeFile('sitemap.xml', `---\nlayout: none\npermalink: /sitemap.xml\n---\n<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{% assign all_pages = site.pages | where_exp: "p", "p.sitemap != false" %}\n{% for p in all_pages %}<url><loc>{{ p.url | absolute_url }}</loc>{% if p.last_modified %}<lastmod>{{ p.last_modified }}</lastmod>{% endif %}</url>\n{% endfor %}</urlset>\n`);
writeFile('robots.txt', `User-agent: *\nAllow: /\nSitemap: https://metopedia.com/sitemap.xml\n`);
writeFile('404.html', `---\nlayout: wiki\ntitle: "404 Not Found"\ndescription: "The requested Metopedia page could not be found."\npermalink: /404.html\nsitemap: false\n---\n<p>The requested page does not exist. Use <a href="/Special/Search/">search</a> or return to the <a href="/">main page</a>.</p>\n<script>if(location.hash&&location.hash.startsWith('#/')){location.replace('/'+location.hash.slice(2).replace(':','/')+'/');}</script>`);
writeFile('README.md', `# Metopedia Jekyll Site\n\nThis version migrates Metopedia from a hash-routed single-page renderer to a Jekyll static site with clean, indexable URLs.\n\n## Local preview\n\n\`\`\`bash\nbundle install\nbundle exec jekyll serve\n\`\`\`\n\n## Page model\n\nPages are generated as static Jekyll pages with Wikipedia-style layout, infoboxes, tables, references, categories, and KaTeX math support. The old hash links are redirected by the front page script when someone visits a legacy URL such as \`/#/Reputation_Flair\`.\n\n## Editing\n\nThe generated pages are ordinary Jekyll HTML pages with front matter. The original pre-migration Markdown is preserved in \`wiki-source/\` for reference and future conversion.\n\n## Analytics\n\nGoogle Analytics is configured in \`_config.yml\` with \`google_analytics: G-E3YFRYPVTK\`.\n`);

// Copy assets and source docs
for (const dir of ['assets','images']) {
  const from = path.join(srcRoot, dir);
  if (fs.existsSync(from)) fs.cpSync(from, path.join(outRoot, dir), {recursive:true});
}
ensureDir(path.join(outRoot,'wiki-source'));
for (const dir of ['Articles','Footer','Services','Snippets','Navigation','Contribute','Tools']) {
  const from = path.join(srcRoot, dir);
  if (fs.existsSync(from)) fs.cpSync(from, path.join(outRoot,'wiki-source',dir), {recursive:true});
}
// Include conversion script placeholder
ensureDir(path.join(outRoot,'tools'));
fs.copyFileSync('/mnt/data/migrate_metopedia_jekyll.mjs', path.join(outRoot,'tools','migrate_metopedia_jekyll.mjs'));

// ZIPs
console.log(`Generated ${pages.length} Jekyll pages at ${outRoot}`);
