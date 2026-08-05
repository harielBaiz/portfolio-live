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

### Naming Decision, round 2 (2026-07-30)

Nav logo across all 6 pages changed from "Hariel Baiz" to **"HAB"** (initials). Page `<title>`s and the footer/contact copyright line moved to **"H. Ariel Baiz · Senior Product Designer"**. Both changes came from Ariel directly (not something Claude proposed) — full name and role title stayed in the byline-length copy, just the nav mark got compressed to initials. If asked to touch the brand name again, "HAB" is the current source of truth for the nav logo; "H. Ariel Baiz · Senior Product Designer" for page titles/footer.

---

## Repository

- **Dev repo (this one):** https://github.com/harielBaiz/portfolio — where Claude sessions work, iterate, and commit freely
- **Live repo:** https://github.com/harielBaiz/portfolio-live — clean-history mirror Ariel pushes to manually when a version is ready to publish.
- **Live site:** https://harielbaiz.com/ — **confirmed working 2026-07-29**, both apex and `www`. DNS is on Cloudflare: 4 apex `A` records to GitHub's Pages IPs (185.199.108/109/110/111.153) + `www` CNAME to `harielbaiz.github.io`, all set to **DNS only** (grey cloud, not proxied) so GitHub can issue the Let's Encrypt cert. Custom domain is configured in `portfolio-live` → Settings → Pages.
- **Publish workflow:** copy working files (excluding `.git`) from `portfolio` into a fresh folder, `git init` + single commit, push to `portfolio-live` main. Keeps the live repo's history to one clean commit per publish rather than carrying the dev repo's full commit trail.
- **`CNAME` file:** lives only in `portfolio-live` (auto-committed by GitHub when the custom domain was saved in Pages settings) — removed from `portfolio` (dev repo) on 2026-07-29 so the dev repo can never claim the domain and conflict with the live one.
- **Troubleshooting note for next time (2026-07-29 postmortem):** after DNS + custom domain were configured, the site still 404'd on both the custom domain *and* the plain `harielbaiz.github.io/portfolio-live/` URL. Cause: GitHub Pages had never actually run a build — no `github-pages` entry existed yet under the repo's Environments sidebar, and the Actions tab was a red herring (this repo uses the legacy "Deploy from a branch" source, which doesn't show up under Actions at all). Fix: `git commit --allow-empty -m "Trigger Pages build"` + `git push` forced the first real deployment. Also hit a `non-fast-forward` push rejection along the way because GitHub had auto-committed the `CNAME` file directly to the remote (via the Settings UI) — resolved with a plain `git pull origin main` before pushing again. If a future push to `portfolio-live` gets rejected as non-fast-forward, check whether Settings → Pages auto-committed something (CNAME changes, etc.) before assuming a real conflict.
- **Publish/versioning workflow (established 2026-07-30):** `portfolio-live` isn't re-initialized from scratch on every publish anymore — it keeps its own small commit history (initial commit, GitHub's auto CNAME commit, the empty "trigger build" commit, and one commit per release since). Releases are tagged with annotated tags following semver-ish convention: `v0.x.y` pre-launch, `v1.0.0` reserved for the official public launch. Shipped so far: `v0.2.0`, `v0.3.0` (style/image adjustments). **2026-08-05: Ariel confirmed the portfolio is ready — `v1.0.0` is the next tag, reserved for the official public launch as originally planned.** Not yet created/published as of this note — see Pending. Standard publish sequence, run from inside `C:\Users\HArie\Documents\portfolio-live`:
  ```powershell
  git pull origin main --no-edit
  robocopy C:\Users\HArie\Documents\portfolio C:\Users\HArie\Documents\portfolio-live /E /XD .git
  git add -A
  git commit -m "vX.Y.Z — <short description>"
  git tag -a vX.Y.Z -m "vX.Y.Z — <short description>"
  git push origin main
  git push origin vX.Y.Z
  ```
  Pull *before* copying new files in, not after — keeps the working tree clean when the merge happens, sidesteps any risk of merging against uncommitted changes. Note `robocopy` without `/MIR` only adds/updates, never deletes — intentional, since it means it won't ever wipe `portfolio-live`'s own `CNAME` file (which doesn't exist in the dev repo). If a file is deleted from `portfolio` and needs to disappear from `portfolio-live` too, that still has to be done manually on the live side.

---

## File Structure

```
portfolio/
├── index.html                              ← Landing page (CS3 card now links to case-study-new-site-architecture.html)
├── about.html                              ← About Me page
├── session-context.md                      ← This file
├── case-study-design-tokens.html           ← Case Study 1 · Design Tokens
├── case-study-infosec-questionnaire.html   ← Case Study 2 · InfoSec Questionnaire
├── case-study-new-site-architecture.html   ← Case Study 3 · Personas & IA (active/linked version)
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
│   ├── favicon.ico                                                                                (site-wide, linked from all 5 pages' <head>)
│   ├── cs-tokens-cover.jpg, token-naming-structure.jpg, token-reference-chain.png, elevation.png  (CS1)
│   ├── questionnaire-3pt-design.png, OO-domain-level.png, OO-specification-level-object-model.png,
│   │   question-iterations.png, questionnaire-light-dark.png, categories-panel.png, questions.png,
│   │   questionnaire.mp4, action-sheets.png                                                       (CS2)
│   ├── affinityDiagram-journeyMap.png, user_personas.png, products-core-objects.png,
│   │   UIArtifacts-beforeAfter.png, Requirements.png, navigationAndVendorProfile-beforeAfter.png,
│   │   before-after.png, requirements.mp4, securityProfile.mp4                                    (CS3)
│   └── (accessibility/tokens reference set: color-blind-mode.png, elevation-table.jpg, spacing-tokens.mp4, etc.)
└── downloads/
    ├── Hariel-Baiz-Resume-EN.pdf         ← source PDF, updated 2026-08-05
    ├── Hariel-Baiz-Resume-ES.pdf         ← source PDF, updated 2026-08-05
    ├── Hariel-Baiz-Resume-ATS.txt        ← plain-text ATS version (EN), refreshed 2026-08-05 to match the PDF
    └── Hariel-Baiz-Resume-ATS-ES.txt     ← plain-text ATS version (ES), new 2026-08-05
```

**Note:** the old `Hector-Ariel-Baiz-Resume-*.pdf` files still exist in `downloads/` as duplicates (kept since files can't be silently deleted from this folder). Safe to delete once you've confirmed the new links work — just ask Claude, or remove them yourself.

---

## Current Status

| File | Status | Notes |
|------|--------|-------|
| `index.html` | ✅ Done | Nav, hero, 3 project cards, skills, about, contact. **2026-07-30:** nav logo → "HAB", contact section email now has a copy-to-clipboard button next to it, LinkedIn/Resume in contact section restyled from `.btn-ghost-dark` to plain-text `.btn-text-dark`, `.contact-dark h2` restyled (`font-weight: 500; letter-spacing: 1px`). **2026-08-05:** `hero.intro` rewritten to current copy; CS1/CS3 card descriptions rewritten for accuracy/brevity; period caption (`.case-row__period`) added below each card title (`2023-2024`, `2023-2024`, `2022-2023`); favicon link added |
| `about.html` | ✅ Done | Bio rewritten 2026-07-29: narrative style (electronics tech in high school → Graphic Design at UBA, specialized in branding + editorial layouts → product design), explicit PVP line, collaborative closing line on the "what I bring" paragraph (replaced an "invisible design" line Ariel didn't resonate with). Design-lineage sentence and "looking for my next role" line were both removed per Ariel's request. Quote: William Morris, styled as an exact copy of the case studies' `.testimonial-card.testimonial-card--inline` pattern (quote icon, word-by-word reveal via `site.js`, meta line) — CSS duplicated into `about.css` since about.html doesn't load `case-study.css`. Layout reworked into a single centered column (`.about-wrap` now `max-width: 720px`, matches case studies' `.page-wrap`) — old two-column bio grid and `.about-hero` header removed entirely. Skills & Tools converted from card grid to plain text rows (`.plain-list`). "Off the clock" personal-facts section was added then removed same session — Ariel wasn't sure yet which facts vs. hobbies (motorcycle trip, Patagonia, bass, vs. woodworking/vitreaux/dog walking) he wants public; revisit once he's decided. Skills & Tools split into two labeled sub-lists (`.about-skills__subhead` + `.plain-list`, single-value rows, no more `.plain-list__cat` descriptions): Skills = Design Systems, Interaction Design, WCAG/A11y, User Research, Graphic Design. Tools = Figma, Claude, Adobe Creative Suite, Jira, Notion, HTML/CSS, Git, Pendo. Facts/numbers section removed (2026-07-14). Graphic design paragraph with hover/focus GIF-preview terms (`.gd-term`) — needs real GIF assets, see Pending. Blue page background + curtain-lift intro animation was tried, then rolled back same day per Ariel's request — page is back to the original light/neutral theme; `.gd-term` restyled to use `--brand`/`--text-3` instead of the blue-specific colors. **2026-08-05:** p3 timeline corrected ("a few years" → "more than 10 years" of graphic design); p4 replaced — the professional "what I bring to a team" PVP paragraph swapped for a personal/hobbies paragraph (Buenos Aires, Patagonia, hiking, photography, music), per Ariel's direct edit. See Pending: this removes the page's only explicit PVP line |
| `case-study-design-tokens.html` | ✅ Structure done | Needs real images in placeholders. **2026-08-05:** Lessons p1/p4 revised (first person, no intro phrases); outcome-stat labels now include numbers inline, 4th stat → "40% less time designing components per mode"; new `.hero-facts` block (Timeline/Role/Deliverables) added above hero-sub |
| `case-study-infosec-questionnaire.html` | ✅ Structure done | New sections added (see CS2 notes below). AI Bonus banner moved OUT to CS3 this session. Needs real images in placeholders. **2026-07-30:** `.insight-list` icons switched from raw Unicode glyphs (✓/↓/→) to the site's stroke-SVG icon system (checkmark for `.win`, down-arrow for `.pain`, colored via existing win/pain palette incl. dark mode). The "Validation in the wild" list got a new `.insight-list--plain` modifier (no card bg/border/padding, just icon + text rows) and its icon changed from arrow to checkmark, muted to `--text-3` since those items aren't literal win/pain signals. **2026-08-05:** hero title changed to "Redesigning the questionnaire that decides vendor risk"; Lessons rewritten first-person; outcome banner dropped the "+40% user satisfaction" stat for two concrete outcomes (shared component, 5→1 action rail); new `.hero-facts` block added; duplicate `caption4` i18n key bug fixed (see dated note above) |
| `case-study-new-site-architecture.html` | ✅ Structure done | Active CS3 file, linked from `index.html`. Personas/IA story + AI Bonus (Instant Insights) banner in Outcomes + all three before-after scenarios (Security Profile, Requirements, Navigation & Vendor Profile) now written into the Architecture (06) section using `before-after-analysis.md`. **Password-protected — confirmed working live on GitHub Pages** (see note below). Needs real hero cover image + final proofread of new prose. **2026-08-05:** Reflection section renamed to Lessons with a new p3 (ThirdPartyTrust/backlog/acquisition story); large EN/ES mirror pass across Context/Problem/Research/Insights/Feedback Patterns/Architecture; ownership language corrected (VRM led, TMH collaborated); new `.hero-facts` block added — see dated note above for the known period inconsistency |
| `css/tokens.css` | ✅ Done | Light + dark mode tokens |
| `css/base.css` | ✅ Done | Shared components. **2026-07-31:** `.lang-toggle` button and its CSS (`EN/ES`, active/dim states) re-added to the nav on all 5 linked pages — see Language Switcher note below. |
| `css/landing.css` | ✅ Done | Landing-specific styles. **2026-07-30:** `.contact-dark h2` restyled (`font-weight: 500; letter-spacing: 1px`, was 700/-1.5px). **2026-08-05:** `.case-row__period` caption style added (DM Mono, 0.7rem, uppercase, `--text-3`) |
| `css/case-study.css` | ✅ Done | Case study styles + hero cover. **2026-07-30:** duplicated testimonial CSS removed (now in `base.css`, see above). Added Tablet (`≤1024px`) and Smartphone (`≤480px`, iPhone SE reference) breakpoints under the RESPONSIVE section, with placeholder comments for Ariel to keep adding values. Brand color usages (`.method-card h3`, `.badge-primary`, `.theme-implication`, `.insight-list` colors, etc.) all flow from `tokens.css`'s `--brand` — no direct edits needed here for the neutral-color change, see Color Rules below. **2026-08-05:** `.hero-facts`/`.hero-facts__col`/`.hero-fact`/`.hero-fact-label`/`.hero-fact-value` added (see dated note above); `.insight-list--plain li.pain` rule added (mirrors the pre-existing `.win` rule); `.hero` given `max-width: 1680px; margin: 0 auto;` |
| `css/about.css` | ✅ Done | About page styles. Skills & Tools (`.about-skills__columns`) is a 2-column grid on desktop, stacks to 1 column below 600px. **2026-07-30:** duplicated testimonial CSS removed (now in `base.css`). |
| `js/site.js` | ✅ Done | Theme toggle · lang toggle (live) · scroll reveal · progress bar · `initMobileNav()` (hamburger) · `initCopyEmail()`. **2026-07-31:** `i18n` dictionary expanded from the nav/hero scaffold to full page coverage — 396 EN/ES key pairs across `index.html`, `about.html`, and all 3 linked case studies. `setLang()` also now updates `document.title` via a new `data-i18n-title` attribute on `<html>`, and supports `data-i18n-aria` (defined but not yet used anywhere). **2026-08-05:** large EN/ES key mirror pass (see dated note above); `cs3.reflection.*` keys renamed to `cs3.lessons.*`; duplicate `cs2.outcomes.caption4` key bug fixed |
| `downloads/Hariel-Baiz-Resume-EN.pdf` | ✅ In repo | Linked from nav/contact. Updated 2026-08-05 — summary line now matches `hero.intro`, trimmed 5-item skills list |
| `downloads/Hariel-Baiz-Resume-ES.pdf` | ✅ In repo | Updated 2026-08-05, same changes as EN |
| `downloads/Hariel-Baiz-Resume-ATS.txt` | ✅ In repo | Plain-text ATS version (EN), refreshed 2026-08-05 to match the updated PDF |
| `downloads/Hariel-Baiz-Resume-ATS-ES.txt` | ✅ In repo | Plain-text ATS version (ES), new 2026-08-05 |

### Shared change across all 4 case study files (2026-07-30)
Footer simplified: removed "&nbsp;·&nbsp; Hariel Baiz · Product Designer &nbsp;·&nbsp;" and the `Contact` link, leaving just the "← Back to all work" link. Applied identically to `case-study-design-tokens.html`, `case-study-infosec-questionnaire.html`, and `case-study-new-site-architecture.html`.

### Spanish translation + language toggle (2026-07-31)
Full Spanish version shipped. The `.lang-toggle` button (EN/ES) is back in the nav on `index.html`, `about.html`, `case-study-design-tokens.html`, `case-study-infosec-questionnaire.html`, and `case-study-new-site-architecture.html` — wired to `toggleLang()` in `site.js`. Every visible string on those 5 pages is now tagged with `data-i18n` (or `data-i18n-placeholder` on the CS3 password-gate input) and has both an `en` and `es` entry in the dictionary, including the CS3 password gate UI and all six `<title>` tags. Design/tool terms (Figma, Design Tokens, Design Systems, Bitsight DS, tool names, etc.) were deliberately left untranslated — standard practice in ES-language design portfolios. Verified with a headless DOM test: toggling to `es` on every page updates all tagged content, the toggle button label, and `document.title` with no leftover English and no JS errors. `case-study-personas-ia.html` was deleted by Ariel (2026-07-31) — no longer part of the repo or the file structure above.

### Post-launch polish on CS1 & CS2 (2026-08-03)
Same session, after the Spanish version shipped. All changes below were made in both `en` and `es` dictionary entries plus the HTML fallback text, so EN/ES stayed in sync as of this session:
- **CS1 hero title** changed from "Building the token system that made consistency scalable" to **"Scaling Consistency with Design Tokens"** (ES: "Consistencia que escala con Design Tokens" — chosen over a more literal "Escalando consistencia..." which read badly).
- **CS1 intro/Problem/Research corrected for accuracy**, per Ariel: colors were never literally hardcoded — design worked from Figma styles, and engineering already had some form of tokens in code (the platform already had a light/dark toggle). The real gap was that naming and values were never aligned between the two disciplines. Hero-sub and the Problem (02) section were rewritten around this; the Research (03) audit paragraph was rewritten once, then **rolled back to its original "hardcoded values" phrasing** per Ariel's request (he found the rewritten version confusing) — only its closing line was simplified in both languages: EN now reads "The answer: everywhere, because color touched every component." / ES "La respuesta: en todos lados, porque el color estaba en cada componente."
- **CS2 (InfoSec Questionnaire) Research section reordered**: the PURE Expert Evaluation card now leads as "Study 1 · Internal" (copy rewritten to explain Bitsight employees weren't familiar with the ThirdPartyTrust workflows, so internal testing came first), and the Moderated Usability Test now follows as "Study 2 · External."
- **CS2 Outcomes → Results paragraph converted to a bullet list** using the same `.insight-list--plain` styling as "Validation in the wild" (3 items, `.win` icons).
- **Icon swap**: all `.win` checkmarks inside `.insight-list--plain` (both the "Validation in the wild" list and the new Results list) now use Lucide's `square-check-big` icon instead of the plain checkmark path.

### Tension section removed from CS1 (2026-08-03)
The "05 — Collaboration" (`#tension`) section in `case-study-design-tokens.html` was removed entirely (EN + ES), since Ariel doesn't know how the design/engineering alignment played out long-term. He left Bitsight after a company-wide layoff shortly after the early, positive engineering conversations. Sections renumbered: Outcomes 06→05, Lessons 07→06 (`cs-index` nav + section labels updated in both HTML and `js/site.js`'s `en`/`es` dictionaries). Part of the cut content was folded into a new 4th Lessons paragraph (`cs1.lessons.p4`): early engineering meetings were open to alignment, but the layoff means the long-term outcome is unknown — framed as an honest limitation, not a resolved ending. `.tension-grid` CSS class in `case-study.css` is now unused but left in place, same treatment as other retired classes noted elsewhere in this file.

### Lessons rewritten in first person, CS3 EN/ES mirror pass, Lessons rename, hero-facts component (2026-08-05)

Large session covering copy accuracy, structural cleanup, and a new shared UI component across all 3 case studies:

- **Lessons sections rewritten in first person, no intro-phrase openers.** CS2's Lessons went through several rounds (avoiding "I learned that..." as a repeated opener, dropping the word "heuristics"). CS1's Lessons p1 was compressed ("I stopped designing for perfection and started designing for change. The tokens that lasted were the ones that could absorb a new theme or a new opinion without a rewrite.") and p4 (the engineering-alignment/layoff paragraph added 2026-08-03) was revised to end more resolved: "...But I can say the relationship we built was what let the token system get adopted and keep evolving, even after I left."
- **CS3's Reflection section renamed to Lessons** (`id="reflection"` → `id="lessons"`, all `cs3.reflection.*` i18n keys renamed to `cs3.lessons.*`, h2 → "What this project taught me" / "Lo que este proyecto me enseñó"). `cs-index` label shortened from "Lessons Learned" to "Lessons" across all three case studies.
- **CS3 lessons p3 rewritten** into a new ThirdPartyTrust/backlog/acquisition story: the IA pain points were already identified pre-acquisition, sat in a backlog behind other priorities, and only became a full redesign once the Bitsight integration opened the door — most of the research was already done by then.
- **Large EN/ES mirror pass across CS3**: Context, Problem (converted from `.cs-card` grid to `.insight-list--plain` with `.pain` + circle-alert icon), Research, Insights (theme list converted to `.insight-list--plain` + `.win`), Feedback Patterns, and Architecture (p1–p8, card captions) — Spanish had drifted ahead of English in several places from Ariel's direct edits; diffed key-by-key and brought English back in sync. Removed 3 orphaned i18n keys with no HTML reference (`cs3.arch.callout1`, `callout3`, `quote3*`).
- **Ownership language corrected** in `cs3.hero.sub` and `work.cs3.desc`: Ariel led VRM's navigation/IA redesign himself and collaborated on (did not own) TMH's side — earlier phrasing implied he redesigned both.
- **New `.hero-facts` component**, added to `case-study.css` and all 3 case study files: a 2-column grid above the hero-sub with "Timeline" and "My Role" in one column, "Deliverables" in the other; collapses to 1 column at the existing `≤768px` breakpoint. `.hero { max-width: 1680px; margin: 0 auto; }` also added so the hero doesn't stretch edge-to-edge on very wide/4K screens.
  - CS1: Timeline `2023-2024` · Role `Design Systems Lead` · Deliverables `Token architecture, Figma variable library, naming convention documentation, updated components`
  - CS2: Timeline `2023-2024` · Role `Senior Product Designer working across product strategy, research and design systems` · Deliverables `Questionnaire redesign, vertical action rail, scoring UI, PURE evaluation and usability test reports`
  - CS3: Timeline `2022-2024` · Role `Senior Product Designer working across IA strategy, research and platform redesign` · Deliverables `User personas, information architecture, and product redesign for VRM, the customer-facing side of the platform`
  - ⚠️ **Known inconsistency, not yet resolved:** CS3's landing-card period (`work.cs3.period` on `index.html`) is `2022-2023`, one year off from `cs3.facts.timelineValue`'s `2022-2024` on the case study page itself. Flag to Ariel next session.
- **`work.cs1.period` / `work.cs2.period` / `work.cs3.period`** added to `index.html`'s landing cards (below the title, styled via new `.case-row__period` class in `landing.css` — DM Mono, uppercase, `--text-3`).
- **Outcome stats revisited for honesty/precision**, per Ariel's own explanation of how each was actually estimated:
  - CS1: 4th outcome stat changed from "45% faster design-to-dev handoff" to **"40% less time designing components per mode"** — an estimate based on not needing to design duplicate light/dark-mode component variants once tokens (not raw values or styles) did that automatically. All 4 outcome-stat labels now include their number inline.
  - CS2: dropped the ambiguous "+40% user satisfaction" stat (never had a clean measurement behind it), replaced with two concrete outcomes: "1 reusable component from the Questionnaire, shipped to Bitsight DS and ready for reuse across all Bitsight products" and "5 independent question-level tools — review, bookmark, finding, messaging, internal notes — consolidated into one consistent action rail."
- **CS2 hero title** changed from "Redesigning the tool that holds vendors accountable" to **"Redesigning the questionnaire that decides vendor risk"** (both languages).
- **Bug fixed:** a duplicate `cs2.outcomes.caption4` i18n key (one for a video caption, a second accidentally reused for a new action-sheets image caption) was silently overwriting the video caption in both `en`/`es` — renamed the newer entry to `caption5` and restored the original.
- **`index.html` copy revisions:** CS1 card description rewritten for accuracy (mentions the 160+/100+ token counts and light/dark/color-blind modes explicitly); CS3 card description shortened to one standalone sentence; `hero.intro` headline rewritten to its current form ("Hi! I'm Ariel, a Senior Product Designer based in Buenos Aires. With 6+ years of experience in B2B SaaS web products, I specialize in design systems and high-quality UI — building user-centered systems that let good design hold up as products scale.") — this exact sentence is now also the SUMMARY line on both resume PDFs and both ATS `.txt` files, so all four are in sync.
- **`about.html` p3/p4 updated:** p3's timeline corrected ("a few years" → "more than 10 years" doing graphic design). **p4 replaced** — the professional "what I bring to a team" PVP paragraph was swapped for a personal/hobbies paragraph (Buenos Aires, Patagonia, hiking, photography, music), per Ariel's direct edit. ⚠️ **This removes the About page's only explicit PVP statement** — worth flagging again if a recruiter-facing PVP line is wanted back somewhere on the page.
- **Resume ATS `.txt` files refreshed** from newly updated PDFs (`downloads/Hariel-Baiz-Resume-EN.pdf`, `Hariel-Baiz-Resume-ES.pdf`): `Hariel-Baiz-Resume-ATS.txt` updated in place (new summary line matching `hero.intro`, trimmed 5-item skills list matching `about.html`, "Github" instead of "Git"); new `Hariel-Baiz-Resume-ATS-ES.txt` created, same template, Spanish content.
- **Favicon added**: `images/favicon.ico`, linked via `<link rel="icon" href="images/favicon.ico"/>` in all 5 pages' `<head>`.
- **v1.0.0 launch declared by Ariel** ("live portfolio is ready to launch, it will be v1.0.0") — dev repo is committed and up to date; **publish to `portfolio-live` still needs to be run by Ariel** (see command block immediately below and Pending).

### v1.0.0 — official launch publish (2026-08-05)

Same pull-first sequence used for `v0.2.0` and `v0.3.0` (established in an earlier session), run from `C:\Users\HArie\Documents\portfolio-live` — this is the reserved official-launch tag, so the commit/tag message reflects that instead of a generic pre-launch note:

```powershell
cd C:\Users\HArie\Documents\portfolio-live
git pull origin main --no-edit

robocopy C:\Users\HArie\Documents\portfolio C:\Users\HArie\Documents\portfolio-live /E /XD .git

git add -A
git commit -m "v1.0.0 — portfolio launch"
git tag -a v1.0.0 -m "v1.0.0 — portfolio launch"
git push origin main
git push origin v1.0.0
```

Same notes as before apply: pull *before* robocopy, not after (keeps the working tree clean going into the merge); robocopy without `/MIR` only adds/updates, so it never touches `portfolio-live`'s own `CNAME` file; if `git push origin main` gets rejected as non-fast-forward, it's almost always GitHub's Pages settings UI having auto-committed something (e.g. a CNAME change) — `git pull origin main --no-edit` again resolves it. Once this is confirmed pushed, update the "Shipped so far" line above to include `v1.0.0` and flip this Pending item to done.

### Pending

- [x] Real email address set in `js/site.js` (`hariel.baiz@gmail.com`)
- [x] LinkedIn URL set (`linkedin.com/in/hariel-baiz`)
- [ ] Add the 3 graphic design preview GIFs for `about.html`'s hover terms: `images/graphic-branding.gif`, `images/graphic-editorial.gif`, `images/graphic-illustration.gif`. Until these exist, hovering/focusing "Branding" / "Editorial" / "Illustration" shows a plain blue color chip with the word as a label (graceful fallback, not broken) — see `.gd-term` in `css/about.css`
- [ ] Add `images/feedback-patterns-checklist.png` — new image referenced in `case-study-new-site-architecture.html`, Outcomes section, for the "Feedback patterns, standardized" subsection (uses the existing unused `.patterns-grid` / `.pattern-card` CSS, already scoped "(cs3)" in `case-study.css`)
- [ ] Replace placeholder images (`<figure class="hero-cover hero-cover--placeholder">`) with real screenshots in all 3 case studies
- [x] Fill in Spanish translations in `js/site.js` → `es: {}` object — full site coverage, see note above
- [x] Three before/after scenarios (Security Profile, Requirements, Navigation & Vendor Profile) written into the Architecture (06) section of `case-study-new-site-architecture.html`, using `before-after-analysis.md` — `requirements.mp4` / `securityProfile.mp4` still available if video is preferred over stills later
- [ ] Place `hackathon.gif` into the AI Bonus banner in `case-study-new-site-architecture.html` (Outcomes section)
- [x] **EN/ES sync pass.** Large diff-and-mirror pass completed 2026-08-05 across CS1, CS2, CS3, `index.html` — see dated section above. Spanish had drifted ahead from Ariel's direct edits; English was brought back in sync key-by-key.
- [ ] Ariel to review the rest of the Spanish translations end-to-end (content was machine-drafted, not yet proofread by a native-speaker pass from Ariel himself)
- [ ] **Fix CS3 period inconsistency:** `work.cs3.period` on `index.html`'s landing card reads `2022-2023`; `cs3.facts.timelineValue` on the case study page itself reads `2022-2024`. Pick one and mirror it to both, both languages.
- [ ] **Decide whether About needs an explicit PVP line again.** `about.html` p4 was swapped from a professional "what I bring to a team" paragraph to a personal/hobbies paragraph (2026-08-05) — the page currently has no standalone PVP statement.
- [ ] **Publish v1.0.0 to `portfolio-live`.** Ariel confirmed the portfolio is ready to launch as `v1.0.0` (2026-08-05) and the dev repo (`portfolio`) is committed and up to date on `main`. Publish instructions were given the same day (see "v1.0.0 — official launch publish" note below) but not yet confirmed run/pushed as of this note. Note: a stale `.git/index.lock` earlier in this session blocked `git commit`/`git tag` inside Claude's sandboxed mount of `portfolio` (likely another program had the repo open locally) — that's a sandbox-only limitation and doesn't affect commands Ariel runs himself in PowerShell against his real local `portfolio-live` folder (not mounted in Claude's sandbox at all, so this publish step has always been run by Ariel directly, same as `v0.2.0`/`v0.3.0`).

---

## Design System

### References
- **Figma DS:** https://www.figma.com/design/NrZReZOBki85NDzJlQKQrg/portfolio-DS
- **Wireframe page node:** `242:40156` (wireframe page — custom questionnaire lo-fi frames live here)
- **Visual reference:** https://www.doc.cc/articles/craft-crisis — editorial layout, narrow column, neutral color system

### Color Rules
- **Neutral scale only, full stop** — as of 2026-07-30 this includes `--brand`. Blue (sourced from a Bauhaus-style poster reference, added 2026-07-14) has been replaced site-wide with neutral values:
  - `--brand`/`--brand-hover` (text/link use): `--n-900`→`--n-950` in light mode, `--n-100`→`--n-0` in dark mode
  - `--brand-fill`/`--brand-fill-hover` (buttons, progress bar): now just aliases `var(--bg-inverse)` (the same dark/light flip already used by the contact section), paired with `--text-on-brand` which now aliases `var(--text-on-inverse)` — guarantees correct contrast in both themes without inventing new verified pairs
  - `--brand-tag-bg` needed no change — it was already `--n-200`/`--n-700`, genuinely neutral from the start
  - The old blue primitives (`--blue-300`–`--blue-700`, `#1E2FC2` etc.) are left in `tokens.css` for history, same treatment as the old purple scale — unwired, not deleted
  - Site is effectively monochrome now: buttons, active states, links, badges, the case-study progress bar, tags, all of it. No hardcoded hex colors bypass the token system anywhere in the codebase, so this was a token-only change with zero HTML edits needed.
- **Accent illustration palette** (`--orange-500` `#E2601C`, `--yellow-500` `#E3A72A`) = NOT for UI — illustration/decorative only, unaffected by the neutral-brand change
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
- **Live again as of 2026-07-31.** `.lang-toggle` button (`EN / ES`, click to flip) is back in the nav on all 5 linked pages, wired to `toggleLang()`. `setLang(currentLang)` still runs on every page load, and the choice persists via `localStorage` under `portfolio-lang`.
- **The `i18n` dictionary in `site.js` is the source of truth**, not the HTML. Every element with `data-i18n="key"` gets its content overwritten by `i18n.en[key]` (or `i18n.es[key]`) on load — editing the HTML text directly does NOT stick if that key also exists in the dictionary. To change copy on a `data-i18n`'d element: find the key, edit the value in `site.js`, not the HTML.
- **2026-07-31: full-page coverage.** What used to be nav/hero-only is now 396 EN/ES key pairs spanning every visible string on `index.html`, `about.html`, and all 3 case studies — hero copy, outcome stats, callouts, testimonials, card grids, insight lists, the CS3 password-gate UI, and all `<title>` tags (via a new `data-i18n-title` attribute on `<html>`, resolved by `setLang()`). There's also a `data-i18n-aria` hook for translating `aria-label`s, defined but not used anywhere yet — aria-labels are still English-only across the site.
- Key naming convention: shared strings keep short dot-notation keys (`nav.*`, `footer.*`, `contact.*`); page-specific copy is namespaced per page/case-study and section, e.g. `cs1.context.p1`, `cs3.arch.quote2role`, `about.p3`.
- Design/tool terms were deliberately left untranslated in the `es` dictionary (Figma, Design Tokens, Design Systems, Bitsight DS, Figma, tool names) — standard practice in ES-language design portfolios, not an oversight.
- Real bug fixed earlier: `contact.title` has an `<em>` around "together"/"juntos", but `setLang()` used `el.textContent`, which strips tags — so the italic was being silently wiped on every load. Switched to `el.innerHTML`.
- Add `data-i18n="key"` to new translatable elements in HTML, then add matching `en`/`es` entries in `js/site.js`. For inputs use `data-i18n-placeholder`.
- **Not yet done:** Ariel's own native-speaker proofread of the Spanish copy — content was translated by Claude, not reviewed line-by-line by Ariel yet.

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