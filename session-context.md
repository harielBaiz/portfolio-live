# Hariel Baiz · Portfolio — Session Context

> Keep this file in the root of the repo.
> Start each Claude session with:
> "Read context from `https://raw.githubusercontent.com/harielBaiz/portfolio/main/session-context.md` and today I want to work on [X]."

---

## Who I am

- **Name:** Hariel Baiz (goes by Ariel; "Hariel" is the consistent brand name used across email, LinkedIn, and this portfolio as of 2026-07-14 — see decision note below)
- **Role targeting:** Product Designer / Design Systems Designer
- **Experience:** 5–8 years
- **Domain:** B2B SaaS · Last company: Bitsight (cybersecurity) — [add current/target domain if different]
- **Native language:** Spanish (English is secondary)
- **Tools:** Figma, Design Tokens, Prototyping, WCAG/A11y

---

## Writing Style Rules (apply to all case studies)

- **Avoid overusing the em dash (—) in prose.** Prefer periods, commas, or colons to break up sentences instead. Reserve the em dash for a small number of structural uses only:
  - Section numbering convention: `01 — Context`, `02 — Problem`, etc. (nav + section labels)
  - The page `<title>` separator
  - Direct testimonial/customer quotes, where a dash can reflect natural speech
- When reviewing or writing new sections, default to: period for a full sentence break, comma for a soft pause, colon to introduce a list or explanation, parentheses for a true aside. Applied to `case-study-infosec-questionnaire.html` on 2026-07-14 (cut from 76 em dashes down to 14 structural ones).

---

## Lessons Learned / Reflection Section — Unified Structure (2026-07-14)

All case studies' closing section now match `case-study-design-tokens.html`'s pattern: `<h3>` subheading + plain `<p>` paragraphs, no bullet list, no bold sub-titles, no card grid. Each paragraph opens with the old bolded title folded into its first sentence (e.g. "Understand the system before you touch the UI. The original platform had no formal documentation...").

Before this, three different structures existed: `case-study-infosec-questionnaire.html` used `<ul class="lesson-list">` with bold titles; `case-study-new-site-architecture.html`, `case-study-personas-ia.html`, and `case-study-new-site-architecture2.html` used a `.reflection-grid` of `.cs-card` items. Those CSS classes (`.lesson-list`, `.lesson-body`, `.reflection-grid`, `.cs-card`) are still defined in `case-study.css` but are no longer used by any of the 5 case study files — safe to remove later if nothing else references them.

If writing a new case study, use `case-study-design-tokens.html`'s Lessons Learned section as the template.

## Naming Decision (2026-07-14)

Portfolio brand name changed from "Héctor Ariel Baiz" to **"Hariel Baiz"** everywhere (nav, hero byline, page titles, footer copyright, resume filenames). Reasoning: email (`hariel.baiz@gmail.com`) and LinkedIn (`linkedin.com/in/hariel-baiz`) already used "Hariel" — using a different name on the portfolio created a 3-way mismatch that made cross-referencing harder for recruiters. Ariel still goes by "Ariel" personally; "Hariel" is the consistent professional/brand handle across all channels. Don't revert to "Héctor Ariel Baiz" without asking first.

---

## Repository

- **Dev repo (this one):** https://github.com/harielBaiz/portfolio — where Claude sessions work, iterate, and commit freely
- **Live repo (2026-07-29):** https://github.com/harielBaiz/portfolio-live — clean-history mirror Ariel pushes to manually when a version is ready to publish. Not auto-synced; no commits pushed there yet as of this note.
- **Live site:** https://harielbaiz.com/ _(custom domain, GitHub Pages served from main branch via CNAME — will point at `portfolio-live` once it has content)_
- **Publish workflow:** copy working files (excluding `.git`) from `portfolio` into a fresh folder, `git init` + single commit, push to `portfolio-live` main. Keeps the live repo's history to one clean commit per publish rather than carrying the dev repo's full commit trail.

---

## File Structure

```
portfolio/
├── index.html                              ← Landing page (CS3 card now links to case-study-new-site-architecture.html)
├── about.html                              ← About Me page
├── session-context.md                      ← This file
├── case-study-design-tokens.html           ← Case Study 1 · Design Tokens
├── case-study-infosec-questionnaire.html   ← Case Study 2 · InfoSec Questionnaire
├── case-study-personas-ia.html             ← Earlier draft of CS3 — kept for reference/control, not linked from index.html
├── case-study-new-site-architecture.html   ← Case Study 3 · Personas & IA (active/linked version)
├── case-study-new-site-architecture2.html  ← Draft variant of CS3 with floating-line TOC style — unlinked, kept for reference
├── css/
│   ├── tokens.css      ← DS tokens: colors, type scale, spacing (EDIT HERE for global changes)
│   ├── base.css        ← Reset, nav, footer, buttons, chips, animations
│   ├── landing.css     ← Landing page specific styles
│   ├── case-study.css  ← All case study shared styles + hero cover pattern
│   └── about.css       ← About page specific styles
├── js/
│   └── site.js         ← Theme toggle, language switcher, scroll reveal, progress bar
├── hackathon.gif                           ← Instant Insights hackathon demo — not yet placed in any HTML file
├── images/
│   ├── cs-tokens-cover.jpg, token-naming-structure.jpg, token-reference-chain.png, elevation.png  (CS1)
│   ├── questionnaire-3pt-design.png, OO-domain-level.png, OO-specification-level-object-model.png,
│   │   question-iterations.png, questionnaire-light-dark.png, categories-panel.png, questions.png,
│   │   questionnaire.mp4                                                                          (CS2)
│   ├── affinityDiagram-journeyMap.png, user_personas.png, products-core-objects.png,
│   │   UIArtifacts-beforeAfter.png, Requirements.png, navigationAndVendorProfile-beforeAfter.png,
│   │   before-after.png, requirements.mp4, securityProfile.mp4                                    (CS3)
│   └── (accessibility/tokens reference set: color-blind-mode.png, elevation-table.jpg, spacing-tokens.mp4, etc.)
└── downloads/
    ├── Hariel-Baiz-Resume-EN.pdf
    └── Hariel-Baiz-Resume-ES.pdf
```

**Note:** the old `Hector-Ariel-Baiz-Resume-*.pdf` files still exist in `downloads/` as duplicates (kept since files can't be silently deleted from this folder). Safe to delete once you've confirmed the new links work — just ask Claude, or remove them yourself.

---

## Current Status

| File | Status | Notes |
|------|--------|-------|
| `index.html` | ✅ Done | Nav, hero, 3 project cards, skills, about, contact |
| `about.html` | ✅ Done | Bio rewritten 2026-07-29: narrative style (electronics tech in high school → Graphic Design at UBA, specialized in branding + editorial layouts → product design), explicit PVP line, collaborative closing line on the "what I bring" paragraph (replaced an "invisible design" line Ariel didn't resonate with). Design-lineage sentence and "looking for my next role" line were both removed per Ariel's request. Quote: William Morris, styled as an exact copy of the case studies' `.testimonial-card.testimonial-card--inline` pattern (quote icon, word-by-word reveal via `site.js`, meta line) — CSS duplicated into `about.css` since about.html doesn't load `case-study.css`. Layout reworked into a single centered column (`.about-wrap` now `max-width: 720px`, matches case studies' `.page-wrap`) — old two-column bio grid and `.about-hero` header removed entirely. Skills & Tools converted from card grid to plain text rows (`.plain-list`). "Off the clock" personal-facts section was added then removed same session — Ariel wasn't sure yet which facts vs. hobbies (motorcycle trip, Patagonia, bass, vs. woodworking/vitreaux/dog walking) he wants public; revisit once he's decided. Skills & Tools split into two labeled sub-lists (`.about-skills__subhead` + `.plain-list`, single-value rows, no more `.plain-list__cat` descriptions): Skills = Design Systems, Interaction Design, WCAG/A11y, User Research, Graphic Design. Tools = Figma, Claude, Adobe Creative Suite, Jira, Notion, HTML/CSS, Git, Pendo. Facts/numbers section removed (2026-07-14). Graphic design paragraph with hover/focus GIF-preview terms (`.gd-term`) — needs real GIF assets, see Pending. Blue page background + curtain-lift intro animation was tried, then rolled back same day per Ariel's request — page is back to the original light/neutral theme; `.gd-term` restyled to use `--brand`/`--text-3` instead of the blue-specific colors |
| `case-study-design-tokens.html` | ✅ Structure done | Needs real images in placeholders |
| `case-study-infosec-questionnaire.html` | ✅ Structure done | New sections added (see CS2 notes below). AI Bonus banner moved OUT to CS3 this session. Needs real images in placeholders |
| `case-study-personas-ia.html` | ⏸ Kept for reference | Earlier draft of CS3. No longer linked from `index.html` — kept intentionally per Ariel's request, not deleted |
| `case-study-new-site-architecture.html` | ✅ Structure done | Active CS3 file, linked from `index.html`. Personas/IA story + AI Bonus (Instant Insights) banner in Outcomes + all three before-after scenarios (Security Profile, Requirements, Navigation & Vendor Profile) now written into the Architecture (06) section using `before-after-analysis.md`. **Password-protected — confirmed working live on GitHub Pages** (see note below). Needs real hero cover image + final proofread of new prose |
| `case-study-new-site-architecture2.html` | 🔲 Draft variant | Same content as above, alternate floating-line TOC style. Unlinked, kept for reference |
| `css/tokens.css` | ✅ Done | Light + dark mode tokens |
| `css/base.css` | ✅ Done | Shared components. **2026-07-29:** EN/ES `.lang-toggle` button removed from nav across all 6 pages (index, about, all 4 case studies) — Ariel wants to hold off until Spanish translations are ready. Replaced with `.nav-toggle` hamburger button (hidden on desktop, `display:flex` below 640px) that opens `.nav-links` as an absolute-positioned dropdown panel under the sticky nav. `i18n`/`setLang()` scaffold in `site.js` is untouched and still resolves `data-i18n` content on load — only the visible toggle UI is gone, easy to re-add later. |
| `css/landing.css` | ✅ Done | Landing-specific styles |
| `css/case-study.css` | ✅ Done | Case study styles + hero cover |
| `css/about.css` | ✅ Done | About page styles. Skills & Tools (`.about-skills__columns`) is a 2-column grid on desktop, stacks to 1 column below 600px. |
| `js/site.js` | ✅ Done | Theme toggle · lang scaffold (data-i18n resolution only, toggle UI removed) · scroll reveal · progress bar · **new:** `initMobileNav()` wires the hamburger — toggles `.nav-links.is-open`, closes on link click, outside click, or Escape |
| `downloads/resumeCV-EN.pdf` | ✅ In repo | Linked from `about.html` nav |
| `downloads/resumeCV-ES.pdf` | ✅ In repo | Available |

### Pending

- [x] Real email address set in `js/site.js` (`hariel.baiz@gmail.com`)
- [x] LinkedIn URL set (`linkedin.com/in/hariel-baiz`)
- [ ] Add the 3 graphic design preview GIFs for `about.html`'s hover terms: `images/graphic-branding.gif`, `images/graphic-editorial.gif`, `images/graphic-illustration.gif`. Until these exist, hovering/focusing "Branding" / "Editorial" / "Illustration" shows a plain blue color chip with the word as a label (graceful fallback, not broken) — see `.gd-term` in `css/about.css`
- [ ] Add `images/feedback-patterns-checklist.png` — new image referenced in `case-study-new-site-architecture.html`, Outcomes section, for the "Feedback patterns, standardized" subsection (uses the existing unused `.patterns-grid` / `.pattern-card` CSS, already scoped "(cs3)" in `case-study.css`)
- [ ] Replace placeholder images (`<figure class="hero-cover hero-cover--placeholder">`) with real screenshots in all 3 case studies
- [ ] Fill in Spanish translations in `js/site.js` → `es: {}` object
- [x] Three before/after scenarios (Security Profile, Requirements, Navigation & Vendor Profile) written into the Architecture (06) section of `case-study-new-site-architecture.html`, using `before-after-analysis.md` — `requirements.mp4` / `securityProfile.mp4` still available if video is preferred over stills later
- [ ] Place `hackathon.gif` into the AI Bonus banner in `case-study-new-site-architecture.html` (Outcomes section)
- [ ] Decide fate of `case-study-personas-ia.html` and `case-study-new-site-architecture2.html` — both kept intentionally for now, not linked from `index.html`

---

## Design System

### References
- **Figma DS:** https://www.figma.com/design/NrZReZOBki85NDzJlQKQrg/portfolio-DS
- **Wireframe page node:** `242:40156` (wireframe page — custom questionnaire lo-fi frames live here)
- **Visual reference:** https://www.doc.cc/articles/craft-crisis — editorial layout, narrow column, neutral color system

### Color Rules
- **Neutral scale only** for all UI: backgrounds, borders, text, surfaces
- **`--brand` (`#1E2FC2` blue, light mode / `#4F6BFB` dark mode)** = interactive elements ONLY: buttons, links, active nav, tag text, focus ring. Full scale: `--blue-300` `#8CA0FF` → `--blue-700` `#131F94`, defined in `css/tokens.css`. Changed from purple to blue on 2026-07-14, sourced from a Bauhaus-style poster reference.
- **Accent illustration palette** (`--orange-500` `#E2601C`, `--yellow-500` `#E3A72A`) = NOT for UI — illustration/decorative only
- Old purple primitives (`--purple-500` etc.) kept in `tokens.css` for reference but no longer wired to `--brand`
- Dark mode handled by `[data-theme="dark"]` in `tokens.css` — all colors flip automatically

### Typography System

| Token | Font | Size / Line-height | Weight | Usage |
|-------|------|--------------------|--------|-------|
| Display | DM Sans | 40–72px / tight | Bold | Hero h1, big headings |
| Heading/XL | DM Sans | 32px / 40px · −0.5px | ExtraBold | Section h2 |
| Heading/LG | DM Sans | 24px / 32px · −0.25px | ExtraBold | Sub-section h2 |
| Heading/MD | DM Sans | 20px / 28px | Medium | h3 |
| Body/LG | Lora | 18px / 30px | Regular | Hero subtitle |
| Body/MD | Lora | 16px / 26px | Regular | All body paragraphs |
| Label/MD | DM Sans | 14px / 20px | Medium | Buttons, CTAs, labels |
| Nav | DM Sans | 14px / 20px | Regular / Medium active | Navigation |
| Caption | DM Sans | 12px / 16px | Regular | Meta, footer |
| Logo | DM Sans | 18px | Bold | Nav name |

### Theme Toggle
- Button in every page nav (`☾ / ☀` icon swap)
- Persisted in `localStorage` under key `portfolio-theme`
- OS preference detected on first visit
- Test in console: `document.documentElement.setAttribute('data-theme', 'dark')`

### Language Switcher
- `EN / ES` toggle in every page nav
- Add `data-i18n="key"` to translatable elements in HTML
- Fill Spanish strings in `js/site.js` → `es: { }` object
- Persisted in `localStorage` under key `portfolio-lang`

### Email (anti-Cloudflare obfuscation)
Injected by JS at runtime. Edit in `js/site.js`:
```js
const user   = 'your';      // ← your email username
const domain = 'email.com'; // ← your email domain
```

---

## Case Study 1 — Design Tokens

- **File:** `case-study-design-tokens.html`
- **Role:** Led adoption of design tokens for Bitsight Design System
- **Key outcomes:** 160+ tokens shipped, light + dark + color-blind modes, one source of truth
- **Key themes:** design/engineering alignment, scalability, semantic naming
- **Memorable detail:** users were my teammates — I saw their reactions in real time
- **Images in repo:** `cs-tokens-cover.jpg`, `token-naming-structure.jpg`, `token-reference-chain.png`, `elevation.png`

---

## Case Study 2 — InfoSec Questionnaire

- **File:** `case-study-infosec-questionnaire.html`
- **Role:** Lead designer · reviewer UI (read-only). Collaborated on respondent components.
- **Design System:** Bitsight DS
- **Key design:** 3 toolbar proposals → vertical action rail (review, flag, bookmark)
- **Pain points solved:** flag filtering, bulk document download
- **Outcomes:** −40% review time, −60% clarification requests, +40% satisfaction
- **Bonus (moved):** AI hackathon → became SOC2 Instant Insights product. The `.ai-banner` block now lives in `case-study-new-site-architecture.html` (Outcomes section), not here — cross-link the two case studies if useful, since the SOC-2 artifact this feature analyzes shows up in CS3's Requirements redesign

### Sections added this session

**"Feature inventory first"** (Design Decisions section)
- Added reverse engineering context: no formal documentation existed, inventory was built from scratch by mapping the live product.

**"Mapping the domain before the UI"** (new subsection in Design Decisions)
- OO domain analysis: 6 core objects (Questionnaire, Question, Score, Finding, Message, Internal Note, Document)
- Inline SVG UML conceptual model — styled with DM Mono, warm paper palette, dark mode aware
- Key insight: Question is the unit of work; toolbar scoped to Question, not the page
- Callout explaining the three distinct communication channels (Finding / Message / Internal Note)
- Placeholder for Figma domain model image (to add when ready)

**"Surfacing the score without exposing the formula"** (new subsection in Design Decisions)
- Problem: score formula was opaque — reviewers couldn't link the number back to inputs
- Solution: surface inputs (answer score + priority) inline at question level
- Score uses five-state icon + color system: Good, Fair, Warn, Bad, N/A — adopted from Bitsight DS (icon + color, replacing color-only scale → accessibility improvement)
- At category/questionnaire level: numerical with same icon for comparison
- Tooltip copy for N/A: *"Questions haven't been answered or graded yet"*
- Tooltip range for Bad: **0–24** (0 included as safe default; confirm minimum with engineering)
- Placeholder for scoring UI screenshots

**"What this project taught me"** (Lessons section — rewritten)
- Consolidated from 5 numbered items to 4 unnumbered paragraphs
- Lessons now reflect: domain-first thinking, structural decisions (three channels + score transparency), dual research methods, system-level decisions that compound

### Artifacts produced this session

| Artifact | File | Notes |
|----------|------|-------|
| Object Analysis spreadsheet | `oo-object-analysis-v2.xlsx` | 2 sheets: Object Analysis (with deferred rows) + Prioritization Matrix |
| Figma wireframes script | `figma-wireframes-questionnaire.js` | Paste into Figma › Plugins › Development › Open Console — builds 4 lo-fi frames for Custom Questionnaire creation wizard |

### Image placeholders still to fill

| Placeholder | What to add |
|-------------|-------------|
| Feature inventory audit | Annotated screenshot or spreadsheet of old platform |
| Domain model (Figma) | Export from Figma — OO model deduced from existing questionnaire |
| Question iterations | `images/question-iterations.png` (already referenced) |
| Final question design | Figma screenshot of vertical rail |
| Scoring UI | Question-level (qualitative) + questionnaire-level (numerical) side by side |
| Light/dark | `images/questionnaire-light-dark.png` (already referenced) |
| Categories panel | `images/categories-panel.png` (already referenced) |
| Questions view | `images/questions.png` (already referenced) |
| Prioritization matrix | Your impact vs. feasibility matrix image |

---

## Case Study 3 — Personas & IA

- **Active file:** `case-study-new-site-architecture.html` (linked from `index.html`)
- **Reference-only files:** `case-study-personas-ia.html` (earlier draft), `case-study-new-site-architecture2.html` (floating-TOC variant) — both kept intentionally, not linked
- **Role:** Lead designer · user research + IA strategy
- **Key outcomes:** 4 research-backed personas, product split (VRM / TMH), 15→2 day assessment turnaround
- **Key themes:** object-oriented IA, mental models, feedback pattern design
- **Research methods:** stakeholder interviews, CS ticket analysis, affinity mapping
- **Bonus banner:** AI Bonus / Instant Insights `.ai-banner` moved in from CS2 this session — sits at the end of the Outcomes section
- **Redesign scenarios — done:** all three before/after scenarios written into the Architecture (05) section, following `before-after-analysis.md`:
  1. Navigation & Vendor Profile — Vendor Profile as a nested nav section replacing a full-screen dialog (product-split level)
  2. Security Profile — unified artifact-row list replacing mixed cards/tables (`UIArtifacts-beforeAfter.png`)
  3. Requirements — accordion + summary dashboard replacing single-requirement tab view (`Requirements.png`)
  Narrative thread used in the prose: object modeled once at the nav level → reused as one artifact row (Security Profile) → reused again inside an accordion (Requirements)
- **Structure changed this session (2026-07-14):**
  - **Personas trimmed from 4 to 2.** The standalone Personas section (formerly 04) is gone — its content (now just the 2 primary personas, Sarah Chen and Tiago Ferreira) was folded into the end of Research (03) as a "Two personas emerged" subsection, framed as a research result rather than its own topic. All sections after it renumbered down by one: Insights 05→04, Architecture 06→05, Outcomes 07→06, Reflection 08→07 — `cs-index` nav and section labels updated to match. Hero-sub, the top outcome-banner stat, and the `index.html` card copy all updated from "4 personas" to "2 personas". The participant table in Research still lists all 4 interview pairs (2 primary, 2 secondary) — that's about interview priority, not final persona count, so it was left as-is.
  - **Outcomes section removed entirely** (2026-07-14, second pass). It briefly held a trimmed 3-card grid (Product architecture, Research methods, Support volume) but those overlapped with content already covered in the Architecture section and the top banner, so the whole section was cut rather than kept half-empty. The one card that mattered — Support volume — moved up into the top outcome-banner (replacing the "15→2 days" stat, which felt redundant next to the testimonial that makes the same point; the banner's fourth stat is now a "↓" for customer success tickets). The closing testimonial (Thiago Ribeiro, Charles River Laboratories) moved to the end of the Architecture section, right after the AI Bonus banner, serving as real-world validation for the whole redesign.
  - Reasoning: CS1 and CS2 both show their outcome-banner once at the top and keep any further outcomes content as pure narrative woven into other sections — CS3 now follows the same pattern instead of having a dedicated Outcomes section that mostly repeated numbers shown elsewhere.
  - **Feedback Patterns promoted to its own section** (2026-07-14, third pass), positioned right before Architecture. It now has its own explicit Before/After (`seg-defs`) framing — before: no confirmation, no status, blank empty states, tickets as the only way to find out; after: the four-state pattern library (empty/loading/success/error). Content: the Pendo first-patch paragraph, the before/after cards, the "Feedback patterns, standardized" prose + `patterns-grid` + checklist image, and a new testimonial quote ("Empty states are very clear and helpful.") attributed to a PURE usability test participant. The synthesis callout attributing the support-ticket drop to *both* the product split and the feedback patterns now sits at the end of Architecture's nav-level before/after content (it references "the feedback patterns from the previous section," so it needs Feedback Patterns to come first — which it now does).
  - **Current section order:** 01 Context, 02 Problem, 03 Research, 04 Insights, 05 Feedback Patterns, 06 Architecture, 07 Reflection — seven total, `cs-index` nav updated to match.
  - **Testimonials added (2026-07-14, later same day):** Security Profile ("everything in one place"), Requirements ("both tools"), and Feedback Patterns (PURE usability quote) each got a supporting testimonial placed right after their respective redesign video. The closing Thiago Ribeiro quote was anonymized (name/company removed, "ThirdPartyTrust" scrubbed from the quote text itself — now "VRM customer" / "Associate Director, Information Security Engineering"), and a second, more mixed-sentiment quote ("I am not seeing enough value... but I can see the vision") was added alongside it, anonymized from a named company. **Bug found and fixed:** an earlier edit misplaced the Architecture section's closing `</section>` tag, leaving the through-line callout and AI Bonus banner floating outside any section, and left two testimonials out of order. Full region was rebuilt in the correct order: Security Profile → quote → Requirements → quote → through-line callout → AI Bonus → Thiago quote → mixed-sentiment quote → `</section>`.
  - **Research section (03) rewritten as a team effort.** "Who I talked to" (renamed "The research team") no longer reads as solo work — it now credits 2 product designers, 2 product managers, and 5 customer success teammates who helped plan and run interviews. The `participant-table` (named individuals — Carlos/Emma, Lucas/Priya, Tom/Ana, David/Nina) was removed entirely from this file; that CSS class is still used by the two unlinked reference-only files, so it wasn't deleted from `case-study.css`.
  - **Reflection trimmed to 3 lessons.** Removed "Run tree testing before committing to the split" (per Ariel's request). Replaced "Reach unsubscribed participants earlier" (which named Tom/Ana/David/Nina — no longer grounded once the participant table was removed) with "Loop customer success in earlier," a lesson tied to the newly-added research-team framing: CS teammates helped recruit/run sessions but weren't looped in to help shape the research questions themselves.
- **Password gate:** the page is client-side password protected (inline `<style>`/`<script>` at the top and bottom of the file). It checks the entered password against a small dependency-free hash (FNV-1a, not Web Crypto — chosen specifically so it also works when the file is opened directly via `file://`, where `crypto.subtle` is unavailable in most browsers) and unlocks by removing a `cs3-locked` class from `<body>`; once correct, it's remembered via `localStorage` under the key `cs3-unlocked` so returning visitors don't need to re-enter it. **The plaintext password is intentionally not written anywhere in this repo** (including here), since the repo is public — only its hash lives in the HTML. Change the password by computing the new value's FNV-1a hash (see the `simpleHash()` function near the bottom of `case-study-new-site-architecture.html`) and swapping the `HASH` constant.
  - ✅ **Confirmed working on GitHub Pages** (2026-07-14): unlock and the "wrong password" error message both verified live. Debugging along the way fixed two real bugs — the `#cs3-gate` overlay CSS wasn't scoped to `.cs3-locked` (so it never disappeared after a correct unlock), and the original `<form>`/`type="submit"` markup was replaced with a plain button `click` handler + manual Enter-key handling, removing any native-submission fallback path.
  - To re-test the locked state during future edits: `localStorage.removeItem('cs3-unlocked'); location.reload();` in the browser console.
  - ⚠️ Heads up: this is a soft gate, not real security. The page's HTML, images, and video are still fully downloaded by the browser and visible via "View Source" or dev tools; a technically motivated visitor could bypass it. It's fine for keeping the case study out of casual browsing, not for protecting genuinely confidential material.

---

## How to Work with Claude

### Starting a session
```
Read context from https://raw.githubusercontent.com/harielBaiz/portfolio/main/session-context.md
and today I want to work on [X].
```

### Sharing a specific file
```
The current [filename] is at https://github.com/harielBaiz/portfolio/blob/main/[filename]
Please [do X].
```

### Claude's GitHub access
Claude can read public repo pages via `github.com` URLs. **`raw.githubusercontent.com` is blocked** in Claude's sandbox — upload files directly to the chat instead.

**Workflow after Claude edits a file:**
1. Claude outputs the updated file as a download
2. Save it to your local repo (replace the existing file)
3. `git add [file] && git commit -m "your message" && git push`
4. GitHub Pages updates in ~30 seconds

**Do not share GitHub tokens in chat.** If automation is needed, use GitHub Actions secrets or environment variables. Revoke any token shared in a previous session immediately at https://github.com/settings/tokens