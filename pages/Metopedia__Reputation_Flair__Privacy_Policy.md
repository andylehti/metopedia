---
layout: wiki
title: "Reputation Flair/Privacy Policy"
description: "Privacy policy for the Reputation Flair Metopedia service and Reddit Devvit application."
keywords: "Reputation Flair privacy policy, Metopedia service privacy, Reddit Devvit app privacy, moderation app data"
author: "Metopedia Policy"
robots: "index,follow,max-image-preview:large"
og_image: "https://metopedia.com/Assets/metopedia-og.png"
permalink: "/Metopedia/Reputation_Flair/Privacy_Policy/"
canonical_url: "/Metopedia/Reputation_Flair/Privacy_Policy/"
wiki_page: true
slug_name: "Metopedia:Reputation_Flair/Privacy_Policy"
source_path: "./Services/Reputation_Flair_Privacy_Policy.md"
wiki_categories: ["Metopedia applications", "Reputation Flair", "Privacy policies", "Application documentation"]
last_modified: "2026-04-25"
---

{% raw %}
<div class="hatnote">This is an official service page for Reputation Flair. It describes service data handling rather than serving as a general encyclopedia article.</div>
<table class="infobox"><tr><th colspan="2" class="infobox-header">Reputation Flair/Privacy Policy</th></tr><tr><th class="infobox-label">Service</th><td><a href="/Metopedia/Reputation_Flair/">Reputation Flair</a></td></tr><tr><th class="infobox-label">Page type</th><td>Privacy policy</td></tr><tr><th class="infobox-label">Last updated</th><td>April 25, 2026</td></tr><tr><th class="infobox-label">Operator</th><td>Andrew Lehti and/or Metopedia</td></tr><tr><th class="infobox-label">Contact</th><td>policy@metopedia.com</td></tr><tr><th class="infobox-label">Source</th><td><a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md">GitHub</a></td></tr></table>
<p>This <b>Reputation Flair Privacy Policy</b> explains how <a href="/Metopedia/Reputation_Flair/">Reputation Flair</a> collects, uses, stores, shares, and deletes information when the service is used through Reddit and Devvit.</p>
<p>Reputation Flair operates on Reddit's Devvit platform. Use of Reddit and Devvit is also governed by Reddit's applicable terms, rules, privacy policies, developer terms, and platform policies.</p>
<h2 id="overview">Overview</h2>
<p>Reputation Flair is a subreddit moderation, reputation, flair, transparency, and optional human-verification application. It processes data to calculate subreddit-specific reputation statistics, update user flair, show transparency metrics, route content for moderator review or removal when configured, and operate optional verification features.</p>
<p>The service aims to minimize data collection and retain only data reasonably needed to provide the service, protect subreddit integrity, calculate reputation and flair, support moderation workflows, rate-limit abuse, maintain app security, and comply with Reddit, Devvit, legal, and safety requirements.</p>
<h2 id="information-processed">Information processed</h2>
<p>Depending on configuration and use, Reputation Flair may process the following categories of information.</p>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Category</th><th>Examples</th></tr><tr><td>Reddit and Devvit identifiers</td><td>Reddit username, user ID when provided, subreddit name, post ID, comment ID, custom post ID, portal post ID, session ID, request ID, or internal runtime identifiers.</td></tr><tr><td>Public Reddit activity</td><td>Post or comment text read transiently for scoring and moderation decisions; public metadata needed to identify processed content; reviewed, removed, approved, restored, or processed state.</td></tr><tr><td>Reputation, flair, and moderation records</td><td>Good and bad reputation points, post and comment counts, streak values, category counters, bot-trigger totals, flair text, cached preserved flair-head text, RFstats summaries, review/removal markers, and processed-item markers.</td></tr><tr><td>Human verification data</td><td>Verification state, verification timestamps, expiry timestamp, failed-verification count, challenge/session state, challenge scoring summaries, trap/severity outcomes, telemetry needed to validate verification, and short-lived abuse-prevention records.</td></tr><tr><td>Portal, command, and dashboard data</td><td>Portal post record, portal repair/reset history, lookup rate limits, command cooldowns, compact reply state, cached transparency snapshots, and daily history.</td></tr><tr><td>Moderator configuration</td><td>Subreddit-specific configuration values, review/removal thresholds, flair options, verification settings, restore limits, rate limits, cache settings, and other moderator-selected options.</td></tr><tr><td>Technical and operational data</td><td>Runtime cache records, Redis keys, anti-abuse locks, rate-limit records, diagnostics, audit records, scheduler state, and errors available through Reddit/Devvit developer tooling.</td></tr></table></div>
<h2 id="information-not-intentionally-collected">Information not intentionally collected</h2>
<p>The service does not ask for or intentionally collect Reddit passwords, direct messages, email addresses, phone numbers, legal names, home addresses, precise location data, payment data, demographic information, health information, political beliefs, religion, browser history, Reddit browsing history, posts or comments merely viewed, or a private long-term copy of full post or comment bodies.</p>
<p>The service also does not intentionally collect IP addresses except where Reddit or Devvit platform tooling independently processes them outside the service's direct control.</p>
<h2 id="use-of-information">Use of information</h2>
<p>The service uses information to calculate reputation statistics, update flair, preserve selected flair-head text, display dashboards, build leaderboards, route content for review, remove content when enabled, apply OP-self-reply protections, maintain RFstats mod notes, operate human verification, enforce verification-only participation rules, restore eligible verification-only removals, rate-limit commands and dashboards, prevent abuse, diagnose bugs, maintain app integrity, and comply with Reddit, Devvit, legal, and safety requirements.</p>
<h2 id="stored-data">Stored data</h2>
<p>Reputation Flair may store data in Redis or related Devvit runtime storage. Stored records may include per-user reputation records, activity counts, category counters, verification state, verification metadata, verification-only removal markers, restore queue records, subreddit totals, daily totals, leaderboards, dashboard snapshots, portal records, processed/reviewed/removed markers, cooldowns, flair update timestamps, cached flair-head text, subreddit configuration, challenge/session/telemetry records, and abuse-prevention locks.</p>
<p>Some records are temporary and expire automatically. Other records may persist longer because they are needed for reputation history, flair consistency, moderation state, transparency, leaderboards, or operational continuity.</p>
<h2 id="post-and-comment-text-handling">Post and comment text handling</h2>
<p>The service reads post and comment text to score discourse and decide whether configured review, removal, verification, or flair behavior applies. In the current design:</p>
<ul>
<li>text is processed for scoring;</li>
<li>scores, counters, categories, and moderation outcomes may be stored;</li>
<li>full post or comment bodies are not normally stored in the service's Redis records;</li>
<li>raw matched trigger phrases are not normally stored as a long-term phrase log;</li>
<li>verification-only removal metadata may store item type, item ID, username, and timestamp so eligible items can be restored later.</li>
</ul>
<h2 id="human-verification-data">Human verification data</h2>
<p>When human verification is enabled, the service may process challenge and session data needed to determine whether a verification attempt passes, fails, expires, or should be marked for review by the service's scoring logic. Verification data may include session ID, stage ID, timestamps, validation state, scoring summaries, failed-verification count, verification state, expiry timestamp, and challenge telemetry required to validate the flow.</p>
<p>Verification data is used for service functionality, moderation safety, abuse prevention, and related diagnostics. A normal failed challenge is not treated as proof that a user is a bot.</p>
<h2 id="sharing">Sharing</h2>
<p>The operator does not sell or rent personal data. Limited data may be shared or exposed only through Reddit and Devvit services as necessary to operate the service, to subreddit moderators through Reddit-native surfaces such as flair, mod notes, review/removal state, dashboards, or portal views, with infrastructure providers if any, when required by law or platform enforcement, to investigate abuse or security incidents, or in aggregated or de-identified form where appropriate.</p>
<p>The service does not transmit scored post/comment text to an external analytics provider as part of normal operation.</p>
<h2 id="configuration-generator">Configuration generator</h2>
<p>The service may link moderators to an optional interactive configuration generator. Moderators should not paste private, sensitive, or unrelated personal information into the generator. The live service is controlled by the configuration value moderators choose to paste into Reddit/Devvit settings.</p>
<h2 id="sensitive-trait-inference-and-re-identification">Sensitive-trait inference and re-identification</h2>
<p>The service is not intended to infer sensitive personal traits, conduct background checks, identify users outside Reddit, re-identify users across unrelated datasets, de-anonymize users, or conduct surveillance-style monitoring.</p>
<h2 id="retention">Retention</h2>
<p>Retention varies by record type. Challenge sessions and telemetry may be short-lived. Command cooldowns and rate-limit records may expire automatically. Portal records may persist while the service is installed. Reputation totals, leaderboard state, and transparency data may persist longer. Verification state may persist until expiration, reset, deletion, or configuration changes. Processed, reviewed, and removed markers may persist where needed to avoid duplicate actions.</p>
<p>No score, flair state, leaderboard position, dashboard history, portal post, verification state, or moderation marker is guaranteed to be retained permanently.</p>
<h2 id="deletion-and-platform-events">Deletion and platform events</h2>
<p>Where Reddit or Devvit deletion events apply, the operator aims to remove or stop using related stored data when technically feasible and appropriate. Minimal metadata may be retained where needed for system integrity, diagnostics, fraud prevention, moderation state, abuse prevention, or platform compliance. Privacy or deletion requests are reviewed in light of the data actually controlled by the service, Reddit platform constraints, and applicable law.</p>
<h2 id="visibility">Visibility</h2>
<p>Moderator-visible data may include flair output, RFstats mod notes when enabled, reviewed or removed content states, portal and dashboard statistics, subreddit transparency totals, and verification state where enabled. Internal app state may include processed-item flags, review/removal markers, verification-restoration tracking, cache records, cooldowns, short-lived challenge state, and daily snapshots.</p>
<h2 id="security-children-and-international-use">Security, children, and international use</h2>
<p>The operator takes reasonable steps to protect service data, including limiting collection, using Reddit/Devvit runtime storage, avoiding unnecessary raw-text retention, limiting data to service purposes, and applying rate-limit and abuse-prevention safeguards. No method of storage or transmission is perfectly secure.</p>
<p>The service is not intended for children under 13. Users outside the United States should understand that information may be processed in jurisdictions where data protection laws differ from their location.</p>
<h2 id="changes-contact-and-governing-law">Changes, contact, and governing law</h2>
<p>This policy may be updated from time to time. Changes may be reflected by revising the date on this page and providing notice where appropriate. Continued use after changes take effect means the revised policy is accepted.</p>
<p>For privacy, support, or policy questions, contact <b>policy@metopedia.com</b>. This policy is governed by the laws of the State of Minnesota, United States, except where applicable law requires otherwise.</p>
<h2 id="persistent-source">Persistent source</h2>
<p>The repository copy of this privacy policy is maintained at <a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md">rf-privacy.md</a>. Related public references include the <a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/README.md">repository README</a>, the <a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/faq.md">FAQ</a>, and the <a class="external" href="https://developers.reddit.com/apps/reputation-flair">Reddit Developers app listing</a>.</p>
<div class="navbox-shell"><table class="navbox"><tr><th class="navbox-title" colspan="2"><a href="/Metopedia/Reputation_Flair/">Reputation Flair</a></th></tr><tr><th class="navbox-group">Article</th><td class="navbox-list"><a href="/Reputation_Flair/">Reputation Flair</a></td></tr><tr><th class="navbox-group">Application pages</th><td class="navbox-list"><a href="/Metopedia/Reputation_Flair/">Overview</a> • <a href="/Metopedia/Reputation_Flair/Terms/">Terms</a> • <a href="/Metopedia/Reputation_Flair/Privacy_Policy/">Privacy policy</a> • <a href="/Metopedia/Reputation_Flair/FAQ/">FAQ</a></td></tr><tr><th class="navbox-group">Related</th><td class="navbox-list"><a href="/Metopedia/Research/">Research</a> • <a href="/Privacy_Policy/">Metopedia privacy policy</a> • <a href="/Terms_of_Use/">Metopedia terms of use</a></td></tr></table></div>

{% endraw %}
