---
title: "Reputation Flair/Privacy Policy"
description: "Privacy policy for the Reputation Flair Metopedia service and Reddit Devvit application."
keywords: "Reputation Flair privacy policy, Metopedia service privacy, Reddit Devvit app privacy, moderation app data"
author: "Metopedia Policy"
robots: "index,follow,max-image-preview:large"
ogImage: "https://metopedia.com/Assets/metopedia-og.png"
---
{{short description|Privacy policy for the Reputation Flair Metopedia service.}}
<div class="hatnote">This is an official service page for Reputation Flair. It describes service data handling rather than serving as a general encyclopedia article.</div>
{{Infobox
| title = Reputation Flair/Privacy Policy
| Service = [[Metopedia:Reputation_Flair|Reputation Flair]]
| Page type = Privacy policy
| Last updated = April 25, 2026
| Operator = Andrew Lehti and/or Metopedia
| Contact = policy@metopedia.com
| Source = [https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md GitHub]
}}

This '''Reputation Flair Privacy Policy''' explains how [[Metopedia:Reputation_Flair|Reputation Flair]] collects, uses, stores, shares, and deletes information when the service is used through Reddit and Devvit.

Reputation Flair operates on Reddit's Devvit platform. Use of Reddit and Devvit is also governed by Reddit's applicable terms, rules, privacy policies, developer terms, and platform policies.

== Overview ==
Reputation Flair is a subreddit moderation, reputation, flair, transparency, and optional human-verification application. It processes data to calculate subreddit-specific reputation statistics, update user flair, show transparency metrics, route content for moderator review or removal when configured, and operate optional verification features.

The service aims to minimize data collection and retain only data reasonably needed to provide the service, protect subreddit integrity, calculate reputation and flair, support moderation workflows, rate-limit abuse, maintain app security, and comply with Reddit, Devvit, legal, and safety requirements.

== Information processed ==
Depending on configuration and use, Reputation Flair may process the following categories of information.

{| class="wikitable"
! Category
! Examples
|-
| Reddit and Devvit identifiers
| Reddit username, user ID when provided, subreddit name, post ID, comment ID, custom post ID, portal post ID, session ID, request ID, or internal runtime identifiers.
|-
| Public Reddit activity
| Post or comment text read transiently for scoring and moderation decisions; public metadata needed to identify processed content; reviewed, removed, approved, restored, or processed state.
|-
| Reputation, flair, and moderation records
| Good and bad reputation points, post and comment counts, streak values, category counters, bot-trigger totals, flair text, cached preserved flair-head text, RFstats summaries, review/removal markers, and processed-item markers.
|-
| Human verification data
| Verification state, verification timestamps, expiry timestamp, failed-verification count, challenge/session state, challenge scoring summaries, trap/severity outcomes, telemetry needed to validate verification, and short-lived abuse-prevention records.
|-
| Portal, command, and dashboard data
| Portal post record, portal repair/reset history, lookup rate limits, command cooldowns, compact reply state, cached transparency snapshots, and daily history.
|-
| Moderator configuration
| Subreddit-specific configuration values, review/removal thresholds, flair options, verification settings, restore limits, rate limits, cache settings, and other moderator-selected options.
|-
| Technical and operational data
| Runtime cache records, Redis keys, anti-abuse locks, rate-limit records, diagnostics, audit records, scheduler state, and errors available through Reddit/Devvit developer tooling.
|}

== Information not intentionally collected ==
The service does not ask for or intentionally collect Reddit passwords, direct messages, email addresses, phone numbers, legal names, home addresses, precise location data, payment data, demographic information, health information, political beliefs, religion, browser history, Reddit browsing history, posts or comments merely viewed, or a private long-term copy of full post or comment bodies.

The service also does not intentionally collect IP addresses except where Reddit or Devvit platform tooling independently processes them outside the service's direct control.

== Use of information ==
The service uses information to calculate reputation statistics, update flair, preserve selected flair-head text, display dashboards, build leaderboards, route content for review, remove content when enabled, apply OP-self-reply protections, maintain RFstats mod notes, operate human verification, enforce verification-only participation rules, restore eligible verification-only removals, rate-limit commands and dashboards, prevent abuse, diagnose bugs, maintain app integrity, and comply with Reddit, Devvit, legal, and safety requirements.

== Stored data ==
Reputation Flair may store data in Redis or related Devvit runtime storage. Stored records may include per-user reputation records, activity counts, category counters, verification state, verification metadata, verification-only removal markers, restore queue records, subreddit totals, daily totals, leaderboards, dashboard snapshots, portal records, processed/reviewed/removed markers, cooldowns, flair update timestamps, cached flair-head text, subreddit configuration, challenge/session/telemetry records, and abuse-prevention locks.

Some records are temporary and expire automatically. Other records may persist longer because they are needed for reputation history, flair consistency, moderation state, transparency, leaderboards, or operational continuity.

== Post and comment text handling ==
The service reads post and comment text to score discourse and decide whether configured review, removal, verification, or flair behavior applies. In the current design:

* text is processed for scoring;
* scores, counters, categories, and moderation outcomes may be stored;
* full post or comment bodies are not normally stored in the service's Redis records;
* raw matched trigger phrases are not normally stored as a long-term phrase log;
* verification-only removal metadata may store item type, item ID, username, and timestamp so eligible items can be restored later.

== Human verification data ==
When human verification is enabled, the service may process challenge and session data needed to determine whether a verification attempt passes, fails, expires, or should be marked for review by the service's scoring logic. Verification data may include session ID, stage ID, timestamps, validation state, scoring summaries, failed-verification count, verification state, expiry timestamp, and challenge telemetry required to validate the flow.

Verification data is used for service functionality, moderation safety, abuse prevention, and related diagnostics. A normal failed challenge is not treated as proof that a user is a bot.

== Sharing ==
The operator does not sell or rent personal data. Limited data may be shared or exposed only through Reddit and Devvit services as necessary to operate the service, to subreddit moderators through Reddit-native surfaces such as flair, mod notes, review/removal state, dashboards, or portal views, with infrastructure providers if any, when required by law or platform enforcement, to investigate abuse or security incidents, or in aggregated or de-identified form where appropriate.

The service does not transmit scored post/comment text to an external analytics provider as part of normal operation.

== Configuration generator ==
The service may link moderators to an optional interactive configuration generator. Moderators should not paste private, sensitive, or unrelated personal information into the generator. The live service is controlled by the configuration value moderators choose to paste into Reddit/Devvit settings.

== Sensitive-trait inference and re-identification ==
The service is not intended to infer sensitive personal traits, conduct background checks, identify users outside Reddit, re-identify users across unrelated datasets, de-anonymize users, or conduct surveillance-style monitoring.

== Retention ==
Retention varies by record type. Challenge sessions and telemetry may be short-lived. Command cooldowns and rate-limit records may expire automatically. Portal records may persist while the service is installed. Reputation totals, leaderboard state, and transparency data may persist longer. Verification state may persist until expiration, reset, deletion, or configuration changes. Processed, reviewed, and removed markers may persist where needed to avoid duplicate actions.

No score, flair state, leaderboard position, dashboard history, portal post, verification state, or moderation marker is guaranteed to be retained permanently.

== Deletion and platform events ==
Where Reddit or Devvit deletion events apply, the operator aims to remove or stop using related stored data when technically feasible and appropriate. Minimal metadata may be retained where needed for system integrity, diagnostics, fraud prevention, moderation state, abuse prevention, or platform compliance. Privacy or deletion requests are reviewed in light of the data actually controlled by the service, Reddit platform constraints, and applicable law.

== Visibility ==
Moderator-visible data may include flair output, RFstats mod notes when enabled, reviewed or removed content states, portal and dashboard statistics, subreddit transparency totals, and verification state where enabled. Internal app state may include processed-item flags, review/removal markers, verification-restoration tracking, cache records, cooldowns, short-lived challenge state, and daily snapshots.

== Security, children, and international use ==
The operator takes reasonable steps to protect service data, including limiting collection, using Reddit/Devvit runtime storage, avoiding unnecessary raw-text retention, limiting data to service purposes, and applying rate-limit and abuse-prevention safeguards. No method of storage or transmission is perfectly secure.

The service is not intended for children under 13. Users outside the United States should understand that information may be processed in jurisdictions where data protection laws differ from their location.

== Changes, contact, and governing law ==
This policy may be updated from time to time. Changes may be reflected by revising the date on this page and providing notice where appropriate. Continued use after changes take effect means the revised policy is accepted.

For privacy, support, or policy questions, contact '''policy@metopedia.com'''. This policy is governed by the laws of the State of Minnesota, United States, except where applicable law requires otherwise.

== Persistent source ==
The repository copy of this privacy policy is maintained at [https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md rf-privacy.md]. Related public references include the [https://github.com/andylehti/reputation_flair/blob/main/README.md repository README], the [https://github.com/andylehti/reputation_flair/blob/main/faq.md FAQ], and the [https://developers.reddit.com/apps/reputation-flair Reddit Developers app listing].

{| class="navbox"
! colspan="2" class="navbox-title" | [[Metopedia:Reputation_Flair|Reputation Flair]]
|-
! class="navbox-group" | Article
| class="navbox-list" | [[Reputation_Flair|Reputation Flair]]
|-
! class="navbox-group" | Application pages
| class="navbox-list" | [[Metopedia:Reputation_Flair|Overview]] • [[Metopedia:Reputation_Flair/Terms|Terms]] • [[Metopedia:Reputation_Flair/Privacy_Policy|Privacy policy]] • [[Metopedia:Reputation_Flair/FAQ|FAQ]]
|-
! class="navbox-group" | Related
| class="navbox-list" | [[Metopedia:Research|Research]] • [[Privacy_Policy|Metopedia privacy policy]] • [[Terms_of_Use|Metopedia terms of use]]
|}

[[Category:Metopedia applications]]
[[Category:Reputation Flair]]
[[Category:Privacy policies]]
[[Category:Application documentation]]
