---
title: "Reputation Flair"
description: "Reputation Flair is a Reddit Devvit application associated with Metopedia for subreddit reputation scoring, flair generation, moderation assistance, transparency dashboards, and optional human verification."
keywords: "Reputation Flair, Reddit Devvit, subreddit moderation, user flair, reputation scoring, Bot Shield, human verification, Metopedia services"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
ogImage: "https://metopedia.com/Assets/metopedia-og.png"
---
{{short description|Reddit Devvit application for subreddit reputation scoring, flair, dashboards, moderation assistance, and optional human verification.}}
<div class="hatnote">This article is about the Reddit Devvit application. For official service documentation, see [[Metopedia:Reputation_Flair|Metopedia:Reputation Flair]].</div>
{{Infobox
| title = Reputation Flair
| Other names = RF; Reputation Flair System; Bot Shield; Human Verification Module; Reputation Portal
| Developer = Andrew Lehti / Metopedia
| Stable release = 0.5.05
| Platform = Reddit Devvit
| Written in = TypeScript; HTML; CSS
| Runtime storage = Reddit Devvit Redis
| Type = Subreddit moderation-assistance and reputation application
| License = BSD-3-Clause
| App listing = [https://developers.reddit.com/apps/reputation-flair Reddit Developers]
| Repository = [https://github.com/andylehti/reputation_flair GitHub]
| Service pages = [[Metopedia:Reputation_Flair|Overview]] · [[Metopedia:Reputation_Flair/Terms|Terms]] · [[Metopedia:Reputation_Flair/Privacy_Policy|Privacy policy]] · [[Metopedia:Reputation_Flair/FAQ|FAQ]]
}}

'''Reputation Flair''' is a Reddit Devvit application associated with Metopedia. It is designed for subreddit-level reputation scoring, user flair generation, moderation assistance, transparency dashboards, and optional human verification. The application is published under the name <code>reputation-flair</code> and is documented through both Metopedia service pages and the project repository.<ref name="devapp">[https://developers.reddit.com/apps/reputation-flair Reputation Flair app listing], Reddit Developers.</ref><ref name="readme">[https://github.com/andylehti/reputation_flair/blob/main/README.md Reputation Flair README], GitHub.</ref>

The application measures contribution patterns inside a subreddit rather than across Reddit as a whole. Its output may include good and bad reputation points, contribution counts, broad discourse-category counters, a reputation percentage, a warning count, subreddit activity totals, verification state, and a compact flair string. Its official terms describe these values as subreddit-specific operational signals rather than official Reddit account status, legal findings, background-check data, or proof of a user's character, identity, or intent.<ref name="terms">[https://github.com/andylehti/reputation_flair/blob/main/rf-terms.md Reputation Flair terms], GitHub.</ref>

== Overview ==
Reputation Flair belongs to a class of moderation-assistance tools that use automated scoring and visible feedback to make repeated behavior easier to inspect. In normal use, the application receives Reddit and Devvit events, reads public post or comment text for scoring, updates subreddit-scoped records, and may update user flair or subreddit dashboard data. Depending on moderator configuration, it can also route content for review, remove content from public view, create or repair a portal post, and operate a human-verification challenge.

The system is not intended to replace human moderation. Its terms describe review and removal behavior as assistance for moderators, with moderators remaining responsible for enforcing subreddit and Reddit rules.<ref name="terms" />

== Name and scope ==
The service documentation treats several names as referring to the same underlying system, including '''Reputation Flair''', '''RF''', '''Reputation Flair System''', '''RFS''', '''Bot Shield''', '''Human Verification Module''', '''Subreddit Stats by Reputation Flair''', and the '''Reputation Portal'''.<ref name="terms" /> In common use, ''Reputation Flair'' refers to the whole Devvit app, while ''Bot Shield'' usually refers to its optional human-verification component.

The system is subreddit-scoped. A user's records, flair, verification state, dashboard presence, and moderation outcomes may differ from one subreddit to another because each subreddit can use different settings.

== Development and implementation ==
The 0.5.05 package is implemented as a Devvit Web application with a TypeScript backend and a web-based client. The backend uses Hono routes for API, menu, scheduler, settings, and trigger endpoints. Its client entrypoints include a portal/splash interface and a human-verification flow.

The Devvit configuration defines menu actions for creating or resetting the Reputation Portal, opening the configuration builder, opening the public portal, and launching human verification. It also defines event triggers for submitted posts and comments and for Automoderator-filtered posts and comments. The application uses Reddit and Redis permissions through Devvit and stores subreddit-scoped runtime data in Redis.

== Functions ==
{| class="wikitable"
! Function
! Description
|-
| Reputation scoring
| Calculates good and bad reputation values, good and bad contribution counts, and a visible reputation percentage for each subreddit context.
|-
| Discourse categories
| Groups trigger results into broad categories such as direct attacks, dismissal or shutdown, credibility attacks, condescension or provocation, bad-faith framing, and manipulation or gaslighting.
|-
| Flair generation
| Builds user flair from configurable parts, including streak or verification badge, preserved user flair text, reputation percentage, warning count, and activity count.
|-
| Moderator notes
| Can maintain a compact <code>RFstats:</code> moderator note summarizing category counts, post/comment counts, good and bad contribution counts, reputation percentage, and verification state.
|-
| Review and removal routing
| Can send matching content to moderator review or remove it from public view when configured thresholds are met.
|-
| Reputation Portal
| Can create or repair a subreddit custom post that hosts dashboards, leaderboards, transparency data, lookup tools, and verification access.
|-
| Human verification
| Can run optional Bot Shield challenges and store verification state for badge, gate, and restoration behavior.
|-
| Command replies
| Can respond to commands such as <code>!rfcheck me</code>, <code>!rfcheck op</code>, and <code>!rfcheck u/username</code>, subject to rate limits and configuration.
|}

== Scoring model ==
Reputation Flair uses a mixed scoring model. The positive side gives credit for text length, formatting, links, and other context values. The negative side scans for configured bad-discourse matches, reduces overlap where one match is contained inside another, converts remaining matches into severity, applies a buffer, and then applies context forgiveness. Final bad reputation can reduce the good reputation earned by the same item.

In public-facing documentation, a post or comment is counted as a good contribution when its final reduced bad-reputation value is zero. It is counted as a bad contribution when that value is greater than zero.<ref name="faq">[https://github.com/andylehti/reputation_flair/blob/main/faq.md Reputation Flair FAQ], GitHub.</ref>

The application also calculates a reputation percentage for flair. The FAQ describes this as a combination of good-versus-bad contribution history and point totals, clamped to a range from -100 to +100.<ref name="faq" />

== Discourse categories ==
The application's negative-discourse model is organized around six public discourse categories. These categories are meant to summarize the type of discourse pattern rather than to preserve every raw matched phrase.

{| class="wikitable"
! Icon
! Category
! General meaning
|-
| 💥
| Direct attacks
| Insults, abusive labels, or hostile statements directed at another user.
|-
| ⛔
| Dismissal or shutdown
| Replies that attempt to end discussion without addressing substance.
|-
| 🤥
| Credibility attacks
| Claims that frame another user as dishonest, illegitimate, or not worth hearing.
|-
| 💅
| Condescension or provocation
| Snark, belittling, baiting, or superiority framing.
|-
| 🎭
| Bad-faith framing
| Claims that attribute false motives or misrepresent another user's position.
|-
| ⛽
| Manipulation or gaslighting
| Blame reversal, reality distortion, or coercive framing.
|}

A separate bot-trigger field may be displayed as a rate, but public documentation deliberately avoids exposing the mechanics of behavioral bot-trigger detection.

== Flair output ==
The application can update user flair with a compact record of subreddit-specific contribution history. A typical flair may include a streak or verification badge, preserved user-defined flair text, a reputation percentage, a warning count, and post/comment activity. In the 0.5.05 line, the visible bot-trigger output is limited to the value itself, normally as a rate against total contributions.

Verification can alter flair display. When human verification is enabled and a user is verified, the verification badge can replace the ordinary streak badge. If verification expires, the application can mark the state as expired and refresh the flair on later user activity.

== Moderator configuration ==
Moderators configure the application through a single <code>rfConfig</code> field or by using the external configuration builder. The configuration controls high-traffic behavior, custom bad terms, mod-note updates, weekly decay, streak mode, flair parts, flair color, preserved flair text, review thresholds, removal thresholds, moderator and approved-user exemptions, human-verification behavior, reminder cadence, and verification-only restoration limits.<ref name="readme" />

Because configuration is local to a subreddit, the same application can operate as a light transparency tool in one community and as a stricter moderation workflow in another.

== Human verification ==
The optional human-verification system is presented to users as Bot Shield. It can run interactive challenges, track pass/fail state, store verification metadata, and feed verification status back into flair, dashboards, participation gates, and verification-only restoration. The privacy policy states that a normal failed challenge is not treated as proof that a user is a bot; verification outcomes are used to support the configured workflow.<ref name="privacy">[https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md Reputation Flair privacy policy], GitHub.</ref>

In the 0.5.05 package, human verification uses short-lived challenge/session data, server-side validation, telemetry checks, and Redis-backed state. Verification may expire, and expiration is evaluated when later activity reveals that the saved expiration time has passed.

== Data handling ==
The privacy policy states that Reputation Flair reads public post and comment text to score discourse and determine whether configured review, removal, verification, or flair behavior applies. In the current design, scores, counters, categories, moderation outcomes, verification state, and operational metadata may be stored, but full post or comment bodies are not normally stored in the app's Redis records and raw matched trigger phrases are not normally stored as a long-term phrase log.<ref name="privacy" />

Stored data may include Reddit and Devvit identifiers, subreddit names, post and comment IDs, reputation records, category counters, verification state, portal records, dashboard caches, cooldown records, configuration values, and short-lived challenge/session/telemetry records.<ref name="privacy" />

== Limitations ==
Reputation Flair's scores are approximate operational signals. They can change after new activity, configuration changes, verification changes, app updates, bug fixes, moderation actions, or data cleanup. The terms do not guarantee that a score, flair string, leaderboard position, command reply, dashboard value, mod note, or transparency value will be accurate, uninterrupted, complete, permanent, or indefinitely available.<ref name="terms" />

The application is also platform-dependent. It operates through Reddit, Devvit, Reddit APIs, Devvit permissions, and Redis runtime storage. Its behavior may be affected by Reddit platform changes, permission limits, app review status, deleted content, moderator actions, or technical failures.

== Service documentation ==
Metopedia separates the neutral article about the application from official service pages. The service pages are operational documents rather than encyclopedia entries.

* [[Metopedia:Reputation_Flair|Service overview]]
* [[Metopedia:Reputation_Flair/Terms|Terms]]
* [[Metopedia:Reputation_Flair/Privacy_Policy|Privacy policy]]
* [[Metopedia:Reputation_Flair/FAQ|FAQ]]

== References ==
<references/>

== External links ==
* [https://developers.reddit.com/apps/reputation-flair Reputation Flair on Reddit Developers]
* [https://github.com/andylehti/reputation_flair Reputation Flair GitHub repository]
* [https://github.com/andylehti/reputation_flair/blob/main/README.md Repository README]
* [https://github.com/andylehti/reputation_flair/blob/main/faq.md Repository FAQ]
* [https://github.com/andylehti/reputation_flair/blob/main/rf-terms.md Terms]
* [https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md Privacy policy]
* [https://andylehti.github.io/reputation-flair-config/ Configuration builder]

{| class="navbox"
! colspan="2" class="navbox-title" | Reputation Flair
|-
! class="navbox-group" | Article
| class="navbox-list" | [[Reputation_Flair|Reputation Flair]]
|-
! class="navbox-group" | Service pages
| class="navbox-list" | [[Metopedia:Reputation_Flair|Service overview]] • [[Metopedia:Reputation_Flair/Terms|Terms]] • [[Metopedia:Reputation_Flair/Privacy_Policy|Privacy policy]] • [[Metopedia:Reputation_Flair/FAQ|FAQ]]
|-
! class="navbox-group" | Related
| class="navbox-list" | [[Metopedia:Services|Metopedia services]] • [[Cognitive_Impasse|Cognitive Impasse]] • [[Methodology|Methodology]]
|}

[[Category:Reputation Flair]]
[[Category:Reddit Devvit applications]]
[[Category:Moderation tools]]
[[Category:Metopedia services]]
[[Category:Human verification]]
