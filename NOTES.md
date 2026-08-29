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

---

# ROUND 2 (2026-08-29): full redesign. Round 1 was rejected.

## Javier's verdict on round 1

*"Nooo, I mean, I don't like it at all. It doesn't feel premium... you kind of made an
off-brand version of it... especially the hero section is garbage... the quality is
disoriented, it's just all pixelated... you just changed up the design with wording and
all that when you should have redesigned it completely to the reference... needs to be
100% redesigned."*

## The root cause, and it is the whole lesson

**I never looked at the reference.** Round 1 was built from the reference's `innerText`
and its compiled CSS tokens, both pulled headlessly, plus an assumption that the token
names told me the design. They did not. The page was never rendered, never screenshotted,
never seen. What came out was the reference's *content skeleton* wearing the previous
build's skin, which is exactly what "an off-brand version" means.

Rendering it took one script and about ninety seconds. Everything below came from
finally doing that.

## What the reference actually is (and what round 1 assumed)

| | Reference | Round 1 built |
|---|---|---|
| Ground | Cream `#FAF9F7` + black bands | White |
| Nav | **Solid black bar**, white caps, icon set | Translucent white, blurred |
| Display face | **Playfair Display**, ~96px | Poppins 600 |
| Radius | **0 everywhere** | 4/8px |
| Hero | **True 50/50 split, photo bleeding to the viewport edge, full height** | Contained photo card with radius + shadow |
| Emphasis | Gold italic serif on **one word mid-sentence** | Orange on a final line |
| CTA | Black rect, sharp, caps, **gold arrow** | Orange, rounded, no arrow |
| Stats | Inline row, gold outline icons, **serif numerals**, hairline rules | White card with a drop shadow |
| Press strip | **Black band**, gold label, white logos | Light grey marquee |
| Testimonial | Grey bordered box, portrait left, **Playfair italic** quote, ghost button | Dark navy card |

## The rebuild

Josh's navy `#0A1D3A` takes black's job, orange `#FF6A00` takes gold's. That mapping is
why the brand survived a total structural transplant: **the reference's palette and
Josh's are the same palette one hue apart.** Faces cut to two, Playfair + Inter, matching
the reference exactly; Poppins and Space Grotesk both dropped.

## The pixelation, which was a real defect

Round 1's hero ran `josh-process.jpg`, a **936x1170 frame lifted from video**, scaled to
fill a hero. Of course it was soft. `josh-hd.png` (**1510x1952**, a proper high-res
transparent cutout) was sitting in the hero-poster build and I had *deleted it* in round 1
as an unused asset.

The fix is not just swapping the file. A transparent cutout needs an environment or it
reads as a sticker on a panel (the standing rejection in `LESSONS.md`). So: composite him
into a real, defocused, brightened office interior at 1600x2000 with a soft cast shadow.
He now reads as photographed on location. Script pattern is in the commit.

Javier also green-lit Pexels this round (*"if you want, to make it better, use Pexels"*),
which **reverses the stock-imagery ban** standing since the v3 build. Used only for
editorial and category slots, never for anything depicting Josh or implying a client.
First search returned a grey 3D render, a Japanese storefront and an orange boutique;
a contact sheet of 24 candidates across six refined queries is what produced usable
frames. **Search, sheet, look, then pick. Never take the first API result.**

## Bugs only visible by looking

- `.display` hard-set `color:var(--ink)`. On the navy final section the first headline
  line rendered **navy on navy and was invisible**. The italic span was orange so the
  section looked deliberate and half-empty rather than broken.
- Contact tile `.k`/`.v` were inline spans: "CALL JOSH DIRECTLY(786) 789-0744".
- The podcast poster is a YouTube thumbnail with a **SUBSCRIBE button, bell and cursor
  baked in**. Painted out with a matched background patch and a feathered seam.
- `cheque`, `favour`: British spellings in a US franchise site.

## Verification

Hero headline measured at **ten** breakpoints, not eyeballed: natural width of
"Buy a franchise" against its real column. Held exactly 2 lines from 375 to 3440 only
after widening the copy column to a 1560 rail and capping display at 76/88/96px.

3440 / 2560 / 1920 / 1440 / 1280x700 / 1000x800 / 768 / 375: 0 overflow, 0 console
errors, 2 hero lines, all reveals fired, every marquee pass > 3440. All 48 quiz paths,
FAQ accordion, anchors, external-link safety and mobile nav pass. No YouTube links.

**Deploy poll gave a false LIVE twice.** Round 1 polled "that holds up in" (in the old
copy). Round 2 polled "worth owning" (in round 1's own meta description). Only
`hero-josh.jpg` was unique enough. Confirmed with a byte count and a 200 on new assets.

## Still open

1. Real client wins for the three story slots.
2. A booking URL. Every CTA still resolves to `#contact`; the button dials.
3. A hosted episode file or approved embed for a real player.
