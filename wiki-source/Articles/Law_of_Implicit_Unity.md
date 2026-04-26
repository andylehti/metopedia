---
title: "Law of Implicit Unity"
description: "A rule in the Canonical Order of Operations stating that a term carries an implicit first power."
keywords: "Law of Implicit Unity, implicit exponent, exponentiation, canonical arithmetic, order of operations"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
ogImage: "https://metopedia.com/assets/metopedia-og.png"
---
{{short description|Canonical rule stating that a term carries an implicit first power.}}
{{Main|Canonical_Order_of_Operations}}

The '''Law of Implicit Unity''' is a rule in the [[Canonical_Order_of_Operations|Canonical Order of Operations]] stating that a number, variable, or grouped term may be treated as having an implicit exponent of one. The rule is expressed as:

<math display="block">x=x^1</math>

The law does not change the value of a term. Its purpose is interpretive: it makes the base of an exponent visible before exponent rules are applied.

== Role in COO ==
The Canonical Order uses the law to prevent exponentiation from being applied to an unclear or shifting base. In this system, the first task is to identify the unit being acted upon; the second task is to apply the exponent law.

== Examples ==
{| class="wikitable"
! Expression !! Canonical expansion !! Resulting reading
|-
| <math>x</math> || <math>x^1</math> || The term is a base with an unstated first power.
|-
| <math>(x)^n</math> || <math>(x^1)^n</math> || The power acts on the grouped base.
|-
| <math>(xy)^n</math> || <math>(x^1y^1)^n</math> || The exponent distributes over the factors when expanded.
|-
| <math>\sqrt{x}</math> || <math>(x^1)^{\dfrac{1}{2}}</math> || The root is a fractional exponent acting on the base.
|}

== Negative signs ==
The law is used with special care when a negative sign appears near an exponent. In ordinary notation, <math>-x^2</math> and <math>(-x)^2</math> are different expressions. COO treats this as a general principle rather than a local exception: the written form must decide whether the base is <math>x</math>, <math>-x</math>, or a larger grouped object.

{| class="wikitable"
! Expression !! Canonical interpretation
|-
| <math>-x^2</math> || The exponent acts on <math>x</math>; the sign remains external.
|-
| <math>(-x)^2</math> || The exponent acts on the grouped signed term.
|-
| <math>-(x^2)</math> || The sign is explicitly outside the square.
|}

== Rationale ==
The rule is meant to make exponentiation reversible and inspectable. By treating every base as carrying an implicit first power, COO can apply index laws without silently changing the object being acted upon.

== Relation to other pages ==
* [[Canonical_Law_of_Indices]]
* [[Negative_Bases_and_Exponentiation]]
* [[Fractional_Exponents_and_Roots]]

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
