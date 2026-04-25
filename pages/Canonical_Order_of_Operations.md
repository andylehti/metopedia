---
layout: wiki
title: "Canonical Order of Operations"
description: "A proposed convention in arithmetic notation intended to make exponentiation, roots, negative signs, and implicit grouping more explicit."
keywords: "Canonical Order of Operations, order of operations, arithmetic notation, exponents, roots, radical symbol, mathematical convention"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
og_image: "https://metopedia.com/Assets/metopedia-og.png"
permalink: "/Canonical_Order_of_Operations/"
canonical_url: "/Canonical_Order_of_Operations/"
wiki_page: true
slug_name: "Canonical_Order_of_Operations"
source_path: "./Articles/Canonical_Order_of_Operations.md"
wiki_categories: ["Mathematics", "Mathematical notation", "Order of operations", "Canonical mathematics", "Proposed frameworks"]
last_modified: "2026-04-24"
---

{% raw %}
<p>{{About|the proposed arithmetic convention|the inherited convention|Standard_Order_of_Operations}}</p>
<table class="infobox"><tr><th colspan="2" class="infobox-header">Canonical Order of Operations</th></tr><tr><th colspan="2" class="infobox-subheader">Proposed convention in arithmetic notation</th></tr><tr><th class="infobox-label">Abbreviation</th><td>COO</td></tr><tr><th class="infobox-label">Contrasted with</th><td><a href="/Standard_Order_of_Operations/">Standard Order of Operations</a> (SOO)</td></tr><tr><th class="infobox-label">Central topics</th><td><a href="/Canonical_Law_of_Indices/">indices</a>, <a href="/Law_of_Implicit_Unity/">implicit unity</a>, <a href="/Fractional_Exponents_and_Roots/">fractional exponents</a>, <a href="/Negative_Bases_and_Exponentiation/">negative bases</a></td></tr><tr><th class="infobox-label">Associated manuscript</th><td><i>The Canonical Order of Operations</i>, first edition</td></tr><tr><th class="infobox-label">Author</th><td>Andrew Lehti</td></tr></table>
<p><b>Canonical Order of Operations</b> (<b>COO</b>) is a proposed convention for writing and evaluating arithmetic expressions. It is presented as an alternative to the inherited <a href="/Standard_Order_of_Operations/">Standard Order of Operations</a> (SOO), not as a change to arithmetic itself. The proposal argues that several common ambiguities in elementary notation arise from the way signs, powers, roots, and implicit grouping are written rather than from the underlying quantities.</p>
<p>The convention is associated with Andrew Lehti's manuscript <i>The Canonical Order of Operations</i>, which describes COO as a repair to inconsistencies in ordinary arithmetic grammar.<sup id="cite_ref-lehti_1" class="reference"><a href="#cite_note-lehti">[1]</a></sup> Its central claim is that an expression should preserve the unity of its visible base before exponentiation or root extraction is applied. This claim is formalized in the <a href="/Law_of_Implicit_Unity/">Law of Implicit Unity</a>.</p>
<p>COO is best understood as a notation-first framework. It does not deny the usefulness of the Standard Order in ordinary instruction, nor does it remove accepted mathematical structures from fields that already use them. Instead, it separates convention from quantity and asks whether some familiar rules are products of historical notation rather than necessary facts of arithmetic.</p>
<h2 id="summary">Summary</h2>
<p>The Canonical Order of Operations is built around three principles:</p>
<ul>
<li>signs attached to a number are treated as part of that written base unless separated by notation;</li>
<li>roots are written as <a href="/Fractional_Exponents_and_Roots/">fractional exponents</a> rather than with the radical sign;</li>
<li>ambiguous expressions are rewritten before evaluation instead of resolved by a mnemonic.</li>
</ul>
<p>The result is a convention in which expressions such as negative powers and nested roots are handled by one family of index rules.</p>
<p><math display="block"> (-x)^2 \ne -x^2 &lt;/math></p>
<p>Under COO, the first expression explicitly squares the negative base. The second expression places a negation outside the square. The distinction is not treated as a matter of memory, but as a matter of written structure.</p>
<h2 id="background">Background</h2>
<p>The Standard Order of Operations is commonly taught through mnemonics such as PEMDAS, BEDMAS, BIDMAS, and BODMAS. These mnemonics are useful for classroom arithmetic, but they do not explain every convention used in mathematical writing. In particular, they often compress several questions into one rule: whether a minus sign is a subtraction operator or a sign, whether multiplication by juxtaposition has priority, whether a root symbol introduces grouping, and whether an exponent applies to a sign or only to a numeral.</p>
<p>These issues are old notation problems. Modern notation developed over centuries, and symbols such as the radical sign, the superscript exponent, and the leading minus sign did not originate as one coordinated system. COO treats that historical layering as the source of several ordinary disputes about calculation.</p>
<h2 id="core-claim">Core claim</h2>
<p>The central claim of COO is that a visible arithmetic unit should not be split by an operation unless the notation explicitly separates it. This is the function of the <a href="/Law_of_Implicit_Unity/">Law of Implicit Unity</a>.</p>
<p><math display="block"> (-2)^2 = 4 &lt;/math></p>
<p><math display="block"> -(2^2) = -4 &lt;/math></p>
<p>In standard notation, the expression <math>-2^2&lt;/math> is often interpreted as &lt;math>-(2^2)&lt;/math>. COO treats that convention as avoidable shorthand. In canonical notation, the writer must choose one structure and write it clearly.</p>
<h2 id="relation-to-indices">Relation to indices</h2>
<p>The <a href="/Canonical_Law_of_Indices/">Canonical Law of Indices</a> is the index rule set used by COO. It keeps powers, roots, reciprocal powers, and reciprocal roots in one notation family.</p>
<p><math display="block"> x^{m/n}=\left(x^m\right)^{1/n} &lt;/math></p>
<p><math display="block"> \sqrt[n]{x^m}\equiv x^{m/n} &lt;/math></p>
<p>The use of a fractional exponent is not presented as a new operation. It is presented as a clearer spelling of an old one.</p>
<h2 id="radical-notation">Radical notation</h2>
<p>One of the more visible proposals in COO is the <a href="/Argument_for_the_Removal_of_the_Radical_Symbol/">removal of the radical symbol</a> from canonical arithmetic. The argument is not that the radical sign is unusable. It is that the sign hides the fact that a root is an exponent.</p>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Standard form</th><th>Canonical form</th><th>Meaning</th></tr><tr><td><math>\sqrt{x}&lt;/math></td><td><math>x^{1/2}&lt;/math></td><td>square root</td></tr><tr><td><math>\sqrt[3]{x}&lt;/math></td><td><math>x^{1/3}&lt;/math></td><td>cube root</td></tr><tr><td><math>\sqrt{x^5}&lt;/math></td><td><math>x^{5/2}&lt;/math></td><td>fifth power under a square root</td></tr><tr><td><math>1/\sqrt{x}&lt;/math></td><td><math>x^{-1/2}&lt;/math></td><td>reciprocal square root</td></tr></table></div>
<p>This rewrite gives roots the same syntax as powers and reciprocals. It also makes nested roots easier to combine.</p>
<p><math display="block"> \sqrt{\sqrt{x}} = \left(x^{1/2}\right)^{1/2}=x^{1/4} &lt;/math></p>
<h2 id="negative-bases">Negative bases</h2>
<p>COO gives special attention to <a href="/Negative_Bases_and_Exponentiation/">negative bases and exponentiation</a>. Its argument is that a written negative number should remain a unit unless notation breaks it apart.</p>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Expression</th><th>Standard reading often taught</th><th>Canonical reading</th></tr><tr><td><math>-3^2&lt;/math></td><td><math>-(3^2)&lt;/math></td><td>ambiguous unless rewritten</td></tr><tr><td><math>(-3)^2&lt;/math></td><td><math>9&lt;/math></td><td><math>9&lt;/math></td></tr><tr><td><math>-(3^2)&lt;/math></td><td><math>-9&lt;/math></td><td><math>-9&lt;/math></td></tr><tr><td><math>-\left(3^2\right)&lt;/math></td><td><math>-9&lt;/math></td><td><math>-9&lt;/math></td></tr></table></div>
<p>The canonical convention does not rely on the reader remembering whether a sign is included in a base. It requires the writer to make the intended base visible.</p>
<h2 id="comparison-with-the-standard-order">Comparison with the Standard Order</h2>
<p>COO differs from SOO in purpose. SOO is a widely taught convention for evaluating ordinary expressions. COO is a proposed stricter convention for reducing notational ambiguity.</p>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Topic</th><th>Standard Order of Operations</th><th>Canonical Order of Operations</th></tr><tr><td>Educational role</td><td>common classroom convention</td><td>proposed clarity convention</td></tr><tr><td>Roots</td><td>radical notation is retained</td><td>roots are expressed as fractional exponents</td></tr><tr><td>Negatives</td><td>leading signs may be separated by exponentiation convention</td><td>visible signed bases are preserved unless separated</td></tr><tr><td>Ambiguous expressions</td><td>resolved by inherited rule or mnemonic</td><td>rewritten before evaluation</td></tr><tr><td>Main goal</td><td>standardized procedure</td><td>structural consistency</td></tr></table></div>
<h2 id="reception-and-status">Reception and status</h2>
<p>The Canonical Order of Operations is a proposed framework. It is not a governing standard in school curricula, publishing, engineering, or computer algebra systems. Its value therefore depends on whether one judges the benefits of stricter notation to outweigh the disruption of changing familiar practice.</p>
<p>Supporters may argue that COO makes arithmetic more internally consistent and easier to extend from elementary notation to powers and roots. Critics may object that existing notation already works when parentheses and definitions are used carefully, and that replacing entrenched conventions would create confusion across education and computation.</p>
<h2 id="see-also">See also</h2>
<p>{{See also|Canonical_Law_of_Indices|Law_of_Implicit_Unity|Argument_for_the_Removal_of_the_Radical_Symbol|Misconceptions_on_Mathematical_Operations}}</p>
<h2 id="references">References</h2>
<ol class="references"><li id="cite_note-lehti"><span class="mw-cite-backlink"><a href="#cite_ref-lehti_1">↑</a></span> Andrew Lehti, <i>The Canonical Order of Operations</i>, first edition, 2024–2025.</li></ol>
<div class="navbox-shell"><table class="navbox"><tr><th class="navbox-title" colspan="2"><a href="/Canonical_Order_of_Operations/">Canonical Order of Operations</a></th></tr><tr><th class="navbox-group">Core pages</th><td class="navbox-list"><a href="/Canonical_Order_of_Operations/">Overview</a> · <a href="/Canonical_Law_of_Indices/">Canonical Law of Indices</a> · <a href="/Law_of_Implicit_Unity/">Law of Implicit Unity</a> · <a href="/Fractional_Exponents_and_Roots/">Fractional exponents and roots</a></td></tr><tr><th class="navbox-group">Applications</th><td class="navbox-list"><a href="/Argument_for_the_Removal_of_the_Radical_Symbol/">Removal of the radical symbol</a> · <a href="/Negative_Bases_and_Exponentiation/">Negative bases and exponentiation</a> · <a href="/Canonical_Order_of_Operations_Examples/">Examples</a> · <a href="/Standard_Order_of_Operations/">Standard Order comparison</a></td></tr><tr><th class="navbox-group">Interpretation</th><td class="navbox-list"><a href="/Misconceptions_on_Mathematical_Operations/">Misconceptions on mathematical operations</a> · <a href="/Methodology/">Methodology</a> · <a href="/Cognitive_Impasse/">Cognitive Impasse</a></td></tr></table></div>

{% endraw %}
