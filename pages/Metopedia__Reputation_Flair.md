---
layout: wiki
title: "Reputation Flair"
description: "A Metopedia service page for Reputation Flair, a Reddit Devvit application for reputation scoring, flair, moderation assistance, transparency dashboards, and optional human verification."
keywords: "Reputation Flair, Metopedia service, Reddit Devvit, subreddit moderation, human verification, bot shield, reputation scoring"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
og_image: "https://metopedia.com/assets/metopedia-og.png"
permalink: "/Metopedia/Reputation_Flair/"
canonical_url: "/Metopedia/Reputation_Flair/"
wiki_page: true
slug_name: "Metopedia:Reputation_Flair"
source_path: "./Services/Reputation_Flair.md"
wiki_categories: ["Metopedia applications", "Reputation Flair", "Reddit Devvit applications", "Application documentation"]
last_modified: "2026-04-25"
---

<div class="hatnote">This page is application documentation for a Metopedia-associated application. It is not a general encyclopedia article.</div>
<table class="infobox"><tr><th colspan="2" class="infobox-header">Reputation Flair</th></tr><tr><th class="infobox-label">Type</th><td>Reddit Devvit application</td></tr><tr><th class="infobox-label">Application family</th><td>Metopedia applications</td></tr><tr><th class="infobox-label">Platform</th><td>Reddit and Devvit</td></tr><tr><th class="infobox-label">Operator</th><td>Andrew Lehti and/or Metopedia</td></tr><tr><th class="infobox-label">Main functions</th><td>reputation scoring, user flair, moderation assistance, transparency dashboards, optional human verification</td></tr><tr><th class="infobox-label">Article</th><td><a href="/Reputation_Flair/">Reputation Flair</a></td></tr><tr><th class="infobox-label">Policy pages</th><td><a href="/Metopedia/Reputation_Flair/Terms/">Terms</a> · <a href="/Metopedia/Reputation_Flair/Privacy_Policy/">Privacy policy</a> · <a href="/Metopedia/Reputation_Flair/FAQ/">FAQ</a></td></tr><tr><th class="infobox-label">App listing</th><td><a class="external" href="https://developers.reddit.com/apps/reputation-flair">Reddit Developers</a></td></tr><tr><th class="infobox-label">Repository</th><td><a class="external" href="https://github.com/andylehti/reputation_flair">GitHub</a></td></tr><tr><th class="infobox-label">Contact</th><td>policy@metopedia.com</td></tr></table>
<p><b>Reputation Flair</b> is a Metopedia-associated Reddit Devvit application for subreddit-level reputation scoring, flair generation, moderation assistance, transparency dashboards, and optional human verification. It may also be referred to as <b>RF</b>, <b>Reputation Flair System</b>, <b>Bot Shield</b>, <b>Human Verification Module</b>, <b>Subreddit Stats by Reputation Flair</b>, or the <b>Reputation Portal</b>.</p>
<p>The service is designed for subreddit use. Its records, dashboards, reputation outputs, and verification state are subreddit-specific operational signals rather than official Reddit account status, legal findings, background-check data, or proof of a user's identity or intent.</p>
<h2 id="purpose">Purpose</h2>
<p>Reputation Flair is intended to make repeated contribution patterns more visible to users and moderators. It can evaluate posts and comments, update user flair, count broad discourse categories, route content for review, apply public-view removals when configured, and operate optional human-verification gates.</p>
<p>The service is configurable by subreddit moderators. Because settings differ across communities, the same Reddit account may receive different visible outputs or moderation outcomes in different subreddits.</p>
<h2 id="main-functions">Main functions</h2>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Function</th><th>Description</th></tr><tr><td>Reputation scoring</td><td>Calculates subreddit-specific good and bad reputation points, contribution counts, category counters, and reputation percentages.</td></tr><tr><td>Flair output</td><td>Updates user flair with selected fields such as reputation percentage, warning count, activity count, preserved flair text, streak badge, or verification badge.</td></tr><tr><td>Moderation assistance</td><td>Can route content for review, apply configured public-view removals, and maintain compact RFstats moderator-note summaries.</td></tr><tr><td>Transparency dashboard</td><td>Can create or repair a subreddit portal showing subreddit statistics, leaderboards, lookup tools, and transparency metrics.</td></tr><tr><td>Human verification</td><td>Can run optional verification challenges and store verification state for badge, gate, and restoration behavior.</td></tr><tr><td>Verification-only restoration</td><td>Can approve eligible content that was removed only because a user was not verified, subject to moderator configuration and caps.</td></tr></table></div>
<h2 id="configuration">Configuration</h2>
<p>Subreddit moderators control whether Reputation Flair changes flair, routes content to review, removes content from public view, requires verification, restores verification-only removals, updates RFstats mod notes, or displays portal data. The terms page states that moderators are responsible for choosing settings appropriate to their communities.</p>
<h2 id="data-handling-summary">Data handling summary</h2>
<p>Reputation Flair reads post and comment text to score discourse and decide whether configured actions apply. In the current design, the service stores scores, counters, moderation outcomes, verification state, rate-limit records, and related operational metadata, but it does not normally keep a private Redis copy of full post or comment bodies or a long-term raw log of matched trigger phrases.</p>
<h2 id="documentation">Documentation</h2>
<ul>
<li><a href="/Reputation_Flair/">Reputation Flair</a> — encyclopedia-style article about the application.</li>
<li><a href="/Metopedia/Reputation_Flair/Terms/">Terms</a> — service rules, eligibility, moderator responsibilities, limitations, and legal provisions.</li>
<li><a href="/Metopedia/Reputation_Flair/Privacy_Policy/">Privacy policy</a> — data categories, storage, sharing, retention, deletion, and security summary.</li>
<li><a href="/Metopedia/Reputation_Flair/FAQ/">FAQ</a> — public explanation of scoring, triggers, verification, flair, and stored data.</li>
</ul>
<h2 id="persistent-external-links">Persistent external links</h2>
<ul>
<li><a class="external" href="https://developers.reddit.com/apps/reputation-flair">Reddit Developers app listing</a></li>
<li><a class="external" href="https://github.com/andylehti/reputation_flair">GitHub repository</a></li>
<li><a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/README.md">Repository README</a></li>
<li><a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/faq.md">Repository FAQ</a></li>
<li><a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/rf-terms.md">Repository terms</a></li>
<li><a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md">Repository privacy policy</a></li>
</ul>
<div class="navbox-shell"><table class="navbox"><tr><th class="navbox-title" colspan="2"><a href="/Metopedia/Reputation_Flair/">Reputation Flair</a></th></tr><tr><th class="navbox-group">Article</th><td class="navbox-list"><a href="/Reputation_Flair/">Reputation Flair</a></td></tr><tr><th class="navbox-group">Application pages</th><td class="navbox-list"><a href="/Metopedia/Reputation_Flair/">Overview</a> • <a href="/Metopedia/Reputation_Flair/Terms/">Terms</a> • <a href="/Metopedia/Reputation_Flair/Privacy_Policy/">Privacy policy</a> • <a href="/Metopedia/Reputation_Flair/FAQ/">FAQ</a></td></tr><tr><th class="navbox-group">Related</th><td class="navbox-list"><a href="/Metopedia/Research/">Research</a> • <a href="/Privacy_Policy/">Metopedia privacy policy</a> • <a href="/Terms_of_Use/">Metopedia terms of use</a></td></tr></table></div>

