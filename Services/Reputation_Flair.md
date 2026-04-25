---
title: "Reputation Flair"
description: "A Metopedia service page for Reputation Flair, a Reddit Devvit application for reputation scoring, flair, moderation assistance, transparency dashboards, and optional human verification."
keywords: "Reputation Flair, Metopedia service, Reddit Devvit, subreddit moderation, human verification, bot shield, reputation scoring"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
ogImage: "https://metopedia.com/Assets/metopedia-og.png"
---
{{short description|A Metopedia service page for the Reputation Flair Reddit Devvit application.}}
<div class="hatnote">This page is service documentation for a Metopedia-associated application. It is not a general encyclopedia article.</div>
{{Infobox
| title = Reputation Flair
| Type = Reddit Devvit application
| Service family = Metopedia services
| Platform = Reddit and Devvit
| Operator = Andrew Lehti and/or Metopedia
| Main functions = reputation scoring, user flair, moderation assistance, transparency dashboards, optional human verification
| Article = [[Reputation_Flair|Reputation Flair]]
| Policy pages = [[Metopedia:Reputation_Flair/Terms|Terms]] · [[Metopedia:Reputation_Flair/Privacy_Policy|Privacy policy]] · [[Metopedia:Reputation_Flair/FAQ|FAQ]]
| App listing = [https://developers.reddit.com/apps/reputation-flair Reddit Developers]
| Repository = [https://github.com/andylehti/reputation_flair GitHub]
| Contact = policy@metopedia.com
}}

'''Reputation Flair''' is a Metopedia-associated Reddit Devvit application for subreddit-level reputation scoring, flair generation, moderation assistance, transparency dashboards, and optional human verification. It may also be referred to as '''RF''', '''Reputation Flair System''', '''Bot Shield''', '''Human Verification Module''', '''Subreddit Stats by Reputation Flair''', or the '''Reputation Portal'''.

The service is designed for subreddit use. Its records, dashboards, reputation outputs, and verification state are subreddit-specific operational signals rather than official Reddit account status, legal findings, background-check data, or proof of a user's identity or intent.

== Purpose ==
Reputation Flair is intended to make repeated contribution patterns more visible to users and moderators. It can evaluate posts and comments, update user flair, count broad discourse categories, route content for review, apply public-view removals when configured, and operate optional human-verification gates.

The service is configurable by subreddit moderators. Because settings differ across communities, the same Reddit account may receive different visible outputs or moderation outcomes in different subreddits.

== Main functions ==
{| class="wikitable"
! Function
! Description
|-
| Reputation scoring
| Calculates subreddit-specific good and bad reputation points, contribution counts, category counters, and reputation percentages.
|-
| Flair output
| Updates user flair with selected fields such as reputation percentage, warning count, activity count, preserved flair text, streak badge, or verification badge.
|-
| Moderation assistance
| Can route content for review, apply configured public-view removals, and maintain compact RFstats moderator-note summaries.
|-
| Transparency dashboard
| Can create or repair a subreddit portal showing subreddit statistics, leaderboards, lookup tools, and transparency metrics.
|-
| Human verification
| Can run optional verification challenges and store verification state for badge, gate, and restoration behavior.
|-
| Verification-only restoration
| Can approve eligible content that was removed only because a user was not verified, subject to moderator configuration and caps.
|}

== Configuration ==
Subreddit moderators control whether Reputation Flair changes flair, routes content to review, removes content from public view, requires verification, restores verification-only removals, updates RFstats mod notes, or displays portal data. The terms page states that moderators are responsible for choosing settings appropriate to their communities.

== Data handling summary ==
Reputation Flair reads post and comment text to score discourse and decide whether configured actions apply. In the current design, the service stores scores, counters, moderation outcomes, verification state, rate-limit records, and related operational metadata, but it does not normally keep a private Redis copy of full post or comment bodies or a long-term raw log of matched trigger phrases.

== Documentation ==
* [[Reputation_Flair|Reputation Flair]] — encyclopedia-style article about the application.
* [[Metopedia:Reputation_Flair/Terms|Terms]] — service rules, eligibility, moderator responsibilities, limitations, and legal provisions.
* [[Metopedia:Reputation_Flair/Privacy_Policy|Privacy policy]] — data categories, storage, sharing, retention, deletion, and security summary.
* [[Metopedia:Reputation_Flair/FAQ|FAQ]] — public explanation of scoring, triggers, verification, flair, and stored data.

== Persistent external links ==
* [https://developers.reddit.com/apps/reputation-flair Reddit Developers app listing]
* [https://github.com/andylehti/reputation_flair GitHub repository]
* [https://github.com/andylehti/reputation_flair/blob/main/README.md Repository README]
* [https://github.com/andylehti/reputation_flair/blob/main/faq.md Repository FAQ]
* [https://github.com/andylehti/reputation_flair/blob/main/rf-terms.md Repository terms]
* [https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md Repository privacy policy]

{| class="navbox"
! colspan="2" class="navbox-title" | [[Metopedia:Reputation_Flair|Reputation Flair]]
|-
! class="navbox-group" | Article
| class="navbox-list" | [[Reputation_Flair|Reputation Flair]]
|-
! class="navbox-group" | Service pages
| class="navbox-list" | [[Metopedia:Reputation_Flair|Overview]] • [[Metopedia:Reputation_Flair/Terms|Terms]] • [[Metopedia:Reputation_Flair/Privacy_Policy|Privacy policy]] • [[Metopedia:Reputation_Flair/FAQ|FAQ]]
|-
! class="navbox-group" | Related
| class="navbox-list" | [[Metopedia:Services|Metopedia services]] • [[Privacy_Policy|Metopedia privacy policy]] • [[Terms_of_Use|Metopedia terms of use]]
|}

[[Category:Metopedia services]]
[[Category:Reputation Flair]]
[[Category:Reddit Devvit applications]]
[[Category:Service documentation]]
