---
title: "Canonical Order of Operations"
description: "A proposed convention in arithmetic notation intended to make exponentiation, roots, negative signs, and implicit grouping more explicit."
keywords: "Canonical Order of Operations, order of operations, arithmetic notation, exponents, roots, radical symbol, mathematical convention"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
ogImage: "https://metopedia.com/Assets/metopedia-og.png"
---
{{short description|A proposed convention in arithmetic notation intended to make exponentiation, roots, negative signs, and implicit grouping more explicit.}}
{{About|the proposed arithmetic convention|the inherited convention|Standard_Order_of_Operations}}
{{Infobox
| title = Canonical Order of Operations
| subheader = Proposed convention in arithmetic notation
| label1 = Abbreviation
| data1 = COO
| label2 = Contrasted with
| data2 = [[Standard_Order_of_Operations|Standard Order of Operations]] (SOO)
| label3 = Central topics
| data3 = [[Canonical_Law_of_Indices|indices]], [[Law_of_Implicit_Unity|implicit unity]], [[Fractional_Exponents_and_Roots|fractional exponents]], [[Negative_Bases_and_Exponentiation|negative bases]]
| label4 = Associated manuscript
| data4 = ''The Canonical Order of Operations'', first edition
| label5 = Author
| data5 = Andrew Lehti
}}

'''Canonical Order of Operations''' ('''COO''') is a proposed convention for writing and evaluating arithmetic expressions. It is presented as an alternative to the inherited [[Standard_Order_of_Operations|Standard Order of Operations]] (SOO), not as a change to arithmetic itself. The proposal argues that several common ambiguities in elementary notation arise from the way signs, powers, roots, and implicit grouping are written rather than from the underlying quantities.

The convention is associated with Andrew Lehti's manuscript ''The Canonical Order of Operations'', which describes COO as a repair to inconsistencies in ordinary arithmetic grammar.<ref name="lehti">Andrew Lehti, ''The Canonical Order of Operations'', first edition, 2024–2025.</ref> Its central claim is that an expression should preserve the unity of its visible base before exponentiation or root extraction is applied. This claim is formalized in the [[Law_of_Implicit_Unity|Law of Implicit Unity]].

COO is best understood as a notation-first framework. It does not deny the usefulness of the Standard Order in ordinary instruction, nor does it remove accepted mathematical structures from fields that already use them. Instead, it separates convention from quantity and asks whether some familiar rules are products of historical notation rather than necessary facts of arithmetic.

== Summary ==

The Canonical Order of Operations is built around three principles:

* signs attached to a number are treated as part of that written base unless separated by notation;
* roots are written as [[Fractional_Exponents_and_Roots|fractional exponents]] rather than with the radical sign;
* ambiguous expressions are rewritten before evaluation instead of resolved by a mnemonic.

The result is a convention in which expressions such as negative powers and nested roots are handled by one family of index rules.

<math display="block">
(-x)^2 \ne -x^2
</math>

Under COO, the first expression explicitly squares the negative base. The second expression places a negation outside the square. The distinction is not treated as a matter of memory, but as a matter of written structure.

== Background ==

The Standard Order of Operations is commonly taught through mnemonics such as PEMDAS, BEDMAS, BIDMAS, and BODMAS. These mnemonics are useful for classroom arithmetic, but they do not explain every convention used in mathematical writing. In particular, they often compress several questions into one rule: whether a minus sign is a subtraction operator or a sign, whether multiplication by juxtaposition has priority, whether a root symbol introduces grouping, and whether an exponent applies to a sign or only to a numeral.

These issues are old notation problems. Modern notation developed over centuries, and symbols such as the radical sign, the superscript exponent, and the leading minus sign did not originate as one coordinated system. COO treats that historical layering as the source of several ordinary disputes about calculation.

== Core claim ==

The central claim of COO is that a visible arithmetic unit should not be split by an operation unless the notation explicitly separates it. This is the function of the [[Law_of_Implicit_Unity|Law of Implicit Unity]].

<math display="block">
(-2)^2 = 4
</math>

<math display="block">
-(2^2) = -4
</math>

In standard notation, the expression <math>-2^2</math> is often interpreted as <math>-(2^2)</math>. COO treats that convention as avoidable shorthand. In canonical notation, the writer must choose one structure and write it clearly.

== Relation to indices ==

The [[Canonical_Law_of_Indices|Canonical Law of Indices]] is the index rule set used by COO. It keeps powers, roots, reciprocal powers, and reciprocal roots in one notation family.

<math display="block">
x^{m/n}=\left(x^m\right)^{1/n}
</math>

<math display="block">
\sqrt[n]{x^m}\equiv x^{m/n}
</math>

The use of a fractional exponent is not presented as a new operation. It is presented as a clearer spelling of an old one.

== Radical notation ==

One of the more visible proposals in COO is the [[Argument_for_the_Removal_of_the_Radical_Symbol|removal of the radical symbol]] from canonical arithmetic. The argument is not that the radical sign is unusable. It is that the sign hides the fact that a root is an exponent.

{| class="wikitable"
! Standard form !! Canonical form !! Meaning
|-
| <math>\sqrt{x}</math> || <math>x^{1/2}</math> || square root
|-
| <math>\sqrt[3]{x}</math> || <math>x^{1/3}</math> || cube root
|-
| <math>\sqrt{x^5}</math> || <math>x^{5/2}</math> || fifth power under a square root
|-
| <math>1/\sqrt{x}</math> || <math>x^{-1/2}</math> || reciprocal square root
|}

This rewrite gives roots the same syntax as powers and reciprocals. It also makes nested roots easier to combine.

<math display="block">
\sqrt{\sqrt{x}} = \left(x^{1/2}\right)^{1/2}=x^{1/4}
</math>

== Negative bases ==

COO gives special attention to [[Negative_Bases_and_Exponentiation|negative bases and exponentiation]]. Its argument is that a written negative number should remain a unit unless notation breaks it apart.

{| class="wikitable"
! Expression !! Standard reading often taught !! Canonical reading
|-
| <math>-3^2</math> || <math>-(3^2)</math> || ambiguous unless rewritten
|-
| <math>(-3)^2</math> || <math>9</math> || <math>9</math>
|-
| <math>-(3^2)</math> || <math>-9</math> || <math>-9</math>
|-
| <math>-\left(3^2\right)</math> || <math>-9</math> || <math>-9</math>
|}

The canonical convention does not rely on the reader remembering whether a sign is included in a base. It requires the writer to make the intended base visible.

== Comparison with the Standard Order ==

COO differs from SOO in purpose. SOO is a widely taught convention for evaluating ordinary expressions. COO is a proposed stricter convention for reducing notational ambiguity.

{| class="wikitable"
! Topic !! Standard Order of Operations !! Canonical Order of Operations
|-
| Educational role || common classroom convention || proposed clarity convention
|-
| Roots || radical notation is retained || roots are expressed as fractional exponents
|-
| Negatives || leading signs may be separated by exponentiation convention || visible signed bases are preserved unless separated
|-
| Ambiguous expressions || resolved by inherited rule or mnemonic || rewritten before evaluation
|-
| Main goal || standardized procedure || structural consistency
|}

== Reception and status ==

The Canonical Order of Operations is a proposed framework. It is not a governing standard in school curricula, publishing, engineering, or computer algebra systems. Its value therefore depends on whether one judges the benefits of stricter notation to outweigh the disruption of changing familiar practice.

Supporters may argue that COO makes arithmetic more internally consistent and easier to extend from elementary notation to powers and roots. Critics may object that existing notation already works when parentheses and definitions are used carefully, and that replacing entrenched conventions would create confusion across education and computation.

== See also ==
{{See also|Canonical_Law_of_Indices|Law_of_Implicit_Unity|Argument_for_the_Removal_of_the_Radical_Symbol|Misconceptions_on_Mathematical_Operations}}

== References ==
<references />

{| class="navbox"
! colspan="2" class="navbox-title" | [[Canonical_Order_of_Operations|Canonical Order of Operations]]
|-
! class="navbox-group" | Core pages
| class="navbox-list" | [[Canonical_Order_of_Operations|Overview]] · [[Canonical_Law_of_Indices|Canonical Law of Indices]] · [[Law_of_Implicit_Unity|Law of Implicit Unity]] · [[Fractional_Exponents_and_Roots|Fractional exponents and roots]]
|-
! class="navbox-group" | Applications
| class="navbox-list" | [[Argument_for_the_Removal_of_the_Radical_Symbol|Removal of the radical symbol]] · [[Negative_Bases_and_Exponentiation|Negative bases and exponentiation]] · [[Canonical_Order_of_Operations_Examples|Examples]] · [[Standard_Order_of_Operations|Standard Order comparison]]
|-
! class="navbox-group" | Interpretation
| class="navbox-list" | [[Misconceptions_on_Mathematical_Operations|Misconceptions on mathematical operations]] · [[Methodology|Methodology]] · [[Cognitive_Impasse|Cognitive Impasse]]
|}

[[Category:Mathematics]]
[[Category:Mathematical notation]]
[[Category:Order of operations]]
[[Category:Canonical mathematics]]
[[Category:Proposed frameworks]]
