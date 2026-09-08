# JD Strategic Questionnaire — GoHighLevel field map

Every key the questionnaire can POST to the inbound webhook.

**Endpoint:** `https://services.leadconnectorhq.com/hooks/kv44OG3YsodryGm2KCvt/webhook-trigger/f23bd6a8-c76f-4dbe-849c-e67e88d2c9a8`

**Verified live 2026-09-08** — real submission returned `HTTP 200` on the first
(CORS) attempt, 8,415 bytes, 86 populated keys. Look for the contact named
**TEST Questionnaire** / `test.questionnaire@example.com` and delete it once mapped.

---

## Always sent — map these to standard contact fields

| key | maps to | example |
|---|---|---|
| `first_name` | First Name | TEST |
| `last_name` | Last Name | Questionnaire |
| `full_name` | Full name (also sent as `name`) | TEST Questionnaire |
| `email` | Email | test.questionnaire@example.com |
| `phone` | Phone | (305) 555-0142 |
| `source` | custom / tag — always this exact string | JD Strategic Confidential Questionnaire |
| `submitted_at` | custom — ISO timestamp | 2026-09-08T15:34:39.152Z |
| `summary` | **a long-text custom field.** The whole questionnaire as readable text (~5.4 KB). Map this one first — it is useful before any other field is mapped. | PERSONAL INFORMATION\n  Full name: … |

---

## Answer fields, by section

`cond` = only sent when its condition is met. `req` = the visitor cannot skip it.


### 1. Personal Information

| key | question | type | options / notes |
|---|---|---|---|
| `name` | Full name * | text | free text **required** |
| `email` | Email * | text | free text **required** |
| `phone` | Phone * | text | free text **required** |
| `address` | Address | text | free text  |
| `city_state_zip` | City / State / Zip | text | free text  |
| `age` | Your age | text | free text  |
| `own_home` | Do you own your home? | single | Yes · No  |
| `veteran` | Are you a veteran? | single | Yes · No  |
| `partnered` | Are you married or partnered? | single | Yes · No  |
| `spouse_name` | Their name | text | free text  |
| `spouse_age` | Their age | text | free text  |
| `spouse_email` | Their email | text | free text  |

### 2. Employment

| key | question | type | options / notes |
|---|---|---|---|
| `position` | Your current position | text | free text  |
| `employer` | Employer | text | free text  |
| `income` | Your annual income | text | free text  |
| `duties` | What your duties actually look like day to day | long | free text  |
| `spouse_position` | Their current position | text | free text  |
| `spouse_employer` | Their employer | text | free text  |
| `spouse_income` | Their annual income | text | free text  |
| `spouse_duties` | Their duties | long | free text  |
| `liked_most` | Liked most | long | free text  |
| `liked_least` | Liked least | long | free text  |

### 3. Your Goals

| key | question | type | options / notes |
|---|---|---|---|
| `describe` | Which best describes you right now? | single | free text  |
| `why_franchise` | Why now | long | free text  |
| `hoping` | What you're hoping ownership gives you that your current situation doesn't | long | free text  |
| `brands_interest` | Which brand or brands — and what drew you to them | long | free text  |
| `industries_interest` | Which industry or industries — and what's the draw | long | free text  |
| `brands_requested` | Brands you've already requested info on or inquired with | long | free text  |
| `already_speaking` | Any brands or other consultants you're already speaking with | long | free text  |
| `fdds` | Have you reviewed any FDDs yet? | single | Yes, several · One or two · No, not yet  |
| `fdds_which` | Which ones? | text | free text  |
| `timeline` | Ideal timeline to open | single | free text  |
| `job_plan` | Do you plan to keep your current job while building the business, or transition out? | single | free text  |

### 4. Business Ownership

| key | question | type | options / notes |
|---|---|---|---|
| `owned` | Have you ever owned a business? | single | Yes · No  |
| `owned_explain` | Tell me about it | long | free text  |
| `attracts` | What attracts you to business ownership | long | free text  |
| `concerns` | Your major concerns with it | long | free text  |

### 5. A Little About Your Style

| key | question | type | options / notes |
|---|---|---|---|
| `style_a_1` | I make decisions quickly and move on, even without all the information. | scale 1-5 | 1–5  |
| `style_a_2` | I'm at my best meeting new people and building relationships. | scale 1-5 | 1–5  |
| `style_a_3` | I prefer a steady, predictable routine over constant change. | scale 1-5 | 1–5  |
| `style_a_4` | I study the details and data before I commit. | scale 1-5 | 1–5  |
| `style_a_5` | I'd rather be in charge than be told what to do. | scale 1-5 | 1–5  |
| `style_a_6` | I'm persuasive — I can bring people around to my thinking. | scale 1-5 | 1–5  |
| `style_a_7` | I'm patient and loyal; I stick with things for the long haul. | scale 1-5 | 1–5  |
| `style_a_8` | I hold myself and others to high standards for accuracy. | scale 1-5 | 1–5  |
| `style_b_1` | Financial security and stability matter more to me than a big upside. | scale 1-5 | 1–5  |
| `style_b_2` | I want the freedom to control my own time and be my own boss. | scale 1-5 | 1–5  |
| `style_b_3` | I'm driven by achievement — hitting goals and growing. | scale 1-5 | 1–5  |
| `style_b_4` | I want work that feels meaningful and helps people. | scale 1-5 | 1–5  |
| `style_b_5` | Building something I can pass on to my family is a big motivator. | scale 1-5 | 1–5  |
| `style_c_1` | I like a fast pace with lots happening at once. | scale 1-5 | 1–5  |
| `style_c_2` | I do my best work with clear structure and a proven process. | scale 1-5 | 1–5  |
| `style_c_3` | I'm organized — I plan ahead and keep things on track. | scale 1-5 | 1–5  |
| `style_c_4` | I'm comfortable wearing many hats and switching between tasks. | scale 1-5 | 1–5  |
| `style_c_5` | I'm comfortable with the financial side — budgets, numbers, cash flow. | scale 1-5 | 1–5  |
| `style_d_1` | I'm comfortable taking a big risk on something unproven for a bigger reward. | scale 1-5 | 1–5  |
| `style_d_2` | I'd rather help shape and build a young brand than follow an established one. | scale 1-5 | 1–5  |
| `style_d_3` | I want the safety of a proven system with lots of other owners to learn from. | scale 1-5 | 1–5  |
| `style_d_4` | Being one of the first in a market excites me more than it scares me. | scale 1-5 | 1–5  |
| `style_e_1` | I do my best when I'm collaborating and sharing with others. | scale 1-5 | 1–5  |
| `style_e_2` | I'm competitive — I want to outperform and win. | scale 1-5 | 1–5  |
| `style_e_3` | I'd value a close network of other owners I can lean on. | scale 1-5 | 1–5  |
| `style_e_4` | I'd rather run my own show than compare notes with everyone. | scale 1-5 | 1–5  |

### 6. Your Strengths

| key | question | type | options / notes |
|---|---|---|---|
| `roles` | Which roles appeal to your strengths? | multi | free text  |
| `strongest` | In your own words — what do people rely on you for? | long | free text  |
| `managed_team` | Have you managed a team before? How many, and did you enjoy it? | long | free text  |
| `never_again` | Something you're good at but would be happy to never do again | long | free text  |

### 7. Business Model Preferences

| key | question | type | options / notes |
|---|---|---|---|
| `bm_setting` | Setting | multi | **multi — comma-joined.** Home-based · Office-based · Retail / brick-and-mortar · Open to everything  |
| `bm_owner` | Ownership model | multi | **multi — comma-joined.** Owner-operator (hands-on, running it day to day) · Executive model (managing the team and resources to grow) · Not sure yet  |
| `bm_customer` | Ideal customer | multi | **multi — comma-joined.** B2B · B2C · Children · Seniors · Blue-collar … (7 total)  |
| `bm_revenue` | Revenue style | multi | **multi — comma-joined.** High-ticket (fewer, larger jobs) · Recurring revenue (repeat / subscription) · Either  |
| `bm_other` | Anything here matter to you? | multi | **multi — comma-joined.** I'd like it to be recession-resistant · I want the ability to scale to multiple units / territories · I need it to be E2 visa-friendly  |
| `bm_employees` | Preferred number of employees to start | multi | **multi — comma-joined.** None / just me · Less than 5 · 5-15 · 15+ · Open to options  |

### 8. Industries Of Interest

| key | question | type | options / notes |
|---|---|---|---|
| `ind_health` | Healthcare & beauty care | multi | **multi — comma-joined.** Senior care — home health (medical) · Senior care — home health (non-medical) · Senior care placement · Anti-aging · Barber services … (10 total)  |
| `ind_auto` | Automotive | multi | **multi — comma-joined.** Auto repair · Tinting · Detailing  |
| `ind_biz` | Business services | multi | **multi — comma-joined.** Business coaching · Cost reduction · Bookkeeping · Commercial cleaning · Recruiting … (9 total)  |
| `ind_child` | Child services | multi | **multi — comma-joined.** Fitness · Education · Cooking · Music · Language  |
| `ind_clean` | Cleaning services | multi | **multi — comma-joined.** Residential · Commercial · Junk removal · Dry cleaning / laundry · Window cleaning … (6 total)  |
| `ind_food` | Food | multi | **multi — comma-joined.** Acai / frozen yogurt · Breakfast · QSR · Food truck  |
| `ind_home` | Home improvement & maintenance. | multi | **multi — comma-joined.** Artificial turf · Bath / kitchen remodeling · Closet organization · Electrical · Fencing … (18 total)  |
| `ind_pet` | Pet services | multi | **multi — comma-joined.** Boarding · Daycare · Dog walking · Grooming · Cremation services … (8 total)  |
| `ind_re` | Real estate | multi | **multi — comma-joined.** Estate sales · Home inspection · Home staging · Property management · Real estate sales … (6 total)  |
| `ind_repair` | Repair & restoration | multi | **multi — comma-joined.** Restoration · Handyman  |
| `ind_sport` | Sports & fitness | multi | **multi — comma-joined.** Stretching · Pilates · Gym · Personal trainer · Youth sports / enrichment  |
| `ind_tech` | Technology | multi | **multi — comma-joined.** Computer / electronic services  |
| `industry_experience` | Any experience working in or around the industries you checked? | long | free text  |

### 9. Financials

| key | question | type | options / notes |
|---|---|---|---|
| `liquid_capital` | Liquid capital available to invest | text | free text  |
| `brokerage` | Brokerage / investment accounts | text | free text  |
| `retirement` | Retirement funds / 401(k) / IRA | text | free text  |
| `investment_range` | Investment range you're considering | text | free text  |
| `net_worth` | Approximate net worth | text | free text  |
| `funding` | How do you plan to fund it? | multi | **multi — comma-joined.** Cash / savings · SBA loan · Home equity · 401(k) / ROBS · Partner or investor … (6 total)  |

### 10. Decision Making

| key | question | type | options / notes |
|---|---|---|---|
| `decision_makers` | Is anyone else part of this decision? Will anyone help run the business? | long | free text  |

---

## Notes

- Multi-selects arrive as one comma-joined string, not an array.
- Money fields arrive formatted (`$250,000`). Strip `$` and `,` if GHL needs a number.
- Ratings arrive as strings `"1"`–`"5"`.
- Blank answers are **omitted** from the payload, not sent empty — so key count varies per submission (86 in the live test, 97 if every optional field is filled).
- The webhook URL is visible in page source, as it must be for a browser POST.
  Filter the workflow on `source` (always the exact string above) or on a present `email`.
