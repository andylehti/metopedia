# Metopedia Jekyll Site

This version migrates Metopedia from a hash-routed single-page renderer to a Jekyll static site with clean, indexable URLs.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

## Page model

Pages are generated as static Jekyll pages with Wikipedia-style layout, infoboxes, tables, references, categories, and MathJax math support. The old hash links are redirected by the front page script when someone visits a legacy URL such as `/#/Reputation_Flair`.

## Editing

The generated pages are ordinary Jekyll HTML pages with front matter. The original pre-migration Markdown is preserved in `wiki-source/` for reference and future conversion.

## Analytics

Google Analytics is configured in `_config.yml` with `google_analytics: G-E3YFRYPVTK`.
