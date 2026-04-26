---
title: "Reputation Flair/FAQ"
description: "Frequently asked questions for the Reputation Flair Metopedia service and Reddit Devvit application."
keywords: "Reputation Flair FAQ, reputation scoring, flair, Reddit Devvit, Bot Shield, human verification, moderation app"
author: "Metopedia Editorial"
robots: "index,follow,max-image-preview:large"
ogImage: "https://metopedia.com/assets/metopedia-og.png"
---
{{short description|Frequently asked questions for the Reputation Flair Metopedia service.}}
<div class="hatnote">This is a service help page for Reputation Flair. It explains the application for users and moderators rather than presenting a neutral encyclopedia article.</div>
{{Infobox
| title = Reputation Flair/FAQ
| Service = [[Metopedia:Reputation_Flair|Reputation Flair]]
| Page type = Frequently asked questions
| Platform = Reddit and Devvit
| Related pages = [[Metopedia:Reputation_Flair/Terms|Terms]] · [[Metopedia:Reputation_Flair/Privacy_Policy|Privacy policy]]
| Source = [https://github.com/andylehti/reputation_flair/blob/main/faq.md GitHub]
}}

This '''Reputation Flair FAQ''' explains how the [[Metopedia:Reputation_Flair|Reputation Flair]] service handles scoring, flair, triggers, moderation, verification, and stored data. Exact behavior may differ by subreddit because moderators choose the configuration.

== What the service does ==
Reputation Flair tracks contribution quality over time inside a subreddit. It can measure good reputation, bad reputation, triggers, activity, reputation score, verification status, and bot-trigger behavior. When enabled, it can also flag content for moderator review, filter content from public view, update flair, operate dashboards, and handle human verification.

The goal is transparency, self-awareness, and accountability. The service is designed to help users understand contribution patterns, make low-value discourse easier to spot over time, and make troll-like or bot-like behavior patterns easier for moderators to recognize.

== Processing flow ==
When a post or comment is processed, the service generally follows this order:

# Load the user record and user statistics.
# Apply weekly bad-reputation decay when enabled.
# Increment post or comment count.
# Update streak information.
# Compute the starting good-side value.
# Find bad-discourse matches.
# Convert kept matches into severity.
# Apply the bad-reputation buffer.
# Apply text-context forgiveness.
# Add category spread or concentration penalties.
# Apply OP self-reply protection when enabled.
# Determine review and removal eligibility.
# If normal removal triggers, remove for that reason first.
# Otherwise check the verification gate.
# If blocked only because the user is not verified, treat the item as a verification-only moderation outcome.
# Otherwise apply bad-reputation points.
# Reduce good reputation if bad reputation exists.
# Add good-reputation points.
# Mark the item as good or bad.
# Update user, subreddit, and daily statistics.
# Update the RFstats mod note when enabled.
# Route to review when needed.
# Update flair.

== Score variables ==
{| class="wikitable"
! Variable
! Meaning
|-
| <code>textContextScore</code>
| A quality and context value for the post or comment.
|-
| <code>goodDivisor</code>
| A scaling value controlling how quickly text context becomes good reputation.
|-
| <code>bonusScore</code>
| Extra good-side value from approved positive contribution signals.
|-
| <code>scoreCeiling</code>
| Maximum good-reputation points one item can receive.
|-
| <code>badReduced</code>
| Final reduced bad-reputation value after buffers, context forgiveness, and protections.
|}

== Activity and reputation fields ==
{| class="wikitable"
! Field
! Meaning
|-
| Subreddit streak
| The user's current streak in the subreddit.
|-
| Posts
| Total posts by the user in the subreddit.
|-
| Comments
| Total comments by the user in the subreddit.
|-
| Contributions
| Posts and comments combined.
|-
| Good reputation points
| Total positive reputation points.
|-
| Bad reputation points
| Total negative reputation points.
|-
| Good reputation contributions
| Count of items whose final reduced bad reputation is <code>0</code>.
|-
| Bad reputation contributions
| Count of items whose final reduced bad reputation is greater than <code>0</code>.
|}

Counts and points are not the same thing. A user may have many contributions with modest point totals, or fewer contributions with larger point totals. The service is intended to show the average pattern over time.

== Trigger and verification fields ==
{| class="wikitable"
! Symbol or field
! Meaning
|-
| 💥 Attack triggers
| Direct attack matches.
|-
| ⛔ Shutdown triggers
| Dismissal or shutdown matches.
|-
| 🤥 Credibility triggers
| Attacks on honesty, motives, or legitimacy.
|-
| 💅 Condescension triggers
| Snark, belittling, or provocation.
|-
| 🎭 Bad faith triggers
| False framing or twisted intent.
|-
| ⛽ Gaslighting triggers
| Manipulation, blame reversal, or reality distortion.
|-
| ⚠️ Total triggers
| Compact trigger total shown in summaries and flair.
|-
| 🛡️ Verified
| Whether the account is currently verified.
|-
| 📅 Verified Since
| When the current verification period began.
|-
| ⏳ Verification Expires
| When the current verification ends, if expiry is enabled.
|-
| ❌ Failed Verifications
| Recent failed verification attempts.
|-
| 🤖 Bot Triggers
| Behavioral signals connected to suspicious posting/commenting patterns or verification outcomes.
|}

== Total triggers and cognitive-bias signals ==
Total triggers are not a pure measure of toxicity, manipulation, harassment, or bot-like behavior. Very low-risk matches and high-risk matches both increase the total trigger count, so the total should be read with category totals, good-versus-bad balance, contribution counts, reputation score, verification state, and bot-trigger data.

A user with many cognitive-bias-style signals may often dismiss, shut down, or react defensively. That pattern can raise trigger totals without proving harassment by itself.

== Trigger databases ==
Triggers are phrase, token, stem, or pattern matches tied to bad discourse. Some matches indicate weak or low-value discourse; others carry higher severity. The service groups trigger data into broad categories rather than exposing every internal rule.

The current bad-reputation databases include:

<score>
mentalHealthPhrases
goAwayDismissalPhrases
intelligenceAttackPhrases
condescensionSnarkPhrases
credibilityErasersPhrases
postHistoryAttackPhrases
shillBotNpcPhrases
tribePhrases
baitTrollPhrases
moralShutdownPhrases
projectionFlipPhrases
feignedConfusionPhrases
extraBadPhrases
argumentativePhrases
mentalHealthTokens
oneWordTokens
stems
mentalHealthStems
shillStems
insultStems
nonsenseStems
memeStems
mildStems
botNgram
nonEnglishTokens
</score>

== Good-reputation calculation ==
Good reputation begins with the following compact calculation:

<score>
goodRaw = floor(textContextScore / goodDivisor) + bonusScore
earnedGood = clamp(goodRaw, 0, scoreCeiling)
</score>

The clamp operation keeps the result inside the permitted range. If <code>goodRaw</code> is below <code>0</code>, the service uses <code>0</code>. If it is above <code>scoreCeiling</code>, the service uses <code>scoreCeiling</code>. Otherwise, it keeps the computed value.

== Bad-reputation calculation ==
The bad-reputation side works in stages.

# The service scans phrase databases, token databases, stem databases, regex rules with extreme normalization, and custom bad terms added by subreddit moderators.
# Weaker overlapping matches are removed where possible.
# Kept hits become severity values under <code>BAD_SCORING_MODE = "sev"</code>.
# Raw severity is summed.
# A bad buffer may be subtracted.
# Text-context forgiveness may reduce the result.
# Category spread or concentration penalties may increase the result.

Severity conversion:

{| class="wikitable"
! Weight
! Severity
|-
| <code>-10</code>
| <code>5</code>
|-
| <code>-8</code> or <code>-7</code>
| <code>4</code>
|-
| <code>-6</code> or <code>-5</code>
| <code>3</code>
|-
| <code>-4</code> or <code>-3</code>
| <code>2</code>
|-
| <code>-2</code>
| <code>1</code>
|}

Context forgiveness uses a streak-adjusted divisor:

<score>
streakAdjustment = min(128, floor(streak / 2))
errorDivisor = 256 - streakAdjustment
badReduced = max(0, scaledBad - floor(textContextScore / errorDivisor))
</score>

== Other score modifiers ==
{| class="wikitable"
! Modifier
! Effect
|-
| Weekly decay
| If enabled, bad reputation can decay once per full week since last activity.
|-
| Streak modes
| Current modes include <code>noexpire</code>, <code>hourly24</code>, and <code>hourly48</code>.
|-
| Category concentration
| If one category totals at least three points, the service may add one extra point.
|-
| Category spread
| If four or more categories were hit, the service may add two extra points.
|-
| OP self-reply protection
| If enabled for comments on the user's own post, good reputation may be capped, bad reputation forced to zero, and category flags cleared.
|}

== Review, removal, and verification order ==
Review and removal are optional moderator-configured systems. Normal removal rules take priority over verification-only gating. If an item qualifies for normal removal, it is removed for that reason first and is not treated as a verification-only removal. If it is blocked only because the user is not verified, it can be handled under the verification rules.

If restore-after-verification is enabled, eligible verification-only removed items may be restored after the user becomes verified, subject to configured limits and Reddit platform behavior.

== Verification badge behavior ==
If human verification is active and an account is verified, the normal streak badge can be replaced by the verification badge. If the account is not verified, the normal streak badge remains.

== Reputation score ==
The service uses two reputation-style percentages.

The simple user score is:

<score>
100 * (goodPosts - badPosts) / (goodPosts + badPosts)
</score>

The full flair reputation score begins with the same base, then applies a point-shift component:

<score>
base = 100 * (goodPosts - badPosts) / (goodPosts + badPosts)
a = goodRepPoints / (goodPosts + 1)
b = badRepPoints * (badPosts + 1)
shift = 40 * (a - b) / (a + b)
repScore = clamp(round(base + shift), -100, 100)
</score>

Plainly: many good contributions help, many bad contributions hurt, high bad-reputation totals hurt harder, and high good-reputation totals help.

== Contributor-status ranges ==
{| class="wikitable"
! Range
! Status
|-
| +85% to +100%
| Elite contributor
|-
| +70% to +84%
| Top contributor
|-
| +50% to +69%
| Strong contributor
|-
| +30% to +49%
| Reliable contributor
|-
| +10% to +29%
| Positive contributor
|-
| -9% to +9%
| Mixed contributor
|-
| -29% to -10%
| Developing contributor
|-
| -49% to -30%
| Limited contributor
|-
| -69% to -50%
| Minimal contributor
|-
| -100% to -70%
| Needs improvement
|}

== Flair output ==
Flair may include a streak or verification badge, preserved flair-head text, reputation percentage, warning count, activity count, good contribution count, bad contribution count, or a combination selected by moderators.

Old-style output emphasizes point totals:

<score>
+goodRepPoints ∣ -badRepPoints
</score>

New-style output emphasizes reputation percentage, warning count, and activity:

<score>
⚖️ rep% ∣ ⚠️ offenseCount ∣ ⌨️ [activity]
</score>

== Stored data ==
At a high level, the service stores subreddit-specific moderation and reputation data, not a private copy of a Reddit account. Stored information may include per-user reputation totals, activity counts, broad category counters, subreddit-wide totals, daily totals, moderation state flags, verification state, verification metadata, cached flair-head text when needed, and RFstats summaries when enabled.

== Post and comment storage ==
The service reads post and comment text to score discourse. In the current build, text is read and processed, reputation totals and moderation outcomes are stored, but full or partial private Redis copies of post or comment bodies are not normally kept by the service. Raw matched trigger phrases are not normally persisted as a long-term phrase log.

== Personal information ==
The service stores only the minimum subreddit-linked data needed for its features. It does not ask for or intentionally store email addresses, phone numbers, legal names, home addresses, location data, demographic data, payment data, IP addresses, browser data, Reddit browsing history, viewed posts or comments, full or partial copies of posts/comments, or item-level tallies of every specific trigger phrase.

== Removed items and triggered phrases ==
Triggered phrases are not normally stored as a long-term phrase log. Instead, the service stores scoring results such as category counters, good and bad reputation totals, contribution counts, subreddit totals, and moderation outcomes.

For verification-only removals, the service may store small metadata so eligible items can be restored later. This can include lowercase username, item type, item ID, and timestamp. It does not require a private copy of the removed text.

== Persistent source ==
The repository copy of this FAQ is maintained at [https://github.com/andylehti/reputation_flair/blob/main/faq.md faq.md]. Related public references include the [https://github.com/andylehti/reputation_flair/blob/main/README.md repository README], the [https://github.com/andylehti/reputation_flair/blob/main/rf-terms.md terms], the [https://github.com/andylehti/reputation_flair/blob/main/rf-privacy.md privacy policy], and the [https://developers.reddit.com/apps/reputation-flair Reddit Developers app listing].

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
[[Category:Frequently asked questions]]
[[Category:Application documentation]]
