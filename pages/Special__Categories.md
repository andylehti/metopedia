---
layout: wiki
title: "Categories"
description: "Category index for Metopedia."
permalink: "/Special/Categories/"
sitemap: false
---

<p>This page groups Metopedia pages by editorial category. It is generated from each page's <code>wiki_categories</code> front matter, so it updates automatically when pages are added or edited.</p>

{% assign wiki_pages = site.pages | where: "wiki_page", true | sort: "title" %}
{% assign category_blob = "" %}
{% for p in wiki_pages %}{% for cat in p.wiki_categories %}{% assign category_blob = category_blob | append: cat | append: "||" %}{% endfor %}{% endfor %}
{% assign categories = category_blob | split: "||" | uniq | sort %}

{% for cat in categories %}
{% assign clean_cat = cat | strip %}
{% unless clean_cat == "" %}
<h2 id="{{ clean_cat | slugify }}">{{ clean_cat }}</h2>
<ul>
{% for p in wiki_pages %}{% if p.wiki_categories contains clean_cat %}<li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>{% endif %}{% endfor %}
</ul>
{% endunless %}
{% endfor %}
