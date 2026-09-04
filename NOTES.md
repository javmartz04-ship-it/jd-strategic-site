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

---

# ROUND 3 (2026-08-29): premium craft pass

Javier, after approving the round-2 structure: *"the website's good, but I want to make
sure. If we can make it a little bit more premium... I want the feeling like when they
hop on this website, it feels like a $20,000 website."*

Applied `high-end-visual-design`'s **Editorial Luxury** archetype and deliberately
REJECTED its pill/`rounded-[2rem]`/double-bezel component rules: those belong to the
Ethereal-Glass SaaS register and would have broken the sharp editorial one the client
picked. `system/` outranks the skills; so does the client's chosen reference.

## Photography was the biggest lift, and it was not obvious

Six images from six photographers. Reducing each to a single average colour exposed the
problem instantly: dark olive, pale grey-pink, orange-brown, warm tan, orange-gold,
pinkish. **Six different colour temperatures is the entire "stock photo" tell** - not
resolution, not subject.

The grade, in order, and the order matters:
1. **Gray-world white balance** (the step I missed on the first attempt). Without it,
   exposure matching and split-toning leave every frame's original cast intact and the
   set still reads as six shoots. This is what actually unified them.
2. Gamma exposure match to a common mean luminance (~0.455).
3. Desaturate to 0.70.
4. Gentle S-curve around mid grey.
5. Split tone: shadows toward brand navy `#0A1D3A`, highlights toward warm cream.

All six then averaged to the same neutral. Josh gets a much lighter version (wb 0.30,
sat 0.90) so skin keeps its warmth. **The hero composite was rebuilt from source in one
pass rather than graded again** - grading an already-graded file compounded and turned
his face grey.

Right-sized every image to ~2x its real rendered box afterwards: 6.8MB to 5.0MB.

## Arrival choreography

The headline rises line by line out of its own `overflow:hidden` mask; the photograph
settles out of a 1.07 scale behind a cream panel wiping upward; the orange rule draws
down; everything else follows one `--i` stagger clock on `cubic-bezier(.19,1,.22,1)`.

**Sequenced off `document.fonts.ready`** so the mask reveal never plays against a
fallback face, with an 1800ms failsafe. Verified in three conditions: normal,
`prefers-reduced-motion`, and **webfonts blocked entirely** (route-aborted in the
harness) - the last is the one that would have shipped a permanently invisible hero.

## The regression the variable font caused

Switching Playfair from static to variable with `font-optical-sizing:auto` renders it
**wider** at display sizes. The hero headline had only 10px of headroom at 2560/3440 and
began wrapping to four lines. Fixed by widening the copy rail at >=2200 rather than
shrinking the type. **Any font-loading change re-opens every headline fit measurement.**

## Everything else

Type: variable faces with optical sizing, Inter humanist alternates (`cv05 cv08 cv11
ss03`), `text-wrap: balance` on headings and `pretty` on body, hanging punctuation on
both pull-quote treatments. Whitespace: section padding cap 116 to 144px. Haptics:
physical press, kinetic arrow, slow scale on editorial photography, one real long shadow
on the only element that floats, a hairline of light along every dark section's top edge.

Performance: progress bar moved from `width` to `scaleX`, process-row hover from
`padding-left` to `translateX`. The one layout-animating transition left is the FAQ
accordion's `height`, which has no broadly-supported alternative.

## Harness note

Two suites went red after this pass and **both were stale harnesses, not regressions**:
the hero-line probe measured the new mask wrappers instead of rendered lines, and the
progress-bar assertions still checked `style.width` after it became a transform.

---

# ROUND 4 (2026-08-29): premium by subtraction

Javier: *"I want this to be like, damn, they look at this and this is the biggest guy in
his space... there are little things that I really don't know how to communicate...
that doesn't mean adding more; it can be making it better, stronger."*

**Nothing was added.** Four things were removed, rationed, corrected or rebuilt. This
round is the counter-example to the assumption that a premium pass means more craft on
top; the highest-value moves were all subtraction.

## 1. The placeholder proof section was actively damaging

Three "Client Name / [Brand] Franchise Owner" slots, a grey CN monogram, a dead "Watch
Their Story" button, and a badge that literally read "SAMPLE LAYOUT - REAL CLIENT WINS
DROP IN HERE".

**Absent proof is neutral. Proof that looks unfinished is negative.** It was the loudest
signal on the page that this business is new, sitting directly under a heading claiming
"What our clients build". Deleted the section and pruned its dead CSS. The page reads
more confident at 11 sections than it did at 12. It goes back the moment real wins exist.

I had flagged this three rounds running and kept shipping it because the client had not
supplied testimonials. **Flagging a defect is not the same as fixing it** - when a
placeholder is actively costing credibility, removing it is the fix, not waiting.

## 2. The accent was on 77% of headings, so it had stopped being an accent

Ten of thirteen headings carried the orange italic emphasis. This is the "little thing"
Javier could feel but not name: **an emphasis that appears on nearly everything is not an
emphasis, it is the heading style**, and it was why the page read decorated rather than
expensive.

Cut to exactly three, placed at structural beats rather than decoratively:
- the **promise** (hero: "worth owning.")
- the **positioning turn** (broker vs coach: "A coach helps you buy one.")
- the **ask** (final CTA: "Ready to bet on yourself?")

Everything between is plain navy. The three that remain now actually land. `FUNNEL-
ANATOMY.md` says every HERO headline gets an emphasis line; applying that rule to every
SECTION heading is a misreading that dilutes the move to nothing.

## 3. Mixed voice reads as unpolished without the reader knowing why

Eighteen first-person blocks, seven third-person slips: "The brand **his** family helped
grow", "**Josh walks** the FDD", "**He was** raised inside it". Converted all to first
person. A solo advisor writing "I" throughout is warmer and more authoritative than one
who drifts into press-release third person.

## 4. The comparison table was not actually comparing

Built as two independent stacked columns, so the dividers never lined up across the two
sides - a reader could not scan a broker claim against its JD Strategic answer. Rebuilt
as ONE grid with interleaved cells so every pair shares a row height (verified to the
pixel), with `order` regrouping them into two stacked blocks under 900px.

## Also

Hero's third stat was "3-5 BRANDS SHORTLISTED" - a process detail dressed as a
credential, and not parallel with the other two. Now "2nd GENERATION / raised in
franchising, not trained into it", so the trio reads scale, price, pedigree.

## Still open

Real client wins, and a booking URL. Every CTA still resolves to `#contact`.
Flagged but NOT changed, because it is a content call: the "Why franchising at all"
section (be your own boss / proven playbook / minimized risk / financing) is the one
block on the page that could appear on any franchise broker's site. It answers a real
buyer question but differentiates Josh not at all.

---

# ROUND 5 (2026-08-29): the structural leap. "Make it 20x better."

Javier, after four rounds of polish: *"improve the site dramatically... not just little
tweaks, but immensely... make things twenty times better."* Model switched to Fable 5.1
for this round.

## The diagnosis that changed the approach

Four rounds of increasingly careful polish had hit diminishing returns because the
page's PROBLEM was never polish. Zoomed out it was eleven sections of the same height,
the same width and the same density. Polishing a metronome makes a shinier metronome.

So this round was a rebuild around a concept, not a pass: **the page reads like a
private briefing from someone who has been inside the industry.**

## What the concept gave the page

- **Seven numbered chapters instead of eleven similar sections.** Point-of-view and
  broker-vs-coach merged into "01 The position". Why-franchising and categories merged
  into "04 Where the money is". FAQ and contact merged into "07 The call". Each chapter
  opens with a ghost numeral at up to 168px, a running header with an orange rule, and
  the title. That single component is what makes the page feel authored.
- **A side index rail** (desktop, appears once past the hero) that tracks the active
  chapter in `mix-blend-mode:difference` so it reads on both cream and navy.
- **Real dynamic range in section height**: 886 / 2488 / 1190 / 1422 / 1835 / 1812 /
  1258 / 1125 instead of everything at ~1100.
- **Josh's two photographs used at chapter scale.** The studio headshot, which had been a
  small square in a column, is now a half-bleed chapter opener at 1400px, dissolved into
  navy on three edges so it sits at that size without a hard rectangle or a visible
  upscale. Built as a composite asset, not CSS.
- **A horizontal scroll-snap strip** for the categories (native scroll, arrow nudges,
  never scroll-jacking) replacing the static 4-up grid. 2.5 tiles visible invites the
  scroll.
- **The podcast guests as a proof marquee.** Hall of Famer, first Great American Cookies
  franchisee and former IFA chairman, Sandler's executive chairman: all real, all from
  the episode art already on the page. This is the authority signal the site never used.
- Wordmark instead of "JD" in a box: Playfair "JD Strategic", orange rule, small caps
  FRANCHISING.
- Hero headline pushed to 118px, sitting right at the seam with the photograph.

## Defects caught by looking, first render

- The insider chapter's opener was inside a half-width column, so the 168px numeral left
  the title ~300px and it wrapped one word per line and CLIPPED ("franchisin"). Stacked
  the opener and sized it for the column.
- The portrait crop showed half a face: `object-position:right bottom` on a centred
  subject. `50% 100%`.
- The rail crowded the hero's eyebrow; now appears at 55% of hero height.

Harness was rebuilt as one script (`h.mjs verify|interact|rhythm|close`) after the
scratchpad was wiped a second time.

## Still open

Real client wins and a booking URL. And the honest note from round 4 stands: photography
is now used at the scale a premium site needs, but there are still only two photographs of
Josh in existence. A half-day shoot remains the single highest-leverage thing available.

---

# ROUND 6 (2026-09-04): the material pass. "Make it feel like the web."

Javier: *"it's in the right direction but I don't think it's in the right direction
regarding the design, it can be way better… make this the best website in the world…
the feeling should feel very premium and like this is the web."*

## The diagnosis

Round 5 fixed the *structure* (seven chapters, real dynamic range) and Javier confirmed
the direction. So this round was not another structural rebuild. Screenshotting the live
page in viewport slices and reading them showed one consistent problem underneath every
section: **the page was printed, not lit.**

Every surface was a flat fill — flat cream, flat `#0A1D3A` navy — with a solid navy
chrome slab bolted across the top of every screen. That is a very good newspaper. It is
not the web. Nothing on the page did anything a sheet of paper could not do.

So: keep the spine, change the material.

## The six moves

**1. The chrome became a floating island.** A 40px utility bar plus a 74px solid navy
nav owned the top 114px of every screen and sliced through five of the seven chapter
headlines. Both are gone. The nav is now transparent over the hero and condenses into a
detached capsule — `backdrop-filter: blur(24px) saturate(1.75)`, hairline, inset top
highlight, long soft shadow, 3px radius to stay in the editorial register rather than
the SaaS pill. It **inverts over dark chapters**, driven by `elementsFromPoint` at the
island's own centre, never `mix-blend-mode`. Verified on all seven chapters: light on
the four paper ones, dark on money / insider / call.

**2. Every ground is lit.** `--lit-paper`, `--lit-cream`, `--lit-band` and `--lit-navy`
replace flat fills. Navy is now a room: `#183D73` top-left falling to `#050D1C` at the
base, a light hairline along the top edge, and a `rgba(4,11,24,.72)` shadow across the
top 26% so **consecutive dark chapters meet dark-on-dark instead of showing a seam**.
That seam was visible between 04 and 05 on the first render.

**3. The hero is a lit room, not a split.** The old hero ran a transparent cutout
composited onto a blurred stock office. Rebuilt:
- **The matte was decontaminated.** The cutout had been lifted off a bright ground, so
  every partial-alpha pixel carried a slice of white — a visible halo around the head
  and shoulders. Un-premultiplied it back out, eroded the matte 1px, steepened the
  falloff, then a light grade (WB at 0.34 strength; people take a third of what rooms
  take) and an unsharp pass on the subject only. The bottom 210px of alpha is feathered
  so he melts into the floor instead of ending on a crop line.
- **The room is CSS, not baked into the JPG.** One warm bloom upper-right, a brand-orange
  wash at 5.5%, a floor shade opposite. It **drifts ~34px with the pointer** — depth, not
  parallax, and off under `prefers-reduced-motion` or a coarse pointer.
- **The figure and the layout interleave.** The hero's full-bleed hairline passes behind
  him; he overhangs the stat band by up to 88px. No panel, no plinth.
- Headline to `clamp(44px,7vw,132px)`. Hero holds exactly 2 lines at all nine viewports.

**4. Photography triage, which is where most of the "cheap" was hiding.**
- **Fourteen 320×180 YouTube thumbnails, deleted.** Baked-in yellow display type,
  SUBSCRIBE buttons, a red play badge, cyan and orange and black art from four different
  designers. No grade rescues a 320px source. The 1280×720 "latest episode" poster went
  with them for the same reason.
- **In their place, the episode register.** Enlarging the thumbnails to read them
  surfaced the real proof the site had been burying: Eric Martin (SVP of Franchise
  Development, Happinest Brands), Doc Cohen (first franchisee of Great American Cookies,
  former IFA chairman), Sandler's executive chairman, Andy Fuller (founder/CEO, Mosquito
  Hunters), Jolita Brilliant. Eight episodes set as a two-column index with numbers,
  titles and guest credentials. Every word is read off the client's own episode art —
  nothing invented.
- **The insider portrait stopped being a face.** `object-fit:cover` in a 720×1508 cell
  had blown a 1400×1500 head-and-shoulders crop up to forehead-and-teeth filling half the
  viewport. Now it renders at its own scale (600px) with a radial mask dissolving it into
  the navy — the composite's studio backdrop was reading as a rectangle sitting on the
  page — plus a blue key light behind it and a hairline name plate under it.
- **The set was re-measured and unified.** `josh-process.jpg` was carrying a 0.111 colour
  cast (cyan, from the source footage) and sitting at 0.601 luminance against a set at
  0.46. Corrected to 0.512 / 0.055. Category stills lifted out of the murk to one family
  (0.46–0.50). Its crop was also cutting the subject's head off — `object-position:50% 78%`
  now frames the hands and the document.

**5. The index rail was rebuilt.** `mix-blend-mode:difference` rendered as scrambled
illegible glyphs over photographs and as grey debris on light sections. Now hairline
ticks on the right, themed by the same ground detection as the nav, chapter names on
hover only, and it appears at 92% of hero height instead of 55% so it never crowds the
first chapter.

**6. Composition variance.** The 01 point-of-view trio was three equal cards — the banned
family, and it also flattened an argument literally about narrowing; it now narrows
(1.3fr / 1.02fr / 0.86fr with a descending type ramp, the third cell a lit navy card with
its own shadow). The 04 benefits block was a cramped four-up; now 2×2 with real air and a
bigger heading. Four repeated "WATCHING CLOSELY" eyebrows on the category tiles deleted —
that was four accent leaks doing nothing.

## Contrast, which was also a premium problem

The a11y pass found **62 elements under AA**. Almost all of them traced to one token:
`--muted: #8494A6` at 2.95:1 on cream, carrying every eyebrow, caption, label and
risk-reducer on the page. Washed-out micro-copy is not only an accessibility failure, it
is exactly what makes a page read thin. The ramp moved to `--body:#4E5F73` /
`--muted:#63727F` / `--faint:#A9B4C1`.

Two more that needed a design answer rather than a darker grey:
- **White on `#FF6A00` is 2.87:1 and cannot be fixed without leaving the brand orange.**
  The accent CTA now runs **ink on orange at 5.85:1** — sharper, more editorial, and the
  true brand colour survives.
- **Large orange display text on cream is 2.73:1 against a 3.0 floor.** Added
  `--accent-text:#E85B00` for exactly that role. Indistinguishable at a glance, passes.
- Small orange labels on paper can never reach 4.5:1 without going brown, so `.pod-k` and
  the guest-marquee label switched to the house run-header device: muted caps with an
  orange tick. Better design and a fixed contrast in one move.

Remaining flags are probe false positives (text over the bleed scrim, `rgba` tiles on
navy). Down from 62 to 2 real ones, both resolved. Headings no longer skip a level
(`.tl-r` h4 → h3).

## Verification

Nine viewports, 3440 → 375: **0 horizontal scroll, 0 console errors, 0 unrevealed
`[data-r]` nodes, hero holds exactly 2 lines at every tier.**

A 14px horizontal scroll at 1440 and 8px at 375 took a bisect to find: `.insider-fig::before`
was `width:min(104%,760px)` centred in a 720px column, so it hung 14px past each edge.
Neither an element-rect probe nor a clipped-ancestor probe found it, because the offender
was a decorative pseudo-element. **A `display:none` bisect down the tree is the tool that
actually finds these.**

- All **48 quiz paths** reach the result; restart resyncs.
- FAQ opens, sets `aria-expanded`, closes siblings.
- 46 links: 0 broken anchors, 0 YouTube links, every external link `target` + `noopener`.
- CTA label "Book a Call" ×6 verbatim, plus the hero's "Find My Franchise Fit" (a
  different action).
- Three arrival conditions all resolve to a visible hero: normal, `prefers-reduced-motion`,
  and **webfonts aborted at the route level**.
- Accent emphasis line count: **3** (hero, positioning turn, final CTA). Em-dashes: 0.

Section rhythm: 937 / 2490 / 1190 / 1422 / 2088 / 1508 / 1606 / 1128.

## Still open

1. **Real client wins.** Still none supplied; the section stays deleted, per round 4.
2. **A booking URL.** Every CTA still resolves to `#contact`; the primary button dials.
3. **Podcast artwork.** The show chapter is now typographic because the existing art
   cannot carry a premium page. Real episode stills or commissioned art drop straight back
   in — the register is built to take a photograph beside it.
4. **Photography of Josh.** Still two frames in existence, one of them a video still. A
   half-day shoot remains the single highest-leverage thing available, and it is now the
   only thing on the page that a better asset would obviously improve.

---

# ROUND 7 (2026-08-29): the two things Javier did not like

Javier on the Round 6 build: *"looks amazing! the only thing I don't like are these
things"* with two screenshots: the side chapter index (01-07 with dashes) and the giant
ghost chapter numeral above each chapter title.

Removed both. Chapter openers keep the running header and the title, which is enough to
carry the chaptered-brief concept; the footer index lost its "01 / 02" prefixes too so
nothing refers to a numbering that no longer exists on the page. The step numerals inside
the process rows, point-of-view columns and why-cards stayed: they number real steps and
were not what the screenshots pointed at.

**Found while doing it:** a Round 6 had landed on top of my Round 5 (floating island nav,
lit gradient grounds, a rebuilt hero). My first removal pass ran against the file I
remembered rather than the file that existed, stripped the markup, and left Round 6's
rail CSS and scroll bookkeeping behind. Read `git log` before editing a build that
another session may have touched.

Also caught by the width sweep, not by eye: Round 6's hero capped the headline box at
124% of a ~730px column and let the type climb to 132px, so "Buy a franchise" wrapped to
two lines from 1800px to 2199px. Capped at 119px there, full 132px again from 2200px
where the rail widens. Holds one line per row at all eleven measured widths, 375 to 3440.
