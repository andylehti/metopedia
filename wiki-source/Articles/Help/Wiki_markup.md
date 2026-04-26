---
title: "Help: Wiki markup"
description: "A practical guide to the wiki markup supported by Metopedia."
keywords: "wiki markup help, Metopedia syntax, wiki formatting guide, help page"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
ogImage: "https://metopedia.com/assets/metopedia-og.png"
---
{{short description|A practical guide to the wiki markup currently supported by Metopedia.}}
= Help: Wiki markup =
This page documents the supported markup subset in Metopedia.

== Headings ==
<pre>
= Level 1 =
== Level 2 ==
=== Level 3 ===
==== Level 4 ====
===== Level 5 =====
====== Level 6 ======
</pre>

== Links ==
<pre>
[[Main_Page]]
[[Main_Page|Custom label]]
[[#Section|Section link]]
[[:Category:Examples]]
[https://example.com Label]
</pre>

== Tables ==
<pre>
{| class="wikitable"
|+ Caption
! Header A !! Header B
|-
| Value A || Value B
|-
| Value C || Value D
|}
</pre>

== References ==
<pre>
A statement.<ref>Reference text.</ref>
Repeated statement.<ref name="same">Reference text.</ref>
Reuse only.<ref name="same"/>
<references/>
</pre>

[[Category:Help]]
[[Category:Markup Showcase]]


== Mathematics ==
Use inline MathJax-compatible math with <code>&lt;math&gt;</code>. Use display math for larger centered equations.

{| class="wikitable"
! Source !! Result
|-
| <code>&lt;math&gt;x^{1/2}&lt;/math&gt;</code> || inline math
|-
| <code>&lt;math display="block"&gt;x^{m/n}=\sqrt[n]{x^m}&lt;/math&gt;</code> || centered display math
|}
