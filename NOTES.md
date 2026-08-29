# JD Strategic — rebuild against a client-chosen reference (2026-08-29)

Live: https://javmartz04-ship-it.github.io/jd-strategic-site/
Repo: javmartz04-ship-it/jd-strategic-site (branch `main`)

## Brief

Javier: *"take what we have and rebuild it to be similar to the reference website…
Josh really likes the reference website, which is our competitor's site… make it
exactly like the reference site, but a little bit better. We already have the brand
colors."*

Reference: **thefranchiseinsiders.com** (The Franchise Insiders, a direct competitor).
Intake answers: use **Josh's brand**, keep **the quiz**, and **restructure his existing
proof** rather than adding new claims.

## Where the live link actually pointed

The URL Javier sent (`/jd-strategic-site/`) was **not** backed by the newest local
build. `jd-strategic-hero-poster` (Aug 28, repo `jd-strategic-hero`) was the strongest
work but lived at a different URL; the live link was the Aug 26
`jd-strategic-franchising-site` (byte-identical, 380,724). The repo had never been
cloned locally. Cloned it, rebuilt in place, pushed there so the link Javier shares
is the one that updates. **Asset library was lifted from hero-poster** (real Josh
portrait, studio headshot, feature poster, 14 episode stills, OG image), replacing the
old build's 4 base64-inlined images.

## Direction

**Editorial consulting broadsheet.** The reference is Inter + Playfair Display on navy
`#0b1b3b` and gold `#b88722`, left-aligned, eyebrow-per-section, numbered rails. Josh's
tokens are navy `#0A1D3A` + orange `#FF6A00`, which maps onto it exactly: **orange takes
gold's job**, nothing else changes. That is why the brand survived a near-total
structural transplant.

Faces cut from four to three: **Poppins** display (his brand), **Inter** body,
**Playfair Display** for statement lines and pull quotes. **Space Grotesk dropped** —
Playfair is what carries the reference's editorial register, and four faces breaks the
system rule. Radius held at **4/8px** page-wide (institutional register, matches both
the reference's feel and `TYPE-AND-COLOR.md`'s "expensive, old-money" band).

## Structure map (reference → ours)

| Reference | Ours |
|---|---|
| Utility bar + nav + BOOK A CALL | Same; CTA "Schedule My Free Consultation" ×10 verbatim |
| "Buy a great franchise." | "Buy a franchise that holds up in **year five.**" |
| 870+ / 100% / $0 | 2,400+ / $0 / 3–5, count-up on scroll |
| AS FEATURED IN logo strip | Credential belt — Josh has no press logos |
| Fit finder, step 1 of 2 | **His existing 3-question quiz**, restyled |
| OUR POINT OF VIEW 01–03 | "You're not choosing a brand. You're choosing *your fit.*" |
| WHAT WE DO WITH EVERY CLIENT | His real 5-step process + process photo |
| WHO WE ARE | Raised in franchising / restaurants / franchisor side |
| CATEGORIES WE'RE WATCHING | **Swapped for broker vs coach** — his best differentiator, no TFI equivalent |
| Client stories ×2 sections | **One** clearly-marked sample block |
| THE INSIDE SCOOP | Conquer the Mind, on-site, no YouTube links |
| — | His FAQ (the reference has none) |

## What was deliberately NOT copied

The reference's spine is **named client proof with revenue figures** (Hector's $3M,
Kathryn's MVP year, Cody's $1.3M, Harrison's exit). Those are TFI's real clients.
Josh's existing site marks its testimonial section *"Sample layout. Real client stories
to be supplied."* — he has none. Reproducing theirs would be false revenue claims about
Josh's business in an FDD/FTC-regulated category. The story slots stay **visibly marked
as sample layout** with a dashed orange note, per `LESSONS.md`. Proof weight moved onto
what is real and verifiable: the 2,400+ locations (attributed to **his family**, not to
him), FranServe certification, $0 cost, 14 real podcast episodes.

## Deviations from `system/`, both deliberate

1. **13 eyebrows across 12 sections**, vs the `ceil(sections/3)` = 4 cap. Eyebrow-per-
   section *is* the reference's defining rhythm; dropping it would have missed the brief.
2. **Playfair added as a third face.** Net faces still three (Space Grotesk removed).

Both flagged to Javier before building, neither is a silent override.

## Craft notes

- **Hero integration**: the 3-stat rail carries `margin-top:-58px` so it crosses the
  portrait's lower edge. The figure is interleaved with the layout, never sitting on a
  backdrop panel (the hero-poster v1 rejection). An orange corner bracket sits *behind*
  the photo at z:-1 for depth.
- A second decorative hairline square left of the portrait read as a stray artifact in
  the first capture and was deleted. Depth from one element, not two.
- The stat rail's negative margin also ate the reassure line and buried the founder
  badge. Fixed with `padding-bottom:86px` on the copy column and raising the badge to
  `bottom:82px`.

## Verification

Headless Chromium driven directly (`playwright-core` in scratchpad), never the MCP —
Javier interrupted the first pass: *"Stop opening stuff on my screen."* All subsequent
verification off-screen.

- 3440 / 2560 / 1920 / 1440 / 1280×700 / 1000×800 / 768 / 375: **0 overflow, 0 console
  errors**, hero holds **exactly 3 lines** at every tier (natural 558px vs 660px column
  at 1440), no unrevealed `[data-r]` nodes.
- **All 48 quiz paths** (4×4×3) reach the result panel; back and restart resync both the
  step counter and the progress bar.
- FAQ accordion opens to real height, sets `aria-expanded`, closes siblings.
- Every in-page anchor resolves; every external link has `target` + `rel=noopener`;
  **zero outbound YouTube links**.
- Marquee content passes exceed 3440px at every viewport (belt 4926, episodes 3668–6384).

## Open items for Josh

1. **Real client wins.** Three slots are built and marked. Needs name, brand, role, and
   one verifiable number each.
2. **A booking URL.** There is still no calendar; every CTA resolves to `#contact` and
   the primary button dials `tel:+17867890744`. A Calendly/GHL link drops straight in.
3. **The podcast player.** The feature poster links to `#contact` rather than out to
   YouTube (standing rule). A hosted MP4 or an approved embed would make it a real player.
4. The hero portrait still carries a cyan cast from the source footage. Left as-is —
   it was white-balanced deliberately in the hero-poster build and re-grading it here
   would fight that tuning.
