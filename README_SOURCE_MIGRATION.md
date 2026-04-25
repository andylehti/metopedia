# Metopedia Jekyll source-only migration

This is the corrected Jekyll source package.

- Pages are source Markdown files in `pages/` plus `index.md`.
- The clean URL for each page is controlled by front matter `permalink`.
- Jekyll generates the final `.../index.html` files into `_site/` during build.
- The page bodies contain converted HTML because the original Metopedia syntax used custom wiki templates (`[[links]]`, `{{Infobox}}`, `<ref>`) that plain GitHub Pages Jekyll cannot parse without custom plugins.
- The original Markdown/wiki sources are preserved in `wiki-source/` and excluded from the build.

Run:

```bash
bundle install
bundle exec jekyll serve --host 0.0.0.0 --baseurl=""
```
