---
layout: wiki
title: "Sitemap"
description: "Machine-readable and human-readable sitemap links for Metopedia."
permalink: "/Special/Sitemap/"
sitemap: false
---

<p>The machine-readable sitemap is generated automatically by <code>jekyll-sitemap</code> at <a href="{{ '/sitemap.xml' | relative_url }}">sitemap.xml</a>.</p>

<h2>Indexed pages</h2>
<ul class="search-results-list">
{% assign wiki_pages = site.pages | where: "wiki_page", true | sort: "title" %}
{% for p in wiki_pages %}<li><a href="{{ p.url | relative_url }}">{{ p.title }}</a><div class="search-hit-meta">{{ p.url }}</div></li>{% endfor %}
</ul>
