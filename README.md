# Metopedia

Metopedia is a static encyclopedia shell for interdisciplinary inquiry. The site is designed for GitHub Pages and renders repository-based page files through `index.html`.

## Folders

- `Articles/` reference pages and help pages
- `Footer/` footer-linked policy pages
- `Navigation/` sidebar navigation definitions
- `Contribute/` sidebar contribution definitions
- `Tools/` sidebar tool definitions
- `Images/` image assets
- `Assets/` icons and other static assets
- `Snippets/` generated JSON support files

## Build

Run:

```bash
python metopedia_repo_builder.py --base-url https://YOURNAME.github.io/YOURREPO/
```

This refreshes:

- `index.html`
- `Snippets/sidebar.json`
- `Snippets/footer.json`
- `Snippets/site-index.json`
- `sitemap.xml`
