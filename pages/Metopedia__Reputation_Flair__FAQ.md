---
layout: wiki
title: "Reputation Flair/FAQ"
description: "Frequently asked questions for the Reputation Flair Metopedia service and Reddit Devvit application."
keywords: "Reputation Flair FAQ, reputation scoring, flair, Reddit Devvit, Bot Shield, human verification, moderation app"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
og_image: "https://metopedia.com/Assets/metopedia-og.png"
permalink: "/Metopedia/Reputation_Flair/FAQ/"
canonical_url: "/Metopedia/Reputation_Flair/FAQ/"
wiki_page: true
slug_name: "Metopedia:Reputation_Flair/FAQ"
source_path: "./Services/Reputation_Flair_FAQ.md"
wiki_categories: ["Metopedia applications", "Reputation Flair", "Frequently asked questions", "Application documentation"]
last_modified: "2026-04-25"
---

<div class="hatnote">This is a service help page for Reputation Flair. It explains the application for users and moderators rather than presenting a neutral encyclopedia article.</div>
<table class="infobox"><tr><th colspan="2" class="infobox-header">Reputation Flair/FAQ</th></tr><tr><th class="infobox-label">Service</th><td><a href="/Metopedia/Reputation_Flair/">Reputation Flair</a></td></tr><tr><th class="infobox-label">Page type</th><td>Frequently asked questions</td></tr><tr><th class="infobox-label">Platform</th><td>Reddit and Devvit</td></tr><tr><th class="infobox-label">Related pages</th><td><a href="/Metopedia/Reputation_Flair/Terms/">Terms</a> · <a href="/Metopedia/Reputation_Flair/Privacy_Policy/">Privacy policy</a></td></tr><tr><th class="infobox-label">Source</th><td><a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/faq.md">GitHub</a></td></tr></table>
<p>This <b>Reputation Flair FAQ</b> explains how the <a href="/Metopedia/Reputation_Flair/">Reputation Flair</a> service handles scoring, flair, triggers, moderation, verification, and stored data. Exact behavior may differ by subreddit because moderators choose the configuration.</p>
<h2 id="what-the-service-does">What the service does</h2>
<p>Reputation Flair tracks contribution quality over time inside a subreddit. It can measure good reputation, bad reputation, triggers, activity, reputation score, verification status, and bot-trigger behavior. When enabled, it can also flag content for moderator review, filter content from public view, update flair, operate dashboards, and handle human verification.</p>
<p>The goal is transparency, self-awareness, and accountability. The service is designed to help users understand contribution patterns, make low-value discourse easier to spot over time, and make troll-like or bot-like behavior patterns easier for moderators to recognize.</p>
<h2 id="processing-flow">Processing flow</h2>
<p>When a post or comment is processed, the service generally follows this order:</p>
<ol>
<li>Load the user record and user statistics.</li>
<li>Apply weekly bad-reputation decay when enabled.</li>
<li>Increment post or comment count.</li>
<li>Update streak information.</li>
<li>Compute the starting good-side value.</li>
<li>Find bad-discourse matches.</li>
<li>Convert kept matches into severity.</li>
<li>Apply the bad-reputation buffer.</li>
<li>Apply text-context forgiveness.</li>
<li>Add category spread or concentration penalties.</li>
<li>Apply OP self-reply protection when enabled.</li>
<li>Determine review and removal eligibility.</li>
<li>If normal removal triggers, remove for that reason first.</li>
<li>Otherwise check the verification gate.</li>
<li>If blocked only because the user is not verified, treat the item as a verification-only moderation outcome.</li>
<li>Otherwise apply bad-reputation points.</li>
<li>Reduce good reputation if bad reputation exists.</li>
<li>Add good-reputation points.</li>
<li>Mark the item as good or bad.</li>
<li>Update user, subreddit, and daily statistics.</li>
<li>Update the RFstats mod note when enabled.</li>
<li>Route to review when needed.</li>
<li>Update flair.</li>
</ol>
<h2 id="score-variables">Score variables</h2>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Variable</th><th>Meaning</th></tr><tr><td><code>textContextScore&lt;/code></td><td>A quality and context value for the post or comment.</td></tr><tr><td><code>goodDivisor&lt;/code></td><td>A scaling value controlling how quickly text context becomes good reputation.</td></tr><tr><td><code>bonusScore&lt;/code></td><td>Extra good-side value from approved positive contribution signals.</td></tr><tr><td><code>scoreCeiling&lt;/code></td><td>Maximum good-reputation points one item can receive.</td></tr><tr><td><code>badReduced&lt;/code></td><td>Final reduced bad-reputation value after buffers, context forgiveness, and protections.</td></tr></table></div>
<h2 id="activity-and-reputation-fields">Activity and reputation fields</h2>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Field</th><th>Meaning</th></tr><tr><td>Subreddit streak</td><td>The user's current streak in the subreddit.</td></tr><tr><td>Posts</td><td>Total posts by the user in the subreddit.</td></tr><tr><td>Comments</td><td>Total comments by the user in the subreddit.</td></tr><tr><td>Contributions</td><td>Posts and comments combined.</td></tr><tr><td>Good reputation points</td><td>Total positive reputation points.</td></tr><tr><td>Bad reputation points</td><td>Total negative reputation points.</td></tr><tr><td>Good reputation contributions</td><td>Count of items whose final reduced bad reputation is <code>0&lt;/code>.</td></tr><tr><td>Bad reputation contributions</td><td>Count of items whose final reduced bad reputation is greater than <code>0&lt;/code>.</td></tr></table></div>
<p>Counts and points are not the same thing. A user may have many contributions with modest point totals, or fewer contributions with larger point totals. The service is intended to show the average pattern over time.</p>
<h2 id="trigger-and-verification-fields">Trigger and verification fields</h2>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Symbol or field</th><th>Meaning</th></tr><tr><td>💥 Attack triggers</td><td>Direct attack matches.</td></tr><tr><td>⛔ Shutdown triggers</td><td>Dismissal or shutdown matches.</td></tr><tr><td>🤥 Credibility triggers</td><td>Attacks on honesty, motives, or legitimacy.</td></tr><tr><td>💅 Condescension triggers</td><td>Snark, belittling, or provocation.</td></tr><tr><td>🎭 Bad faith triggers</td><td>False framing or twisted intent.</td></tr><tr><td>⛽ Gaslighting triggers</td><td>Manipulation, blame reversal, or reality distortion.</td></tr><tr><td>⚠️ Total triggers</td><td>Compact trigger total shown in summaries and flair.</td></tr><tr><td>🛡️ Verified</td><td>Whether the account is currently verified.</td></tr><tr><td>📅 Verified Since</td><td>When the current verification period began.</td></tr><tr><td>⏳ Verification Expires</td><td>When the current verification ends, if expiry is enabled.</td></tr><tr><td>❌ Failed Verifications</td><td>Recent failed verification attempts.</td></tr><tr><td>🤖 Bot Triggers</td><td>Behavioral signals connected to suspicious posting/commenting patterns or verification outcomes.</td></tr></table></div>
<h2 id="total-triggers-and-cognitive-bias-signals">Total triggers and cognitive-bias signals</h2>
<p>Total triggers are not a pure measure of toxicity, manipulation, harassment, or bot-like behavior. Very low-risk matches and high-risk matches both increase the total trigger count, so the total should be read with category totals, good-versus-bad balance, contribution counts, reputation score, verification state, and bot-trigger data.</p>
<p>A user with many cognitive-bias-style signals may often dismiss, shut down, or react defensively. That pattern can raise trigger totals without proving harassment by itself.</p>
<h2 id="trigger-databases">Trigger databases</h2>
<p>Triggers are phrase, token, stem, or pattern matches tied to bad discourse. Some matches indicate weak or low-value discourse; others carry higher severity. The service groups trigger data into broad categories rather than exposing every internal rule.</p>
<p>The current bad-reputation databases include:</p>
<p>&lt;score> mentalHealthPhrases goAwayDismissalPhrases intelligenceAttackPhrases condescensionSnarkPhrases credibilityErasersPhrases postHistoryAttackPhrases shillBotNpcPhrases tribePhrases baitTrollPhrases moralShutdownPhrases projectionFlipPhrases feignedConfusionPhrases extraBadPhrases argumentativePhrases mentalHealthTokens oneWordTokens stems mentalHealthStems shillStems insultStems nonsenseStems memeStems mildStems botNgram nonEnglishTokens &lt;/score></p>
<h2 id="good-reputation-calculation">Good-reputation calculation</h2>
<p>Good reputation begins with the following compact calculation:</p>
<p>&lt;score> goodRaw = floor(textContextScore / goodDivisor) + bonusScore earnedGood = clamp(goodRaw, 0, scoreCeiling) &lt;/score></p>
<p>The clamp operation keeps the result inside the permitted range. If <code>goodRaw&lt;/code> is below &lt;code>0&lt;/code>, the service uses &lt;code>0&lt;/code>. If it is above &lt;code>scoreCeiling&lt;/code>, the service uses &lt;code>scoreCeiling&lt;/code>. Otherwise, it keeps the computed value.</p>
<h2 id="bad-reputation-calculation">Bad-reputation calculation</h2>
<p>The bad-reputation side works in stages.</p>
<ol>
<li>The service scans phrase databases, token databases, stem databases, regex rules with extreme normalization, and custom bad terms added by subreddit moderators.</li>
<li>Weaker overlapping matches are removed where possible.</li>
<li>Kept hits become severity values under <code>BAD_SCORING_MODE = "sev"&lt;/code>.</li>
<li>Raw severity is summed.</li>
<li>A bad buffer may be subtracted.</li>
<li>Text-context forgiveness may reduce the result.</li>
<li>Category spread or concentration penalties may increase the result.</li>
</ol>
<p>Severity conversion:</p>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Weight</th><th>Severity</th></tr><tr><td><code>-10&lt;/code></td><td><code>5&lt;/code></td></tr><tr><td><code>-8&lt;/code> or &lt;code>-7&lt;/code></td><td><code>4&lt;/code></td></tr><tr><td><code>-6&lt;/code> or &lt;code>-5&lt;/code></td><td><code>3&lt;/code></td></tr><tr><td><code>-4&lt;/code> or &lt;code>-3&lt;/code></td><td><code>2&lt;/code></td></tr><tr><td><code>-2&lt;/code></td><td><code>1&lt;/code></td></tr></table></div>
<p>Context forgiveness uses a streak-adjusted divisor:</p>
<p>&lt;score> streakAdjustment = min(128, floor(streak / 2)) errorDivisor = 256 - streakAdjustment badReduced = max(0, scaledBad - floor(textContextScore / errorDivisor)) &lt;/score></p>
<h2 id="other-score-modifiers">Other score modifiers</h2>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Modifier</th><th>Effect</th></tr><tr><td>Weekly decay</td><td>If enabled, bad reputation can decay once per full week since last activity.</td></tr><tr><td>Streak modes</td><td>Current modes include <code>noexpire&lt;/code>, &lt;code>hourly24&lt;/code>, and &lt;code>hourly48&lt;/code>.</td></tr><tr><td>Category concentration</td><td>If one category totals at least three points, the service may add one extra point.</td></tr><tr><td>Category spread</td><td>If four or more categories were hit, the service may add two extra points.</td></tr><tr><td>OP self-reply protection</td><td>If enabled for comments on the user's own post, good reputation may be capped, bad reputation forced to zero, and category flags cleared.</td></tr></table></div>
<h2 id="review-removal-and-verification-order">Review, removal, and verification order</h2>
<p>Review and removal are optional moderator-configured systems. Normal removal rules take priority over verification-only gating. If an item qualifies for normal removal, it is removed for that reason first and is not treated as a verification-only removal. If it is blocked only because the user is not verified, it can be handled under the verification rules.</p>
<p>If restore-after-verification is enabled, eligible verification-only removed items may be restored after the user becomes verified, subject to configured limits and Reddit platform behavior.</p>
<h2 id="verification-badge-behavior">Verification badge behavior</h2>
<p>If human verification is active and an account is verified, the normal streak badge can be replaced by the verification badge. If the account is not verified, the normal streak badge remains.</p>
<h2 id="reputation-score">Reputation score</h2>
<p>The service uses two reputation-style percentages.</p>
<p>The simple user score is:</p>
<p>&lt;score> 100 * (goodPosts - badPosts) / (goodPosts + badPosts) &lt;/score></p>
<p>The full flair reputation score begins with the same base, then applies a point-shift component:</p>
<p>&lt;score> base = 100 * (goodPosts - badPosts) / (goodPosts + badPosts) a = goodRepPoints / (goodPosts + 1) b = badRepPoints * (badPosts + 1) shift = 40 * (a - b) / (a + b) repScore = clamp(round(base + shift), -100, 100) &lt;/score></p>
<p>Plainly: many good contributions help, many bad contributions hurt, high bad-reputation totals hurt harder, and high good-reputation totals help.</p>
<h2 id="contributor-status-ranges">Contributor-status ranges</h2>
<div class="wikitable-wrap"><table class="wikitable"><tr><th>Range</th><th>Status</th></tr><tr><td>+85% to +100%</td><td>Elite contributor</td></tr><tr><td>+70% to +84%</td><td>Top contributor</td></tr><tr><td>+50% to +69%</td><td>Strong contributor</td></tr><tr><td>+30% to +49%</td><td>Reliable contributor</td></tr><tr><td>+10% to +29%</td><td>Positive contributor</td></tr><tr><td>-9% to +9%</td><td>Mixed contributor</td></tr><tr><td>-29% to -10%</td><td>Developing contributor</td></tr><tr><td>-49% to -30%</td><td>Limited contributor</td></tr><tr><td>-69% to -50%</td><td>Minimal contributor</td></tr><tr><td>-100% to -70%</td><td>Needs improvement</td></tr></table></div>
<h2 id="flair-output">Flair output</h2>
<p>Flair may include a streak or verification badge, preserved flair-head text, reputation percentage, warning count, activity count, good contribution count, bad contribution count, or a combination selected by moderators.</p>
<p>Old-style output emphasizes point totals:</p>
<p>&lt;score> +goodRepPoints ∣ -badRepPoints &lt;/score></p>
<p>New-style output emphasizes reputation percentage, warning count, and activity:</p>
<p>&lt;score> ⚖️ rep% ∣ ⚠️ offenseCount ∣ ⌨️ [activity] &lt;/score></p>
<h2 id="stored-data">Stored data</h2>
<p>At a high level, the service stores subreddit-specific moderation and reputation data, not a private copy of a Reddit account. Stored information may include per-user reputation totals, activity counts, broad category counters, subreddit-wide totals, daily totals, moderation state flags, verification state, verification metadata, cached flair-head text when needed, and RFstats summaries when enabled.</p>
<h2 id="post-and-comment-storage">Post and comment storage</h2>
<p>The service reads post and comment text to score discourse. In the current build, text is read and processed, reputation totals and moderation outcomes are stored, but full or partial private Redis copies of post or comment bodies are not normally kept by the service. Raw matched trigger phrases are not normally persisted as a long-term phrase log.</p>
<h2 id="personal-information">Personal information</h2>
<p>The service stores only the minimum subreddit-linked data needed for its features. It does not ask for or intentionally store email addresses, phone numbers, legal names, home addresses, location data, demographic data, payment data, IP addresses, browser data, Reddit browsing history, viewed posts or comments, full or partial copies of posts/comments, or item-level tallies of every specific trigger phrase.</p>
<h2 id="removed-items-and-triggered-phrases">Removed items and triggered phrases</h2>
<p>Triggered phrases are not normally stored as a long-term phrase log. Instead, the service stores scoring results such as category counters, good and bad reputation totals, contribution counts, subreddit totals, and moderation outcomes.</p>
<p>For verification-only removals, the service may store small metadata so eligible items can be restored later. This can include lowercase username, item type, item ID, and timestamp. It does not require a private copy of the removed text.</p>
<h2 id="persistent-source">Persistent source</h2>
<p>The repository copy of this FAQ is maintained at <a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/faq.md">faq.md</a>. Related public references include the <a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/README.md">repository README</a>, the <a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/rf-terms.md">terms</a>, the <a class="external" href="https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md">privacy policy</a>, and the <a class="external" href="https://developers.reddit.com/apps/reputation-flair">Reddit Developers app listing</a>.</p>
<div class="navbox-shell"><table class="navbox"><tr><th class="navbox-title" colspan="2"><a href="/Metopedia/Reputation_Flair/">Reputation Flair</a></th></tr><tr><th class="navbox-group">Article</th><td class="navbox-list"><a href="/Reputation_Flair/">Reputation Flair</a></td></tr><tr><th class="navbox-group">Application pages</th><td class="navbox-list"><a href="/Metopedia/Reputation_Flair/">Overview</a> • <a href="/Metopedia/Reputation_Flair/Terms/">Terms</a> • <a href="/Metopedia/Reputation_Flair/Privacy_Policy/">Privacy policy</a> • <a href="/Metopedia/Reputation_Flair/FAQ/">FAQ</a></td></tr><tr><th class="navbox-group">Related</th><td class="navbox-list"><a href="/Metopedia/Research/">Research</a> • <a href="/Privacy_Policy/">Metopedia privacy policy</a> • <a href="/Terms_of_Use/">Metopedia terms of use</a></td></tr></table></div>

