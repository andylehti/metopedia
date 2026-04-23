# Metopedia

Metopedia is a static interdisciplinary reference site published at https://metopedia.com.

## Folders

- `Articles/` reference entries and help pages
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
python metopedia_repo_builder.py --base-url https://metopedia.com
```

This refreshes:

- `index.html`
- `Snippets/app-config.json`
- `Snippets/sidebar.json`
- `Snippets/footer.json`
- `Snippets/site-index.json`
- `sitemap.xml`
