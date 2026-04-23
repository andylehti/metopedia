---
title: "Help: Wiki markup"
description: "A practical guide to the wiki markup supported by Metopedia."
keywords: "wiki markup help, Metopedia syntax, wiki formatting guide, help page"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
ogImage: "https://metopedia.com/Assets/metopedia-og.png"
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
