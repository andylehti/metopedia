---
layout: wiki
title: "Help: Wiki markup"
description: "A practical guide to the wiki markup supported by Metopedia."
keywords: "wiki markup help, Metopedia syntax, wiki formatting guide, help page"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
og_image: "https://metopedia.com/assets/metopedia-og.png"
permalink: "/Help/Wiki_markup/"
canonical_url: "/Help/Wiki_markup/"
wiki_page: true
slug_name: "Help:Wiki_markup"
source_path: "./Articles/Help/Wiki_markup.md"
wiki_categories: ["Help", "Markup Showcase"]
last_modified: "2026-04-23"
---

{% raw %}
<p>This page documents the supported markup subset in Metopedia.</p>
<h2 id="headings">Headings</h2>
<pre>= Level 1 =
== Level 2 ==
=== Level 3 ===
==== Level 4 ====
===== Level 5 =====
====== Level 6 ======</pre>
<h2 id="links">Links</h2>
<pre>[[Main_Page]]
[[Main_Page|Custom label]]
[[#Section|Section link]]
[[:Category:Examples]]
[https://example.com Label]</pre>
<h2 id="tables">Tables</h2>
<pre>{| class=&quot;wikitable&quot;
|+ Caption
! Header A !! Header B
|-
| Value A || Value B
|-
| Value C || Value D
|}</pre>
<h2 id="references">References</h2>
<pre>A statement.<sup id=&quot;cite_ref-note-2_1&quot; class=&quot;reference&quot;><a href=&quot;#cite_note-note-2&quot;>[2]</a></sup>
Repeated statement.<sup id=&quot;cite_ref-same_1&quot; class=&quot;reference&quot;><a href=&quot;#cite_note-same&quot;>[1]</a></sup>
Reuse only.<sup id=&quot;cite_ref-same_2&quot; class=&quot;reference&quot;><a href=&quot;#cite_note-same&quot;>[1]</a></sup>
&lt;ol class=&quot;references&quot;>&lt;li id=&quot;cite_note-same&quot;>&lt;span class=&quot;mw-cite-backlink&quot;><a href=&quot;#cite_ref-same_1&quot;>↑a</a> <a href=&quot;#cite_ref-same_2&quot;>↑b</a>&lt;/span> Reference text.&lt;/li>&lt;li id=&quot;cite_note-note-2&quot;>&lt;span class=&quot;mw-cite-backlink&quot;><a href=&quot;#cite_ref-note-2_1&quot;>↑</a>&lt;/span> Reference text.&lt;/li>&lt;/ol></pre>
<h2 id="mathematics">Mathematics</h2>
<p>Use inline KaTeX-compatible math with <code>&amp;lt;math&amp;gt;&lt;/code>. Use display math for larger centered equations.</p>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Source</th><th>Result</th></tr><tr><td><code>&amp;lt;math&amp;gt;x^{1/2}&amp;lt;/math&amp;gt;&lt;/code></td><td>inline math</td></tr><tr><td><code>&amp;lt;math display="block"&amp;gt;x^{m/n}=\sqrt[n]{x^m}&amp;lt;/math&amp;gt;&lt;/code></td><td>centered display math</td></tr></table></div>

{% endraw %}
