---
layout: wiki
title: "All pages"
description: "Alphabetical list of Metopedia pages."
permalink: "/Special/AllPages/"
sitemap: false
---

<p>This page lists indexed Metopedia entries and application pages. It is generated from Jekyll page metadata, so new pages appear automatically when they use <code>wiki_page: true</code>.</p>
<ul class="search-results-list">
{% assign all_pages = site.pages | where: "wiki_page", true | sort: "title" %}
{% for p in all_pages %}<li><a href="{{ p.url | relative_url }}">{{ p.title }}</a><div class="search-hit-meta">{{ p.description }}</div></li>{% endfor %}
</ul>
