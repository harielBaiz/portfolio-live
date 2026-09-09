// Mark JS as available immediately — prevents .reveal opacity:0 flash
document.documentElement.classList.add('js');

/**
 * site.js
 * ─────────────────────────────────────────────────────────
 * Hariel Baiz · Portfolio
 *
 * Features:
 *   1. Theme toggle   (light ↔ dark)  — persisted to localStorage
 *   2. Language switcher scaffold     — data-i18n hooks, EN/ES strings
 *   3. Scroll reveal  (IntersectionObserver on .reveal)
 *   4. Reading progress bar           (case study pages)
 * ─────────────────────────────────────────────────────────
 */

/* ─────────────────────────────────────────────────────────
   1. THEME TOGGLE
   ─────────────────────────────────────────────────────────
   Writes data-theme="dark" | "light" on <html>.
   Falls back to OS preference, persists via localStorage.
───────────────────────────────────────────────────────── */
(function initTheme() {
  const stored = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
}

/* ─────────────────────────────────────────────────────────
   2. LANGUAGE SWITCHER
   ─────────────────────────────────────────────────────────
   Usage: add data-i18n="key" to any element.
   Call setLang('es') to switch to Spanish.
   Call setLang('en') to switch back to English.

   Keys follow BEM-ish dot notation: "section.key"

   IMPORTANT — this dictionary is the source of truth for
   every element that has a data-i18n attribute, on every
   page. setLang('en') runs on load (see init below), so the
   `en` value here always overwrites whatever text currently
   sits in the HTML. To change copy for a data-i18n'd element:
     1. Find the key on the element in the HTML (e.g. nav.brand)
     2. Update the value for that key below (both `en` and,
        once ready, `es`)
   Editing the HTML text alone will NOT stick — it gets
   overwritten by this dictionary on the next load.
   Only nav.brand/nav.linkedin-style keys used identically
   across all 6 pages belong here; body copy that's unique
   to one page (About bio, case study prose) is NOT wired to
   data-i18n and can be edited directly in its HTML file.
───────────────────────────────────────────────────────── */
const i18n = {
  en: {
    /* Nav — identical across all 6 pages */
    'nav.brand':    'H. Ariel Baiz',
    'nav.work':     'Work',
    'nav.about':    'About',
    'nav.resume':   'Resume',
    'resume.href':  'downloads/Hariel-Baiz-Resume-EN.pdf',
    'nav.contact':  'Contact',
    'nav.linkedin': 'LinkedIn',

    /* Landing — hero */
    'hero.cta.work':  'See my work',
    'hero.cta.about': 'About me',

    /* Landing — work section */
    'work.label': 'Featured Work',

    /* Card CTAs */
    'card.cta': 'Read Case Study',

    /* Landing — contact (em tag intentional, rendered via innerHTML) */
    'contact.title': "Let's work together",
    'contact.sub':   'Open to product design and design systems roles. Remote-friendly.',

    /* Footer */
    'footer.copy': '© 2026 H. Ariel Baiz · Senior Product Designer',

    /* Page titles */
    'meta.title.index': 'Hariel Baiz — Senior Product Designer',
    'meta.desc.index': "Ariel Baiz is a Senior Product Designer in Buenos Aires specializing in design systems and B2B SaaS UI. Case studies on design tokens, UX research, and AI-assisted design.",

    /* Landing — hero intro */
    'hero.intro': "Hi! I'm Ariel, a Senior Product Designer based in Buenos Aires. With 6+ years of experience, I specialize in design systems and high-quality UI for B2B SaaS products. I work closely with engineering and product, keeping systems consistent as products scale.",

    /* Landing — work cards: CS1 Design Tokens */
    'work.cs1.tag1': 'Design Systems',
    'work.cs1.tag2': 'Design Tokens',
    'work.cs1.tag3': 'Figma',
    'work.cs1.tag4': 'Design/Eng Alignment',
    'work.cs1.title': 'Design Token Adoption at Bitsight DS',
    'work.cs1.period': '2023-2024',
    'work.cs1.desc': "I led the adoption of design tokens at Bitsight, building a system spanning 160+ primitive variables and 100+ semantic tokens, shipping light and dark modes from a single source of truth and proving a color-blind mode was feasible as a proof of concept.",

    /* Landing — work cards: CS2 InfoSec Questionnaire */
    'work.cs2.tag1': 'Product Design',
    'work.cs2.tag2': 'User Research',
    'work.cs2.tag3': 'Design Systems',
    'work.cs2.tag4': 'B2B SaaS',
    'work.cs2.title': 'InfoSec Questionnaire Redesign',
    'work.cs2.period': '2023-2024',
    'work.cs2.desc': 'After Bitsight acquired ThirdPartyTrust, the questionnaire feature needed a new foundation. I led the UI redesign and research plan for a complex, high-stakes workflow.',

    /* Landing — work cards: CS3 Personas & IA */
    'work.cs3.lock': 'Password protected',
    'work.cs3.tag1': 'User Research',
    'work.cs3.tag2': 'Personas',
    'work.cs3.tag3': 'Information Architecture',
    'work.cs3.tag4': 'UX Strategy',
    'work.cs3.title': 'The Research That Split a Product in Two',
    'work.cs3.period': '2022-2023',
    'work.cs3.desc': 'I led the redesign of a platform split into two products following user research that showed two completely different user types were being forced into one shared UI.',

    /* Landing — work cards: CS4 Building With AI (coming soon) */
    'work.cs4.soon': 'Coming Soon',
    'work.cs4.tag1': 'AI Collaboration',
    'work.cs4.tag2': 'Claude',
    'work.cs4.tag3': 'GitHub',
    'work.cs4.tag4': 'Figma',
    'work.cs4.title': 'Building With AI',
    'work.cs4.period': '2026',
    'work.cs4.desc': "An overview of how I designed and built my portfolio, using Claude, GitHub, Visual Studio Code, and Figma as part of my new workflow.",

    /* About page */
    'meta.title.about': 'About — H. Ariel Baiz · Senior Product Designer',
    'meta.desc.about': "Senior Product Designer with 6+ years building B2B SaaS products, most recently at Bitsight. Background in graphic design, branding, and editorial design.",
    'about.quote.text': 'Have nothing in your houses that you do not know to be useful or believe to be beautiful.',
    'about.quote.moment': 'Arts and Crafts movement, 1880',
    'about.h1': "About Ariel Baiz, Senior Product Designer",
    'about.p1': "Hi! I'm Ariel, a product designer based in Buenos Aires with 6+ years building B2B SaaS tools, most recently at Bitsight, a cybersecurity company.",
    'about.p2': 'Before design, I trained as an electronics technician in high school, which is where I took my first steps in programming. I later studied Graphic Design at Universidad de Buenos Aires. Digital products turned out to be a mix of both: the structured, systems-thinking of electronics, and the direct, human side of building software people actually use.',
    'about.p3': 'I spent more than 10 years working in graphic design, specializing in branding and editorial design. That background is still the reason I care so much about type, rhythm, and hierarchy in product work.',
    'about.p4': "I currently live in Buenos Aires but lived for several years in San Martín de los Andes, in Argentine Patagonia, a place I consider my second home.",
    'about.skills.heading': 'Skills & Tools',
    'about.skills.subhead': 'Skills',
    'about.skills.item1': 'Design Systems',
    'about.skills.item2': 'Interaction Design',
    'about.skills.item4': 'User Research',
    'about.skills.item5': 'Graphic Design',
    'about.tools.subhead': 'Tools',

    /* Shared case-study footer link */
    'footer.back': 'Back to all work',

    /* ═══ Case Study 1 — Design Tokens ═══ */
    'meta.title.cs1': "Design Tokens Case Study — Hariel Baiz",
    'meta.desc.cs1': "Case study: how I led the adoption of a semantic design token system for Bitsight's design team, replacing duplicated manual work.",
    'cs1.hero.tag': 'Case Study · Design Systems',
    'cs1.hero.title': 'Design Token Adoption',
    'cs1.hero.chip6': 'Design Systems Lead',
    'cs1.idx.context': '01 — Context',
    'cs1.idx.problem': '02 — Problem',
    'cs1.idx.research': '03 — Research',
    'cs1.idx.system': '04 — System',
    'cs1.idx.outcomes': '05 — Outcomes',
    'cs1.idx.lessons': '06 — Lessons',
    'cs1.hero.sub': "At Bitsight, the design team worked from Figma styles, not tokens. The platform already had a light/dark toggle built, so designing a component meant designing it twice, once per theme. I led the adoption of a semantic token system that replaced that manual process, cutting design time per component by 40% and improving product consistency.",
    'cs1.facts.timelineLabel': 'Timeline',
    'cs1.facts.timelineValue': '2023-2024',
    'cs1.facts.roleLabel': 'My Role',
    'cs1.facts.roleValue': 'Design Systems Lead',
    'cs1.facts.deliverablesLabel': 'Deliverables',
    'cs1.facts.deliverablesValue': 'Token architecture, Figma variable library, naming convention documentation, updated components',
    'cs1.outcome.label1': '160+ primitive variables: raw values, no opinion attached',
    'cs1.outcome.label2': '100+ semantic tokens mapping meaning across the system',
    'cs1.outcome.label3': '2 modes shipped: light and dark. Color blind mode proven as a POC',
    'cs1.outcome.label4': '40% less time designing components per mode',
    'cs1.context.h2': 'A Figma announcement, a rebrand, and a window of opportunity',
    'cs1.context.p1': "In mid-2023, Figma announced Variables at their annual Config event. I watched the presentation and felt something click. This wasn't just a new feature. It was an answer to a problem I'd been sitting with for a long time. How do you make visual decisions consistent across a growing product without relying on manual discipline?",
    'cs1.context.callout1': '<em>The timing couldn\'t have been better.</em> Bitsight was undergoing a company-wide rebrand. Every product interface would need to reflect new visual standards across multiple platforms. Without a scalable solution, that rebrand risked becoming a slow, error-prone process that would stretch for months.',
    'cs1.context.p2': "I saw the rebrand as an opportunity to build the system underneath it properly, so the next rebrand, or the next acquisition, wouldn't cost us the same effort all over again.",
    'cs1.context.p3': 'I proposed starting with a proof of concept. <a href="case-study-infosec-questionnaire.html">The Questionnaire feature</a>, which I was already leading as a designer, became the first real test ground. It spanned both the VRM reviewer experience I owned and TMH, which I knew well from my earlier work on ThirdPartyTrust, making it a good test for a token system that needed to hold up across different teams. The POC worked, and I got the green light to bring it to the design system properly.',
    'cs1.problem.h2': 'The challenge of keeping consistency while everything changes',
    'cs1.problem.p1': "The product suite was growing through acquisitions and new features, but our visual foundation wasn't growing with it. Design worked from Figma styles, and that meant a system that didn't scale. Consistency was the product of a manual process that depended on designers' memory and attention.",
    'cs1.problem.p2': "The challenge was <strong>maintaining consistency while everything around it kept changing.</strong>",
    'cs1.problem.callout1': 'Products were added and acquired regularly. Legacy interfaces couldn\'t be replaced overnight. Visual updates were often driven by perception: "make it feel more modern." Changes needed to scale across many surfaces at once. <em>We needed a system that could absorb change, not resist it.</em>',
    'cs1.problem.p3': 'My goal became making updates cascade instead of rippling into chaos, and making consistency the default outcome, not the result of a manual review cycle.',
    'cs1.research.h2': 'Learning from what already existed',
    'cs1.research.p1': 'Before designing anything, I audited the existing style system and looked at how other teams had solved similar problems. That let me identify usage patterns, inconsistencies, and opportunities for improvement.',
    'cs1.research.p2': 'I also studied three design systems as reference points:',
    'cs1.research.card1': 'Their token naming structure, <code>foundation.property.modifier</code>, became the backbone of our semantic layer. It gave us a consistent, readable pattern that any designer or engineer could follow without a reference doc.',
    'cs1.research.card2': 'Their contextual token approach (tokens scoped to specific UI surfaces) influenced how we thought about namespacing contexts like <code>nav</code> or specific scales like <code>riskVector</code>. The <em>class</em> segment was inspired by this system.',
    'cs1.research.card3': 'Too large in nomenclature for our scale, but useful as a reference for how far a token system can go when the product demands it.',
    'cs1.research.p3': "All three were well-designed, but their scale and nomenclature often didn't fit Bitsight's context. When I tried mapping their structures directly onto our products, the cost of adapting them outweighed the benefit, so I kept what was useful from each.",
    'cs1.system.h2': 'The token architecture',
    'cs1.system.caption1': 'A semantic token references a primitive. The primitive holds the raw value, never consumed directly by components.',
    'cs1.system.p1': 'The system is built on two layers: <strong>Primitive</strong> tokens that hold raw values with no opinion, and <strong>Semantic</strong> tokens that carry meaning, context, and purpose. Every semantic token follows a naming convention, and that convention became the foundation of the system.',
    'cs1.system.card1title': 'Primitive',
    'cs1.system.card1p': "Raw values with no interpretation. These tokens name a value but don't assign it any meaning or context. They're the foundation everything else references, never consumed directly by components.",
    'cs1.system.card2title': 'Semantic',
    'cs1.system.card2p': 'Tokens with purpose and context. Every semantic token carries meaning, context, and purpose. These are the tokens components consume, and the ones designers use to build the interface.',
    'cs1.system.h3a': 'The naming convention:',
    'cs1.system.p2': "A design token's name describes how it should be used, and follows the same four-part structure. Any designer or engineer should be able to infer what a token does just by reading its name.",
    'cs1.system.caption2': 'The four-part naming convention: class · foundation · property · modifier.',
    'cs1.system.seg1label': '1 · Class',
    'cs1.system.seg1title': 'The context',
    'cs1.system.seg1p': "Groups tokens that belong to a specific UI context or product concept, whether that's the default design system, a navigation surface, or a scale like risk ratings.",
    'cs1.system.seg2label': '2 · Foundation',
    'cs1.system.seg2title': 'The visual attribute type',
    'cs1.system.seg2p': 'The type of visual design attribute the token controls, such as color, elevation, or space. It answers what kind of style the token belongs to.',
    'cs1.system.seg3label': '3 · Property',
    'cs1.system.seg3title': 'The UI element being styled',
    'cs1.system.seg3p': 'The UI element the token is applied to, such as a border, background, shadow, or other property. It shows what gets styled.',
    'cs1.system.seg4label': '4 · Modifier <span class="sd-optional-badge">optional</span>',
    'cs1.system.seg4title': 'The role, state, or emphasis',
    'cs1.system.seg4p': "Additional details about the token's purpose, like its color role, emphasis level, or interaction state. Not every token has a modifier. <code>color.text</code>, our default text color, doesn't need one.",
    'cs1.system.h3b': 'Token class:',
    'cs1.system.p3': "The <strong>class</strong> segment is the first part of every semantic token name. It signals which UI context the token belongs to. Not every context needs one, but when a context has its own styling rules, that's when it's worth isolating it in its own class. That prevents accidental overrides and keeps intent clear.",
    'cs1.system.ns1title': 'bs: the default',
    'cs1.system.ns1p': "The default namespace for all tokens. Everything that doesn't belong to a specific context lives here, things like typography, spacing, or core UI colors. Example: <code>bs.color.text.primary</code>.",
    'cs1.system.ns2title': 'Scales: riskVector, rating, finding',
    'cs1.system.ns2p': 'Domain-specific color systems for Bitsight\'s cybersecurity grades, risk scores, and security findings. Each one gets its own class. Example: <code>riskVector.color.background.gradeA</code>.',
    'cs1.system.ns3title': 'nav: the exception to mode switching',
    'cs1.system.ns3p': 'The nav bar doesn\'t switch between light and dark mode. Isolating it in its own class makes that behavior clear and prevents accidental overrides. Example: <code>nav.color.background.logo</code>.',
    'cs1.system.caption3': "Switching themes across token classes in Figma: the nav bar doesn't change between light and dark, while the rest of the interface does.",
    'cs1.system.quote1': 'Which color do I use for a Grade A? Before I had to check the spec every time. Now I just type <code>riskVector...</code> and the value is right there.',
    'cs1.system.quote1role': 'Designer',
    'cs1.system.quote1moment': 'On the rating scale tokens',
    'cs1.system.callout1': 'The <strong>class</strong> segment was the key decision. Rather than trying to make one universal token set cover everything, we accepted that some contexts, like our cybersecurity rating scales, were different and deserved their own namespace.',
    'cs1.system.h3c': 'Sizing tokens: changing personality without changing components',
    'cs1.system.p4': 'One of the most satisfying demos I ran for the team was showing what sizing tokens could do. Swap radius values, adjust density, change component height, and the entire product shifts its personality. Compact and sharp vs. spacious and soft. No component was redesigned. Only the tokens changed.',
    'cs1.system.caption4': "Swapping radius and density tokens shifts the product's visual personality. No components were rebuilt.",
    'cs1.system.h3d': 'Elevation tokens: a system that didn\'t exist before',
    'cs1.system.p5': 'Before the token system, elevation and surface had no documentation at all. Elevation was just a judgment call made component by component, with no shared reference and no rules.',
    'cs1.system.p6': 'Defining elevation tokens made us stop and actually decide what the system should be.',
    'cs1.system.h3e': 'Elevation tokens',
    'cs1.system.p7': 'The final system uses five tokens. Four surface levels cover the full range of depth in our UI. One blanket token handles the overlay state used by dialogs, drawers, and modals.',
    'cs1.system.caption5': 'Four surface levels cover the full range of depth in the UI.',
    'cs1.system.caption6': 'The blanket token handles the overlay state: dialogs, drawers, and modals.',
    'cs1.system.caption7': 'The complete elevation token set: name, value, and intended usage for each level.',
    'cs1.system.callout3': 'Having these tokens in place means that any new component that introduces depth only has to pick a level.',
    'cs1.outcomes.h2': 'Consistency that scales',
    'cs1.outcomes.p1': 'The token system shipped progressively, starting with color tokens, then spacing and typography. At launch it covered <strong>160+ primitive variables</strong> and <strong>100+ semantic tokens</strong>. The effect was visible immediately: updating a primitive value cascaded automatically to every semantic token that referenced it.',
    'cs1.outcomes.p2': 'What used to take days (designing two versions of every component for light and dark mode, hunting for the right hex value, manually keeping everything in sync) was reduced to minutes.',
    'cs1.outcomes.quote1': 'Wait, you just changed the mode and everything updated? I had to do this manually every time.',
    'cs1.outcomes.quote1role': 'Designer',
    'cs1.outcomes.quote1moment': 'First mode switch in a weekly design review',
    'cs1.outcomes.h3a': 'Before tokens: two components, one purpose',
    'cs1.outcomes.p3': 'Before the token system, supporting light and dark modes meant designing two separate versions of every component (two sets of colors, two frames). Every design change meant updating both components, and keeping them in sync was a manual, error-prone process.',
    'cs1.outcomes.p4': 'With tokens, that disappeared. Components referenced semantic tokens, and switching modes meant switching the token set, not rebuilding the component.',
    'cs1.outcomes.caption1': 'Before tokens: two separate component versions for light and dark. After: one component, one token switch.',
    'cs1.outcomes.h3b': 'Tokens and accessibility',
    'cs1.outcomes.p5': "One of the pain points in our product was the scale color system. Bitsight used red for the undesirable end of a risk or grade scale, and blue for the desirable end. After a rebrand, blue was replaced with green, closer to the red-to-green convention most people expect from a risk scale. That fixed one problem and created another. Red and green are one of the hardest combinations for color blind users to tell apart, which made it an accessibility problem.",
    'cs1.outcomes.p6': "As a fix, I proposed an alternative set of tokens for color blind mode. It was never implemented, but it proved switching modes needed no changes to components, only new tokens.",
    'cs1.outcomes.caption2': 'Color blind mode (proof of concept): same semantic tokens, an alternative primitive set of accessible colors.',
    'cs1.outcomes.callout1': 'This was a direct result of the token architecture. If colors had been hardcoded, adding an accessible mode would have required designing a new set of components for each scale. With tokens, all it took was one set of alternative primitive values.',
    'cs1.outcomes.h3c': 'The users were my teammates',
    'cs1.outcomes.p7': 'This project reminded me of the first design system I designed at ThirdPartyTrust. The users were my teammates, and me.',
    'cs1.outcomes.p8': 'I got to see the reactions in real time, in weekly syncs and in Figma comments. There\'s something different about designing a tool that makes your colleagues\' work easier, or seeing their face light up the first time they switch a mode and the whole interface updates in one click.',
    'cs1.outcomes.quote2': 'I used to search for the hex. Now I search for the meaning. I won\'t second-guess the right value for primary text again.',
    'cs1.outcomes.quote2role': 'Designer',
    'cs1.outcomes.quote2moment': 'Assigning a semantic token to a component for the first time',
    'cs1.lessons.h2': 'Lessons learned',
    'cs1.lessons.p2': 'Studying mature systems helps, but don\'t force their structure onto your own. Carbon, Material, and Atlassian were a good place to start, but I should have stayed open to changing the naming earlier. It took several iterations to land on a naming convention that worked for our context, and that delayed the project.',
    'cs1.lessons.p4': 'Our early conversations with the engineering team were open. They wanted the same consistency and alignment I did, and that willingness told me we were on the right track. I left Bitsight after a company-wide layoff, before the design system could close the gap with engineering\'s, so I can\'t include those results in this case study.',

    /* ═══ Case Study 2 — InfoSec Questionnaire ═══ */
    'meta.title.cs2': "InfoSec Questionnaire Redesign — Hariel Baiz",
    'meta.desc.cs2': "Case study: redesigning Bitsight's security review workflow after the ThirdPartyTrust acquisition. 100% task success in usability testing.",
    'cs2.hero.tag': 'Case Study · Product Design',
    'cs2.hero.title': 'Redesigning the questionnaire that decides vendor risk',
    'cs2.hero.chip4': 'Accessibility',
    'cs2.hero.chip6': 'Lead Designer',
    'cs2.idx.context': '01 — Context',
    'cs2.idx.problem': '02 — Problem',
    'cs2.idx.design': '03 — Design',
    'cs2.idx.research': '04 — Research',
    'cs2.idx.outcomes': '05 — Outcomes',
    'cs2.idx.lessons': '06 — Lessons',
    'cs2.hero.sub': "After Bitsight acquired ThirdPartyTrust, the questionnaire feature needed more than a visual refresh. It needed a new foundation. I led the UI redesign and research plan for a complex, high-stakes workflow used by security teams every day.",
    'cs2.facts.timelineLabel': 'Timeline',
    'cs2.facts.timelineValue': '2023-2024',
    'cs2.facts.roleLabel': 'My Role',
    'cs2.facts.roleValue': 'Senior Product Designer working across product strategy, research and design systems',
    'cs2.facts.deliverablesLabel': 'Deliverables',
    'cs2.facts.deliverablesValue': 'Questionnaire redesign, vertical action rail, scoring UI, PURE evaluation and usability test reports',
    'cs2.outcome.label1': '100% of task success rate in usability testing with existing users',
    'cs2.outcome.label2': '1 reusable component from the Questionnaire, shipped to Bitsight DS and ready for reuse across all Bitsight products',
    'cs2.outcome.label3': '5 question-level tools — review, bookmark, finding, messaging, notes — unified into one action rail as reusable DS components',
    'cs2.context.h2': 'A feature inherited from an acquisition',
    'cs2.context.p1': "In Q3 2022, Bitsight acquired ThirdPartyTrust, a vendor risk management platform with its own established product and user base. As part of the integration, the Questionnaires feature needed to be rebuilt inside Bitsight's product ecosystem: redesigned from scratch using the Bitsight Design System, with better accessibility, clearer usability, and feature parity with the original.",
    'cs2.context.p2': 'Questionnaires are central to how security teams manage vendor risk. They come in three forms: <strong>custom questionnaires</strong> built by the team for specific assessments, <strong>internal questionnaires</strong> used for scoping during vendor intake and reassessment cycles, and <strong>industry-standard templates</strong> like CAIQ v4, ISO 27001:2022, and SIG Core.',
    'cs2.context.callout1': "This wasn't a greenfield project. It was a <em>migration with real users watching.</em> The design had to earn trust from people who already had a workflow, muscle memory, and strong opinions about how the tool should behave.",
    'cs2.problem.h2': "Feature parity isn't enough: it has to be better",
    'cs2.problem.p1': "The original platform had been built using its own framework, before Bitsight's design system existed. Visual inconsistencies were everywhere, accessibility was not a priority, and some workflows required too many steps to accomplish basic tasks. At the same time, users had deep familiarity with the old interface. Every change needed a reason strong enough to justify the disruption.",
    'cs2.problem.p2': 'The challenge had three parts. First, <strong>align the interface</strong> with Bitsight\'s design system without losing the features users depended on. Second, <strong>improve usability and accessibility</strong> across a complex, multi-part workflow. Third, <strong>do it iteratively</strong>: delivering features in planned cycles while the product was already in use.',
    'cs2.problem.h3': 'What the redesign had to cover',
    'cs2.problem.feat1title': 'Question design',
    'cs2.problem.feat1p': 'Question + description, multiple answer types (select, multiselect, values), vendor comments, uploaded documents, audit trail of changes.',
    'cs2.problem.feat2title': 'Scoring &amp; progress',
    'cs2.problem.feat2p': 'Overall score calculated from answer and priority weighting. Progress tracking across the questionnaire lifecycle.',
    'cs2.problem.feat3title': 'Bitsight integrations',
    'cs2.problem.feat3p': 'Risk Vectors added to individual questions. Vulnerability Evidence added at the questionnaire level.',
    'cs2.problem.feat4title': 'Question tools',
    'cs2.problem.feat4p': 'Per-question tools: review (approve/flag), bookmark, finding creation, messaging with vendors, internal notes.',
    'cs2.design.h2': 'Iterating toward the right answer',
    'cs2.design.p1': 'The design process started with a complete inventory of the existing platform, followed by the first designs and user flows built on the Bitsight DS. Each iteration was scoped to a set of features that could be shipped independently, which meant making early decisions about what to finalize and what to keep flexible as we learned more.',
    'cs2.design.h3a': 'Feature inventory first',
    'cs2.design.p2': 'Before starting any new designs, I ran a complete inventory of the existing platform: every feature, every interaction state, every edge case. Because there was no formal documentation of the original product, this was essentially reverse engineering: mapping the live system from scratch to understand what the new design had to account for. It gave the team a shared map of what existed and revealed several features that had no clear home in the new layout.',
    'cs2.design.caption1': 'The existing ThirdPartyTrust questionnaire interface, captured during the feature inventory audit before the redesign began.',
    'cs2.design.h3b': 'Mapping the domain before the UI',
    'cs2.design.p3': "The feature inventory revealed something deeper than a list of things to build: the questionnaire had no clear conceptual model from the reviewer's perspective. Features had accumulated over years without a shared understanding of what objects reviewers were actually working <em>with</em>.",
    'cs2.design.p4': 'Before sketching any screens, I mapped the domain: identifying the core objects, their attributes, and the operations reviewers performed on them. The model came from a deduction of the old platform: what existed, what was missing, and what relationships the new system had to support.',
    'cs2.design.caption2': 'Domain-level object model deduced from the existing platform, mapping the core entities, attributes, and relationships the new design had to account for.',
    'cs2.design.p5': "The analysis surfaced one key insight: <strong>Question is the unit of work</strong>, not the Questionnaire. Reviewers think and act at the question level: they flag, approve, annotate, and download one question at a time. The Questionnaire is a container; the Question is where decisions happen. This single observation explained why the toolbar needed to be scoped to the question, not the page.",
    'cs2.design.caption3': "Six core objects from the reviewer's perspective. The Questionnaire is a container; the Question is the unit of work.",
    'cs2.design.p6': 'Three distinct objects handle communication per question: <strong>Finding</strong> (formal, visible to the vendor, permanent record), <strong>Message</strong> (async thread with the vendor, scoped to the question), and <strong>Internal Note</strong> (private to the review team, never shared). Keeping them separate was a deliberate design decision. The domain model also shaped how the research tasks were written: tasks like "go to vendor X → open questionnaire Y → flag question N → create a finding" trace the exact path through the object hierarchy, which is part of why participants navigated the test naturally.',
    'cs2.design.h3c': 'Question tools: the hardest interaction design problem',
    'cs2.design.p7': 'Each question in a questionnaire can have up to five independent tools associated with it: review (approve or flag), bookmark, finding creation, messaging, and internal notes. In the old platform, these were scattered and inconsistently placed. Users had to hunt for them.',
    'cs2.design.p8': 'I explored several layout approaches before landing on a solution. The key tension was between <strong>discoverability</strong> (making tools visible enough that users knew they existed) and <strong>density</strong> (keeping the question interface readable when dozens of questions are stacked in sequence).',
    'cs2.design.caption4': 'Three layout proposals for question-level tools. The vertical rail balanced visibility with density and became the foundation for the final design.',
    'cs2.design.callout1': 'The chosen solution, a vertical action rail anchored to each question, kept tools consistently reachable without competing with question content. <em>Actions are always in the same place, regardless of question length or answer type.</em>',
    'cs2.design.caption5': 'Before and after comparison of the questionnaire UI',
    'cs2.design.caption6': 'Tool rail scrolling behavior',
    'cs2.design.h3d': 'Surfacing the score without exposing the formula',
    'cs2.design.p9': "The scoring system calculated risk from three inputs: answer value, question priority, and category weight, combined into an overall score. The result was always visible, fixed in the questionnaire header. The challenge was legibility: reviewers couldn't link what they saw on screen back to those inputs. The score felt like a black box, not a signal.",
    'cs2.design.p10': 'The solution was to show everything related to the score in one unified visual, which let reviewers intuitively understand what was driving the number.',
    'cs2.design.p11': 'The score uses a five-state icon + color system (Good, Fair, Warn, Bad, and N/A) adopted from the Bitsight DS, which had moved from a color-only scale to icon + color. This improved accessibility and kept the feature visually consistent with the rest of the product. At the category and questionnaire level the score becomes numerical, paired with the same icon, so reviewers can compare categories at a glance.',
    'cs2.design.caption7': 'Score at question level (qualitative) vs. questionnaire level (numerical)',
    'cs2.research.h2': 'Two studies, two different angles',
    'cs2.research.p1': 'With the initial designs and user flows built on the Bitsight DS, I ran two research studies to validate the direction and surface friction before full delivery. The goal was to test with real users while also getting structured expert feedback early, catching issues at both ends of the process.',
    'cs2.research.study1label': 'Study 1 · Internal',
    'cs2.research.study1title': 'PURE Expert Evaluation',
    'cs2.research.study1p': "The ThirdPartyTrust workflows weren't familiar to Bitsight employees, so before testing with real users, we ran a structured heuristic review with internal stakeholders first. PURE (Practical Usability Rating by Experts) uses a defined set of criteria to surface usability issues before external testing, faster and cheaper than waiting for real users to find them.",
    'cs2.research.study2label': 'Study 2 · External',
    'cs2.research.study2title': 'Moderated Usability Test',
    'cs2.research.study2p': 'Sessions with existing users of the ThirdPartyTrust platform. Participants completed representative tasks using the new design and verbalized their reactions. Primary metrics: task success rate, time on task, error patterns, and qualitative feedback.',
    'cs2.research.h3': 'What we found',
    'cs2.research.p2': 'The usability test results were encouraging: participants completed all tasks successfully and responded positively to the new interface. One of the most common reactions was around the question tools: the actions were clearer and easier to reach than in the original product.',
    'cs2.research.insight1': '<strong>All tasks completed successfully.</strong> Existing users navigated the redesigned interface without significant errors. The general reaction was that actions felt "more clear and easy to use."',
    'cs2.research.insight2': '<strong>Bulk document download.</strong> Users needed to download all documents from a questionnaire at once, but the system required them to do it one by one, per question. A recurring and painful friction point.',
    'cs2.research.insight3': '<strong>Cross-category filtering.</strong> Categories were rendered client-side, which limited filtering to within each category. Users expected to filter across the full questionnaire, a structural constraint from engineering, not design.',
    'cs2.research.insight4': '<strong>User-built questionnaires.</strong> Users wanted to build questionnaires themselves. In the current state, questionnaires were created on demand by the Customer Success team, a bottleneck users found frustrating.',
    'cs2.research.quote1': 'Questionnaire info is more clear now',
    'cs2.research.quote1role': 'Usability test participant',
    'cs2.research.quote1moment': 'On the redesigned question layout',
    'cs2.research.quote2': 'We download the files question by question — we need to download all at once',
    'cs2.research.quote2role': 'Usability test participant',
    'cs2.research.quote2moment': 'On document download',
    'cs2.research.quote3': 'Filtering by categories is annoying',
    'cs2.research.quote3role': 'Usability test participant',
    'cs2.research.quote3moment': 'On cross-category filtering',
    'cs2.research.callout1': 'The last two pain points were highly requested, but low feasibility for engineering at that stage. They went into the backlog with clear rationale.',
    'cs2.research.caption1': 'Prioritization matrix showing impact versus feasibility',
    'cs2.outcomes.h2': 'A complex feature, delivered in pieces that held together',
    'cs2.outcomes.p1': 'The redesign shipped progressively across planned delivery cycles. Each iteration was tested or reviewed before the next began. Problems were caught early, not after everything was built.',
    'cs2.outcomes.h3a': 'Light and dark themes, ready at launch',
    'cs2.outcomes.p2': 'Because this project ran in parallel with the design token adoption work, the questionnaire became one of the first features to be fully tokenized. Every component in the redesign referenced semantic tokens, which meant both light and dark mode were supported from the start, with no separate design files and no duplication.',
    'cs2.outcomes.caption1': 'Light and dark mode, ready at launch. Both themes came with the token system decision, not as extra design work.',
    'cs2.outcomes.h3b': 'Collaboration with the vendor-side team',
    'cs2.outcomes.p3': 'The questionnaire feature has two sides: the reviewer experience (what security teams see) and the respondent experience (what vendors see). I was on the VRM team, responsible for the reviewer UI, and collaborated closely with the TMH team who owned the vendor-facing design. That collaboration worked as well as it did because I carried product context forward from the original ThirdPartyTrust platform, before the acquisition split reviewer and vendor experiences into two separate teams. Keeping both sides consistent required ongoing alignment: shared components, shared tokens, and regular cross-team reviews.',
    'cs2.outcomes.caption2': 'Categories panel in review mode and edit mode.',
    'cs2.outcomes.caption3': 'Question cards in review mode and edit mode.',
    'cs2.outcomes.h3c': 'Results',
    'cs2.outcomes.p4a': 'Two research studies, a complete feature redesign, and a set of reusable components were delivered.',
    'cs2.outcomes.p4b': 'The usability test validated the core direction: all tasks were completed successfully, and participants responded positively to the new tool layout.',
    'cs2.outcomes.p4c': 'The pain points surfaced in research were documented, triaged, and communicated to the product team with clear feasibility context.',
    'cs2.outcomes.caption4': 'The questionnaire redesign in action',
    'cs2.outcomes.caption5': 'Action sheets and dialogs for question management.',
    'cs2.outcomes.h3d': 'Validation in the wild',
    'cs2.outcomes.p5': "After all designs were delivered to production, the product team ran a pilot program with both new and existing customers during the platform's unification phase. Legacy customers accessed VRM Beta for a preview and feedback gathering. New customers enrolled directly in the VRM Beta Pilot Program.",
    'cs2.outcomes.pilot1': "Confirm Bitsight VRM's value proposition by asking users whether the product was delivering according to their expectations",
    'cs2.outcomes.pilot2': 'Test and learn for continuous improvement: gathering feedback on usability, functionality, and overall experience',
    'cs2.outcomes.pilot3': 'Continue promoting Bitsight VRM to new customers while existing customers remained on the legacy platform',
    'cs2.outcomes.quote1': 'We need flexibility to whom we can send the questionnaire…',
    'cs2.outcomes.quote1role': 'VRM Beta Pilot participant',
    'cs2.outcomes.quote1moment': 'On recipient flexibility',
    'cs2.outcomes.quote2': "You can use SAP Ariba or other TPRM products to send questionnaires easily but not necessarily create this kind of live experience… in real time you can start conversations, send messages to the supplier and cooperate having everything in one place",
    'cs2.outcomes.quote2role': 'VRM Beta Pilot participant',
    'cs2.outcomes.quote2moment': 'On real-time collaboration',
    'cs2.outcomes.quote3': "What's amazing is this ability to easily define requirements and create these conversations to follow up about the questions",
    'cs2.outcomes.quote3role': 'VRM Beta Pilot participant',
    'cs2.outcomes.quote3moment': 'On question-level messaging',
    'cs2.outcomes.callout1': "I didn't run the pilot program, but having that kind of feedback from a live platform, from real customers using the feature in production, was a meaningful signal that the design direction held up beyond the controlled conditions of usability testing.",
    'cs2.lessons.h3': 'What this project taught me',
    'cs2.lessons.p1': "I learned how expensive it is to work without documentation. Building the feature inventory meant reverse engineering the whole product from scratch, and that took real time I wouldn't have needed if documentation had existed from the start. Now I try to document as I go, even when nobody asks for it, so whoever picks up the work next doesn't have to start from zero.",
    'cs2.lessons.p2': "Running the PURE evaluation first caught structural issues before any user even saw the design. Then the usability test showed me what actually held up, plus friction I never would have caught on my own. Doing both made conversations about priorities with the product team so much easier, because I wasn't guessing which issues mattered most.",
    'cs2.lessons.p3': "Scope cuts change what you can honestly claim. The bigger review-time win was always tied to custom questionnaires and questionnaire-level filtering, letting reviewers build the exact set of questions a vendor needed and jump straight to what mattered instead of paging through everything in order. Both got scoped out of this phase, so the redesign improved review time without fully solving it. If I went back, I'd push harder to keep filtering in scope, since it's the piece closest to reviewers' actual bottleneck.",

    /* ═══ Case Study 3 — Personas & IA ═══ */
    'meta.title.cs3': "Personas & IA Redesign — Hariel Baiz",
    'meta.desc.cs3': "Case study: the UX research that led Bitsight to split ThirdPartyTrust into two products, and the navigation redesign that followed for VRM.",
    'cs3.gate.h2': 'This case study is password protected',
    'cs3.gate.p': 'Enter the password to view Personas &amp; Information Architecture.',
    'cs3.gate.placeholder': 'Password',
    'cs3.gate.btn': 'Unlock',
    'cs3.gate.error': 'Incorrect password. Try again.',
    'cs3.gate.hint': 'Don\'t have the password yet? Reach me out at <a href="mailto:hariel.baiz@gmail.com">hariel.baiz@gmail.com</a>',
    'cs3.hero.tag': 'Case Study · UX Research &amp; Strategy',
    'cs3.hero.title': 'The research that split a product in two',
    'cs3.hero.chip4': 'Affinity Diagramming',
    'cs3.hero.chip6': 'Lead Designer',
    'cs3.idx.context': '01 — Context',
    'cs3.idx.problem': '02 — Problem',
    'cs3.idx.research': '03 — Research',
    'cs3.idx.insights': '04 — Insights',
    'cs3.idx.feedback': '05 — Feedback Patterns',
    'cs3.idx.architecture': '06 — Architecture',
    'cs3.idx.lessons': '07 — Lessons',
    'cs3.hero.sub': 'ThirdPartyTrust served two completely different user types in one shared UI, and neither felt like it fit. I was part of the research that drove the decision to split it into two dedicated products, Bitsight VRM and TMH, then led the navigation and user flow redesign for VRM, the customer-facing side, working closely with the TMH team on the vendor side.',
    'cs3.facts.timelineLabel': 'Timeline',
    'cs3.facts.timelineValue': '2022-2024',
    'cs3.facts.roleLabel': 'My Role',
    'cs3.facts.roleValue': 'Senior Product Designer working across IA strategy, research and platform redesign',
    'cs3.facts.deliverablesLabel': 'Deliverables',
    'cs3.facts.deliverablesValue': 'User personas, information architecture, and product redesign for VRM, the customer-facing side of the platform',
    'cs3.outcome.label1': 'Separate products born from one shared UI — VRM and TMH',
    'cs3.outcome.label2': 'Flows redesigned after the product split — 3 shown in detail below',
    'cs3.outcome.label3': 'Research methods — interviews, affinity diagramming, usability studies',
    'cs3.outcome.label4': 'Support tickets on onboarding and core tasks, after the Pendo guides and clearer empty states shipped',
    'cs3.context.h2': 'A platform built without a design team',
    'cs3.context.p2': "When I joined ThirdPartyTrust, a third-party risk management (TPRM) platform, the UI had been designed entirely by engineers: there was no UX team, no research infrastructure, and no clear picture of who was actually using the product. Two completely different user types — <strong>customers</strong> (companies managing vendor risk) and <strong>vendors</strong> (companies being assessed) — were navigating the same interface, with the same navigation, even though their goals had almost nothing in common.",
    'cs3.context.callout1': 'The signal was already there: a high volume of support tickets, no support for free subscriptions, and no way to tell a usability problem from a missing feature. My job was to build the process to read that signal, and then act on it.',
    'cs3.context.p3': 'After Bitsight acquired ThirdPartyTrust in Q3 2021, the product split into two teams: VRM (Vendor Risk Management, the customer-facing side) and TMH (Trust Management Hub, the vendor-facing side). I landed exclusively on the VRM team, but kept working closely with TMH, since I already carried the product context from ThirdPartyTrust.',
    'cs3.problem.h2': 'Two users. One navigation. Zero clarity.',
    'cs3.problem.p1': "The platform's core problem wasn't any single broken feature. It was structural: customers and vendors were forced to share the same mental model of the product, even though they were there for completely different reasons.",
    'cs3.problem.card1title': 'Navigation confusion.',
    'cs3.problem.card1p': 'The top bar and left sidebar served both user types at once. Customers looking for their vendor list and vendors looking for their pending assessments landed in the same place — with no clear path forward.',
    'cs3.problem.card2title': 'No system feedback.',
    'cs3.problem.card2p': "Users couldn't tell if an action had succeeded. No confirmation after sending a questionnaire. Empty screens with no guidance on what to do next.",
    'cs3.problem.card3title': 'Invisible users.',
    'cs3.problem.card3p': 'Users without a subscription had no support channel. Their frustration generated support tickets through indirect channels, but without research, there was no way to distinguish a usability problem from a missing or poorly designed feature.',
    'cs3.research.h2': 'Understanding two different worlds',
    'cs3.research.p1': 'The research goal was exploratory: understand how each user type thought about their work, what they needed from the platform, and where the experience was breaking down. I used three methods, each chosen for a specific purpose.',
    'cs3.research.card1title': 'User interviews.',
    'cs3.research.card1p': 'To understand motivations, mental models, and day-to-day workflows. We talked to subscribed and unsubscribed users on both sides — customers and vendors. The goal was to hear how they described their own work before asking how the product fit into it.',
    'cs3.research.card2title': 'Affinity diagramming.',
    'cs3.research.card2p': "To synthesize observations from all participants and surface shared themes. We ran sessions that became a shared understanding across the product team. It later served as a reference for the VRM and TMH products, which were built from that same research.",
    'cs3.research.card3title': 'Usability studies.',
    'cs3.research.card3p': 'To validate the new IA after the product split decision was made. Testing whether users could navigate the new structure before committing to building it.',
    'cs3.research.h3a': 'The research team',
    'cs3.research.p2': "This wasn't something I did alone. We worked with 2 product designers, 2 product managers, and 5 customer success teammates to plan and run the interviews. Customer success in particular gave us direct access to users, since they were already talking to them every day. Subscribed users were the primary signal; unsubscribed users showed us where the experience was silently failing.",
    'cs3.research.caption1': 'Affinity diagram and Journey map — User research findings',
    'cs3.research.h3b': 'Two personas emerged',
    'cs3.research.p3': 'Out of the interviews and the affinity diagramming sessions, two personas emerged, one per side of the platform. They became the shared reference point for design decisions on both the VRM and TMH teams — proof that customers and vendors needed genuinely different products, not just different views of the same one.',
    'cs3.research.caption2': 'Sarah Chen and Tiago Ferreira — the customer-side and vendor-side personas that came out of this research.',
    'cs3.insights.h2': 'What the affinity diagram surfaced',
    'cs3.insights.p1': 'After clustering observations across all participants, five themes emerged consistently. Each one became a design principle for the new IA.',
    'cs3.insights.theme1': '<strong>Time.</strong> Users needed to jump between the Requirements tab, Data, and External Questionnaires just to review what a single vendor had submitted. Workflows had to be linear and fast, with no dead ends or unnecessary steps.',
    'cs3.insights.theme2': '<strong>Customization.</strong> Neither user type felt the platform was built for their context. Customers needed control over how their assessments were set up, like custom questionnaires; vendors needed control over their profile. Customization had to be a first-class concept.',
    'cs3.insights.theme3': '<strong>Collaboration.</strong> Both sides described their work as inherently cross-functional. Customers coordinated with internal security teams; vendors coordinated across legal, engineering, and finance. Contacts, roles, and delegation needed to be core objects in the navigation.',
    'cs3.insights.theme4': '<strong>Automation.</strong> Manual repetitive work was the biggest source of frustration on both sides: chasing vendors, tracking progress in spreadsheets, re-sending the same documents. Automation touchpoints needed to be integrated into primary flows, not optional add-ons.',
    'cs3.insights.theme5': "<strong>Navigation.</strong> Users didn't have clear workflows: a customer looking for their vendor list and a vendor looking for their active assessments shared sections. The platform lacked a conceptual model that matched how each user thought about their work, which is why the IA needed to be rebuilt around each user type.",
    'cs3.feedback.h2': 'A product that finally talks back',
    'cs3.feedback.p1': 'The "No system feedback" problem identified early on (section 02) had a simple root cause: there was no shared vocabulary for how the product talked back to users. Before any of the structural redesign work began, the very first patch shipped on ThirdPartyTrust was smaller: setting up Pendo guides for user onboarding. Those guides carried over when the platform moved to Bitsight and are still in use today.',
    'cs3.feedback.card1title': 'Before — ThirdPartyTrust',
    'cs3.feedback.card1p': "The platform didn't confirm whether a questionnaire had been submitted, empty states had no guidance on what to do next, and errors were reported without clarity. Users landed on the platform and didn't know what to do without reaching out for technical support.",
    'cs3.feedback.card2title': 'After — Bitsight DS feedback patterns',
    'cs3.feedback.card2p': 'Every screen accounts for the same four states: empty, loading, success, and error. Actions confirm whether they succeeded or not. Empty states point to the next step instead of leaving a blank screen.',
    'cs3.feedback.h3': 'Feedback patterns, standardized',
    'cs3.feedback.p2': "Bitsight DS already had a complete feedback pattern library — that wasn't the problem, the problem was inconsistent use. The solution was to build a checklist to confirm every new feature met those standards.",
    'cs3.feedback.p3': "Empty states guide users on what to do before there's any data, instead of showing a blank screen. Loading and progress states confirm an action is in motion. Success confirmations give a clear signal when something completes, like sending a questionnaire. Inline errors surface next to the field or action that caused them.",
    'cs3.feedback.caption1': 'The four-state checklist, kept close at hand on every project since.',
    'cs3.feedback.quote1': 'The empty states were really helpful — they made it clear what to do to complete the task.',
    'cs3.feedback.quote1role': 'PURE usability test participant',
    'cs3.feedback.quote1moment': 'On the redesigned empty states',
    'cs3.arch.h2': 'Objects first, not features',
    'cs3.arch.p1': "The research revealed something deeper than a usability problem. Customers and vendors weren't just different personas — they were operating with fundamentally different conceptual objects. Merging them in the same navigation was the root cause of the confusion. The IA decision followed directly from that: split the products, one for customers and one for vendors.",
    'cs3.arch.caption1': 'Core objects — Customers and Vendors',
    'cs3.arch.h3a': 'Before &amp; after',
    'cs3.arch.p2': 'ThirdPartyTrust used a dual navigation — a top bar for primary sections and a left sidebar for settings. The redesign moved to a single left sidebar per product, each organized around its own object model.',
    'cs3.arch.card1title': 'Before — ThirdPartyTrust',
    'cs3.arch.card1p': 'Top navigation bar + left sidebar. Both user types shared the same primary navigation. While they could access the same sections, a quick fix before the acquisition was to show and hide sections depending on user type.',
    'cs3.arch.card2title': 'After — Bitsight VRM + TMH',
    'cs3.arch.card2p': 'Two separate products. Each with a single left sidebar organized around its own core objects. Customers navigate Vendors, Assessments, and Findings. Vendors navigate Profile and Requests.',
    'cs3.arch.caption2': 'New information architecture — Before and After',
    'cs3.arch.p3': 'In the original interface, opening a vendor meant launching a full-screen dialog with its own internal tab bar (Tiering, Requirements, Data, and several more), besides being a misuse of the pattern itself, there was no URL-level "you are here." The redesign folded Vendor Profile into a single, unified left sidebar as a real section, each tab got its own URL: Overview, Tiering, Requirements, and the rest each became genuine nav destinations with persistent context, instead of tabs trapped inside a modal.',
    'cs3.arch.caption3': 'Vendor Profile moves from a full-screen dialog to a nested section inside a unified sidebar.',
    'cs3.arch.callout2': "Two things brought support ticket volume down: splitting the UI into two products meant customers and vendors were each looking at a navigation built around their own objects instead of someone else's, and the feedback patterns from the previous section meant that once they were there, the system actually told them what was happening instead of leaving them to guess.",
    'cs3.arch.h3b': 'The same object pattern, reused twice',
    'cs3.arch.p4': 'Once the products split, I was in charge of redesigning the navigation for 10+ workflows within VRM. I chose Security Profile and Requirements as examples because of their importance and the relationship between the two products, which required cross-team collaboration.',
    'cs3.arch.p5': "The two pages answer different questions. <strong>Security Profile</strong> shows everything a vendor has shared, published once to their Trust Management Hub profile and often not required by the customer. <strong>Requirements</strong> shows the specific checklist of artifacts a customer's risk program actually requires from that vendor.",
    'cs3.arch.h4a': 'Security Profile — what a vendor has shared',
    'cs3.arch.p6': 'On ThirdPartyTrust, a vendor\'s shared documentation didn\'t even live in one place for the reviewer. It was split across two separate sections, Assurance Program and Questionnaires, each with its own navigation and its own UI pattern: cards for Questionnaires and Certifications, tables for Insurance and Audits/Assessments, nothing looked consistent. The redesign merged both into a single Security Program section and collapsed all four object types into one card grid. The information got easier to scan for two reasons at once: it stopped pretending to be four different things, and it stopped being split across two pages.',
    'cs3.arch.caption4': 'Security Profile — four inconsistent card/table patterns become one unified card grid, one card per shared artifact, using the same chip style to flag severity or mark an item as required.',
    'cs3.arch.caption5': 'Security Profile — the redesign in action',
    'cs3.arch.quote1': 'It will be just much easier for us and the suppliers to have everything in one place.',
    'cs3.arch.quote1role': 'VRM customer',
    'cs3.arch.quote1moment': 'On the redesigned Security Profile',
    'cs3.arch.h4b': "Requirements — reviewer's view",
    'cs3.arch.p7': "The Requirements page had a serious problem: it lived inside a giant modal packed with tabs (Tiering, Data, External Questionnaires, and others), and the tab itself was read-only. It could only tell a reviewer what was required, not let them act on it. To actually review a questionnaire response or a piece of documentation, the reviewer had to leave the tab entirely, jump over to Data or External Questionnaires, do the review there, and come back, repeating that trip for every artifact in every requirement.",
    'cs3.arch.p8': 'The redesign made Requirements fully actionable. Documentation opens inline in a side sheet, without leaving the page. Questionnaires open in their own dedicated page instead, since their size doesn\'t work in a sheet, but reviewers get there directly from the requirement rather than hunting through Data or External Questionnaires first. Either way, review starts from the requirement itself, not from a separate tab. The accordion, the summary, and the per-artifact status all add to the simplicity of completing the task.',
    'cs3.arch.caption6': 'Requirements — from a read-only tab that sent reviewers back and forth to Data and External Questionnaires, to a fully actionable view with direct questionnaire access and inline document sheets.',
    'cs3.arch.caption7': 'Requirements — the redesign in action',
    'cs3.arch.quote2': "It's just much more efficient for us than reviewing requirements in one tool and the questionnaire responses in another, and having to make notes on the side to connect the two.",
    'cs3.arch.quote2role': 'VRM customer',
    'cs3.arch.quote2moment': 'On the redesigned Requirements review',
    'cs3.arch.aitag': 'Bonus · Hackathon Project',
    'cs3.arch.aititle': 'From questionnaire review to AI-powered SOC2 analysis',
    'cs3.arch.aip': "During this project, I joined an internal hackathon exploring generative AI within the Bitsight product. Manually reviewing a SOC2 Type II report could take hours, so we prototyped an agent that reads the report, extracts what matters, and summarizes it into actionable insights on its own. The real design problem wasn't the extraction, it was trust. Reviewers needed to see what the agent found, where in the report it came from, and how confident the system was, without redoing the analysis themselves to check its work. The prototype was compelling enough to become a real product, Instant Insights, inside the Vendor Risk Management application. Manual review dropped from hours to minutes.",
    'cs3.lessons.h2': 'What this project taught me',
    'cs3.lessons.p1': "Customer success teammates helped recruit and run our research sessions, but I mostly brought them in to execute, not to shape the questions. They talked to these users every day. Next time, I'd loop them in from the start, because I think we would have caught some of these insights faster.",
    'cs3.lessons.p2': "One of the most valuable moments of this project was the cross-team affinity session. Building the diagram together, instead of just handing off a report, is what turned research into a shared foundation everyone could point to. Those insights became the ground we built every new screen on, and having that clear a foundation from the start made the rest of the design work so much easier. Next time I'd run this kind of session earlier in the process, not only at the end.",
    'cs3.lessons.p3': "On ThirdPartyTrust, we'd already identified these pain points with the product team and started pushing for IA changes, but a backlog full of other priorities kept them from becoming real. Despite a few quick fixes we managed to ship, I felt some frustration watching a solution we knew was necessary go unlaunched. But the acquisition was already moving in the background. Once the integration with Bitsight opened the door for a full redesign, most of the research was already done, we just had to redesign and test the new flows.",

    /* ═══ Case Study 4 — Building With AI ═══ */
    'meta.title.cs4': "Building a Portfolio With AI — Hariel Baiz",
    'meta.desc.cs4': "How I used Claude as a collaborator to design, build, and publish this bilingual portfolio, from layout drafts to the GitHub release workflow.",
    'cs4.hero.tag': 'Case Study · AI-Assisted Design &amp; Development',
    'cs4.hero.title': 'I designed this portfolio. Claude helped me build it',
    'cs4.hero.chip1': 'AI Collaboration',
    'cs4.hero.chip2': 'Front-End',
    'cs4.hero.chip3': 'Design Systems',
    'cs4.hero.chip4': 'GitHub',
    'cs4.idx.context': '01 — Context',
    'cs4.idx.problem': '02 — Problem',
    'cs4.idx.workflow': '03 — Workflow',
    'cs4.idx.design': '04 — The Design System',
    'cs4.idx.outcomes': '05 — Outcomes',
    'cs4.idx.lessons': '06 — Lessons',
    'cs4.facts.timelineLabel': 'Timeline',
    'cs4.facts.timelineValue': '2026, ongoing',
    'cs4.facts.roleLabel': 'My Role',
    'cs4.facts.roleValue': 'Designer and product owner, directing an AI-assisted front-end build',
    'cs4.facts.deliverablesLabel': 'Deliverables',
    'cs4.facts.deliverablesValue': 'Landing page, 3 case studies, About page, bilingual site, responsive, with light/dark themes, published on GitHub Pages',
    'cs4.hero.sub': "I wanted this portfolio well designed, well built, and published by me, so I used Claude as a working partner to draft layouts, write code, and run the GitHub publish flow. The result: a live, bilingual portfolio with two themes (light/dark) and a versioned release history. This case study is about that process.",
    'cs4.context.h2': 'Designing and building the portfolio',
    'cs4.context.p1': "When I started this project, I had a job search to run and no front-end team to hand designs off to. Every other case study in this portfolio is about a product I designed while engineering built it. This one is different: for the first time, I'm also responsible for the code, the repo, and the deploy.",
    'cs4.context.p2': "I decided to start bringing AI into my workflow with Claude, giving it the design direction, the copy, the priorities, and the final call on what ships. Claude writes and edits the HTML, CSS, and JS at scale. And as a designer who can read and edit code, I direct that relationship without giving up ownership of the outcome.",
    'cs4.context.callout1': "This case study was drafted the same way the rest of the site was built. It went through the same back-and-forth between direction and execution, reviewed and adjusted before it shipped.",
    'cs4.problem.h2': 'The work begins after the first draft',
    'cs4.problem.p1': "Getting Claude to produce a working page is the easy part. The problem is everything that comes after the first draft. In each iteration I had to keep the visual system consistent across six pages built in separate sessions, catch copy that drifted from my actual voice, and get changes from my working files onto a live site without breaking it.",
    'cs4.problem.p3': "There was also the matter of keeping the design system in the repo synced with the one in Figma. Every token or component change in the code meant going back to Figma to mirror it, and that back-and-forth got slower as the site grew. I ended up solving it by replacing Figma with Claude Design and the <code>design.md</code> file.",
    'cs4.workflow.h2': 'The loop: draft, inspect, adjust, ship',
    'cs4.workflow.p1': "The workflow settled into a repeatable loop over several sessions. I'd describe the goal and constraints, review what Claude produced against the actual rendered page, make the calls only I could make, and only then treat a change as done.",
    'cs4.workflow.h3prompt': 'Prompting like writing a user story',
    'cs4.workflow.pprompt': "Prompting for Claude turned out to be close to writing a user story with acceptance criteria, something I've written for years working with engineering teams. I started using a loose version of the Ask, Requirements, Context, Examples framework. I'd state the ask plainly, list what has to stay consistent, name the existing pattern to match, and point to an example that already exists.",
    'cs4.workflow.h3a': 'Prototyping fast, testing in dev tools',
    'cs4.workflow.p2': "I used the browser's dev tools constantly. I inspected elements, looked up the actual CSS class names so I could ask for specific changes, nudged a padding or line-height value live to test what felt right before asking for the change to be made properly in the file, and checked dark mode and mobile breakpoints by hand.",
    'cs4.workflow.caption1': 'Testing spacing and color adjustments live in dev tools before committing to a value in the stylesheet.',
    'cs4.workflow.h3b': 'Taking the wheel in VS Code',
    'cs4.workflow.p3': "Some changes were faster and more precise to make directly in VS Code. I kept the repo open alongside the Claude sessions, so I could see and edit directly instead of describing a one-line change and waiting for it to come back. I also kept a few small code blocks on hand for dropping in a new image or moving a pull-quote. Claude handled the larger structural work and the audits, I handled the small fixes I could solve faster myself.",
    'cs4.workflow.caption2': 'A direct edit to a token value in VS Code, faster than a round trip through conversation for a one-line fix.',
    'cs4.workflow.h3c': 'One private repo, one public one',
    'cs4.workflow.p4': "I split the site into two repositories. A dev repo (private) handles day-to-day iteration, with a full commit history plus two reference files, <code>session-context.md</code> logging decisions session to session and <code>design.md</code> documenting the system. A live repo (public) only ever receives clean releases. To publish, I follow the same sequence every time. I copy the finished files (excluding those dev-only files) into the live repo, commit with a version message, tag it, and push.",
    'cs4.workflow.p5': "Keeping those two repos separate has a simple reason behind it. The dev repo's commit history let me trace changes, experiment freely, and keep anything covered by an NDA from ever ending up in a public commit. Every push to the live repo was something I'd already reviewed and versioned.",
    'cs4.workflow.caption3': 'Dev repo for iteration, live repo for deliberate, versioned releases. GitHub Pages serves the live repo on a custom domain.',
    'cs4.workflow.h3over': 'When Claude over-delivers',
    'cs4.workflow.pover': "Not every session followed the loop cleanly. Left with a loosely scoped request, Claude tends to generate something new: a fresh class where an existing token would already do, a component variant nobody asked for. The results reminded me of when I was a junior graphic designer, wanting to show off every trick I knew, when the better move is using just what's needed, less is more. Tightening the Ask and Requirements steps helped, but wasn't enough. After a few iterations, I improved the results by adding <code>design.md</code> as a reference, so Claude would check every existing token and pattern there instead of drifting session to session.",
    'cs4.ds.h2': "The design system's evolution: from Figma to CSS audited in production",
    'cs4.ds.p1': "I started the design system in Figma, the way I would in my usual design workflow, but this time connecting it to Claude through MCP. I'd given Claude a few reference sites and some instructions to generate the design system from scratch. The results weren't bad, but going from Figma to CSS meant every change needed a back-and-forth between the two to keep them in sync. That got slow and tedious. Partway through, I stopped going back to Figma for corrections. It was faster to test a change live in dev tools and edit the token or component's CSS directly.",
    'cs4.ds.p2': "For this new workflow, I needed a way to document the design system and keep it up to date. I used Claude Design, asked it to generate a design system from the repository, and it built one from scratch instantly, with great results. The problem was I didn't know how to connect it back to Claude, so I ran into the same issue again. The fix was generating <code>design.md</code> from that design system. Now every token and pattern is listed there and used by Claude as a reference, instead of re-explaining the system from scratch each session.",
    'cs4.audit.h3b': 'Auditing the CSS instead of guessing what was safe to delete',
    'cs4.audit.p3': "By the time the site had six pages, five stylesheets, and was ready to publish, I asked Claude to audit the repository for dead CSS.",
    'cs4.audit.p4': "The audit found that 151 of 281 classes in the site's CSS were unused, more than half. They weren't just orphaned classes either: some were variants of others, some were leftovers from components I'd tried and dropped, and some were styles that had been used once and later replaced by a token. The audit let me leave the CSS lighter and easier to maintain.",
    'cs4.audit.caption1': 'The categorized audit report, showing 151 dead classes out of 281 total.',
    'cs4.outcomes.h2': 'A live, versioned, bilingual portfolio I can keep iterating on',
    'cs4.outcomes.p1': "The site is live on a custom domain, built and maintained through the workflow described above. Every change I make goes through the review-and-publish loop, and every release is versioned on GitHub.",
    'cs4.outcomes.win1': "It's fully responsive, bilingual, and supports light and dark modes.",
    'cs4.outcomes.win2': "A full CSS audit removed 151 dead classes and cut the largest stylesheet by roughly a third.",
    'cs4.outcomes.win3': "A new dev-to-live publish flow with tagged releases, plus <code>session-context.md</code> and <code>design.md</code> tracking decisions on the dev side, means every version of the site is documented.",
    'cs4.lessons.h3': 'What this project taught me',
    'cs4.lessons.p1': "Adding AI to my workflow meant every design decision and code change had to go through my review and approval. My role shifted from creator/designer to more of an editor/director.",
    'cs4.lessons.p2': "Dev tools became a fast prototyping tool. Testing changes live and adjusting style values directly was faster and more precise than describing a change and waiting for Claude to get it right.",
    'cs4.lessons.p5': "The design system built in Claude Design and the <code>design.md</code> file became the main reference for Claude. Figma started fading into the workflow, I stopped using it as the source of truth, but I imagine I'll keep using it to explore new design concepts more freely, or to generate new assets.",
    'cs4.lessons.p6': "Generating a design system from scratch used to mean long hours setting up the foundation (defining grid values, writing every color variable in hex, tokens, hierarchies, and so on). With AI, all that heavy lifting gets skipped in minutes, with very good results.",
    'cs4.lessons.p9': "My next step would be exploring a real component library, something like Storybook, instead of <code>design.md</code>. I'd like to see if I can keep the same design consistency and improve execution speed, but with a more robust, documented component system.",
  },

  es: {
    /* Nav — identical across all 6 pages */
    'nav.brand':    'H. Ariel Baiz',
    'nav.work':     'Proyectos',
    'nav.about':    'Sobre mí',
    'nav.resume':   'CV',
    'resume.href':  'downloads/Hariel-Baiz-Resume-ES.pdf',
    'nav.contact':  'Contacto',
    'nav.linkedin': 'LinkedIn',

    /* Landing — hero */
    'hero.cta.work':  'Ver proyectos',
    'hero.cta.about': 'Sobre mí',

    /* Landing — work */
    'work.label': 'Proyectos',

    /* Card CTAs */
    'card.cta': 'Ver Case Study',

    /* Landing — contact (em tag intentional, rendered via innerHTML) */
    'contact.title': 'Trabajemos juntos',
    'contact.sub':   'Abierto a roles de diseño de producto y design systems. Trabajo remoto.',

    /* Footer */
    'footer.copy': '© 2026 H. Ariel Baiz · Diseñador de Producto Senior',

    /* Page titles */
    'meta.title.index': 'Hariel Baiz — Diseñador de Producto Senior',
    'meta.desc.index': "Ariel Baiz, Senior Product Designer en Buenos Aires. Diseño de sistemas y UI para SaaS B2B, con casos de estudio sobre design tokens y UX.",

    /* Landing — hero intro */
    'hero.intro': '¡Hola! Soy Ariel, Senior Product Designer de Buenos Aires. Con más de 6 años de experiencia, me especializo en design systems y UI de alta calidad para productos B2B SaaS. Trabajo de cerca con ingeniería y producto, manteniendo los sistemas consistentes a medida que estos crecen.',

    /* Landing — work cards: CS1 Design Tokens */
    'work.cs1.tag1': 'Design Systems',
    'work.cs1.tag2': 'Design Tokens',
    'work.cs1.tag3': 'Figma',
    'work.cs1.tag4': 'Alineación Diseño/Ing.',
    'work.cs1.title': 'Adopción de Design Tokens en Bitsight DS',
    'work.cs1.period': '2023-2024',
    'work.cs1.desc': 'Lideré la adopción de design tokens en Bitsight, construyendo un sistema con más de 160 variables primitivas y más de 100 tokens semánticos, con modo claro y oscuro en producción desde una única fuente de verdad, y probando la viabilidad de un modo para daltonismo como prueba de concepto.',

    /* Landing — work cards: CS2 InfoSec Questionnaire */
    'work.cs2.tag1': 'Product Design',
    'work.cs2.tag2': 'User Research',
    'work.cs2.tag3': 'Design Systems',
    'work.cs2.tag4': 'B2B SaaS',
    'work.cs2.title': 'Rediseño del cuestionario de InfoSec',
    'work.cs2.period': '2023-2024',
    'work.cs2.desc': 'Tras la adquisición de ThirdPartyTrust por parte de Bitsight, la funcionalidad de cuestionarios necesitaba una nueva base. Lideré el rediseño de la interfaz y el plan de investigación para un flujo complejo y de alto riesgo.',

    /* Landing — work cards: CS3 Personas & IA */
    'work.cs3.lock': 'Protegido con contraseña',
    'work.cs3.tag1': 'User Research',
    'work.cs3.tag2': 'Personas',
    'work.cs3.tag3': 'Arquitectura de Información',
    'work.cs3.tag4': 'Estrategia UX',
    'work.cs3.title': 'La investigación que dividió un producto en dos',
    'work.cs3.period': '2022-2023',
    'work.cs3.desc': 'Lideré el rediseño de una plataforma dividida en dos productos a partir de una investigación de usuarios que mostró que dos tipos de usuario completamente distintos estaban forzados a compartir una misma interfaz.',

    /* Landing — work cards: CS4 Building With AI (próximamente) */
    'work.cs4.soon': 'Próximamente',
    'work.cs4.tag1': 'Colaboración con IA',
    'work.cs4.tag2': 'Claude',
    'work.cs4.tag3': 'GitHub',
    'work.cs4.tag4': 'Figma',
    'work.cs4.title': 'Construyendo con IA',
    'work.cs4.period': '2026',
    'work.cs4.desc': 'Un repaso de cómo diseñé y construí este mismo portfolio, trabajando con Claude, GitHub, Visual Studio Code y Figma como nuevo flujo de trabajo.',

    /* About page */
    'meta.title.about': 'Sobre mí — H. Ariel Baiz · Diseñador de Producto Senior',
    'meta.desc.about': "Senior Product Designer con más de 6 años construyendo productos B2B SaaS, más recientemente en Bitsight. Formación en diseño gráfico, branding y diseño editorial.",
    'about.quote.text': 'No tengas nada en tu casa que no sepas que es útil o que no creas que es bello.',
    'about.quote.moment': 'Movimiento Arts and Crafts, 1880',
    'about.h1': 'Sobre Ariel Baiz, Senior Product Designer',
    'about.p1': 'Hola, soy Ariel, product designer en Buenos Aires con más de 6 años construyendo herramientas B2B SaaS, más recientemente en Bitsight, una empresa de ciberseguridad.',
    'about.p2': 'Antes del diseño, me formé como técnico en electrónica en la secundaria, donde di mis primeros pasos en programación. Después estudié Diseño Gráfico en la Universidad de Buenos Aires. Los productos digitales resultaron ser una mezcla de ambos mundos: el pensamiento estructurado y sistémico de la electrónica, y el lado directo y humano de construir software fácil de usar.',
    'about.p3': 'Pasé más de 10 años trabajando en diseño gráfico, especializándome en branding y diseño editorial. Ese background sigue siendo la razón por la que me importa tanto la tipografía, el ritmo y la jerarquía en el trabajo de producto.',
    'about.p4': 'Actualmente vivo en Buenos Aires pero viví varios años en San Martín de los Andes, en la Patagonia Argentina, lugar que considero mi segundo hogar.',
    'about.skills.heading': 'Habilidades y herramientas',
    'about.skills.subhead': 'Habilidades',
    'about.skills.item1': 'Design Systems',
    'about.skills.item2': 'Diseño de interacción',
    'about.skills.item4': 'User Research',
    'about.skills.item5': 'Diseño Gráfico',
    'about.tools.subhead': 'Herramientas',

    /* Shared case-study footer link */
    'footer.back': 'Volver a todos los proyectos',

    /* ═══ Case Study 1 — Design Tokens ═══ */
    'meta.title.cs1': 'Caso de Estudio: Design Tokens — Hariel Baiz',
    'meta.desc.cs1': "Caso de estudio: cómo lideré la adopción de un sistema semántico de design tokens para el equipo de diseño de Bitsight, eliminando trabajo manual duplicado.",
    'cs1.hero.tag': 'Case Study · Design Systems',
    'cs1.hero.title': 'Adoptando Design Tokens',
    'cs1.hero.chip6': 'Lead de Design Systems',
    'cs1.idx.context': '01 — Contexto',
    'cs1.idx.problem': '02 — Problema',
    'cs1.idx.research': '03 — Investigación',
    'cs1.idx.system': '04 — Sistema',
    'cs1.idx.outcomes': '05 — Resultados',
    'cs1.idx.lessons': '06 — Lecciones',
    'cs1.hero.sub': 'En Bitsight el equipo de diseño trabajaba con estilos de Figma, no con tokens. La plataforma ya tenía un toggle claro/oscuro desarrollado, por lo que cada diseño de componente significaba hacerlo por duplicado, uno por cada theme. Lideré la adopción de un sistema de tokens semánticos que reemplazó el proceso manual, reduciendo el tiempo de diseño por componente en un 40% y mejorando la consistencia del producto.',
    'cs1.facts.timelineLabel': 'Duración',
    'cs1.facts.timelineValue': '2023-2024',
    'cs1.facts.roleLabel': 'Mi rol',
    'cs1.facts.roleValue': 'Design Systems Lead',
    'cs1.facts.deliverablesLabel': 'Entregables',
    'cs1.facts.deliverablesValue': 'Arquitectura de tokens, librería de variables en Figma, documentación de la convención de nombres, componentes actualizados',
    'cs1.outcome.label1': '160+ variables primitivas: valores puros, sin ninguna interpretación asignada',
    'cs1.outcome.label2': '100+ tokens semánticos que mapean significado en todo el sistema',
    'cs1.outcome.label3': '2 modos implementados: claro y oscuro. El modo para daltonismo, probado como prueba de concepto',
    'cs1.outcome.label4': '40% menos tiempo diseñando componentes por modo',
    'cs1.context.h2': 'Un anuncio de Figma, un rebranding y una oportunidad',
    'cs1.context.p1': 'A mediados de 2023, Figma anunció Variables en su evento anual Config. Vi la presentación y algo hizo clic, no era simplemente una función nueva, era una respuesta a un problema que venía desde hace tiempo: ¿cómo hacer que las decisiones visuales sean consistentes en un producto que crece, sin depender del trabajo manual?',
    'cs1.context.callout1': '<em>El timing no pudo haber sido mejor.</em> Bitsight estaba atravesando un rebranding. Cada interfaz de producto iba a necesitar reflejar los nuevos estándares visuales en múltiples plataformas. Sin una solución escalable, ese rebranding corría el riesgo de convertirse en un proceso lento y propenso a errores que se estiraría durante meses.',
    'cs1.context.p2': 'Vi el rebranding como una oportunidad para construir bien el sistema base, para que en próximos rebranding o adquisiciones, no nos cueste el mismo esfuerzo otra vez.',
    'cs1.context.p3': 'Propuse arrancar con una POC. <a href="case-study-infosec-questionnaire.html">La feature de Cuestionarios</a>, que ya estaba liderando como diseñador, se convirtió en el primer campo de prueba real. Abarcaba tanto la experiencia dentro del producto VRM (Vendor Risk Management) que tenía a cargo, como en TMH (Trust Management Trust), que conocía bien por mi trabajo anterior en ThirdPartyTrust, lo que la convertía en una buena prueba para un sistema de tokens que debía funcionar entre diferentes equipos. La prueba funcionó y me dieron luz verde para llevarlo al design system de forma definitiva.',
    'cs1.problem.h2': 'El desafío de mantener la consistencia mientras todo cambia',
    'cs1.problem.p1': 'La suite de productos crecía a través de adquisiciones y nuevas funcionalidades, pero nuestra base visual no crecía con ella. Diseño trabajaba con estilos de Figma, y eso significaba tener un sistema no escalable. La consistencia era el fruto de un proceso manual que dependía de la memoria y la atención de los diseñadores.',
    'cs1.problem.p2': 'El desafío era <strong>mantener la consistencia mientras todo a su alrededor seguía cambiando.</strong>',
    'cs1.problem.callout1': 'Se sumaban y adquirían productos de forma regular. Las interfaces heredadas no se podían reemplazar de la noche a la mañana, los cambios necesitaban escalar en muchas superficies a la vez. <em>Necesitábamos un sistema que soporte el cambio, no que lo resista.</em>',
    'cs1.problem.p3': 'Mi objetivo se convirtió en hacer que las actualizaciones se propagaran en cascada en lugar de generar caos y que la consistencia fuera el resultado por defecto, no el fruto de un ciclo de revisión manual.',
    'cs1.research.h2': 'Aprender de lo que ya existía',
    'cs1.research.p1': 'Antes de diseñar audité el sistema de estilos existente y estudié cómo otros equipos habían resuelto problemas similares. Esto me permitió identificar patrones de uso, inconsistencias y oportunidades de mejora.',
    'cs1.research.p2': 'También estudié tres design systems como puntos de referencia:',
    'cs1.research.card1': 'Su estructura de nombres de tokens, <code>foundation.property.modifier</code>, se convirtió en la base de nuestra capa semántica. Nos dio un patrón consistente y legible que cualquier diseñador o ingeniero podía seguir sin necesitar un documento de referencia.',
    'cs1.research.card2': 'Su enfoque de tokens contextuales (tokens de secciones específicas de la interfaz) influyó en cómo pensamos los nombres de contextos como <code>nav</code> o escalas específicas como <code>riskVector</code>. El segmento <em>class</em> se inspiró en este sistema.',
    'cs1.research.card3': 'Demasiado grande en nomenclatura para nuestra escala, pero útil como referencia de hasta dónde puede llegar un sistema de tokens cuando el producto lo exige.',
    'cs1.research.p3': 'Los tres estaban bien diseñados, pero su escala y nomenclatura muchas veces no se ajustaban al contexto de Bitsight. Cuando intenté trasladar sus estructuras directamente a nuestros productos, el costo de adaptarlas superaba el beneficio, por lo que me quedé con lo útil de cada uno.',
    'cs1.system.h2': 'La arquitectura de tokens',
    'cs1.system.caption1': 'Un token semántico referencia a un primitivo. El primitivo guarda el valor puro y nunca es consumido directamente por los componentes.',
    'cs1.system.p1': 'El sistema está construido sobre dos capas: tokens <strong>Primitivos</strong>, que guardan valores puros sin ninguna interpretación, y tokens <strong>Semánticos</strong>, que transmiten significado, contexto y propósito. Cada token semántico sigue una convención de nombres, y esa convención se convirtió en la base del sistema.',
    'cs1.system.card1title': 'Primitivo',
    'cs1.system.card1p': 'Valores puros sin ninguna interpretación. Estos tokens nombran un valor pero no le asignan ningún significado ni contexto. Son la base que referencia todo lo demás, y nunca son consumidos directamente por los componentes.',
    'cs1.system.card2title': 'Semántico',
    'cs1.system.card2p': 'Tokens con propósito y contexto. Cada token semántico transmite significado, contexto y propósito. Son los que consumen los componentes y los que los diseñadores usan para construir la interfaz.',
    'cs1.system.h3a': 'La convención de nombres:',
    'cs1.system.p2': 'El nombre de un design token describe cómo debe usarse, y sigue la misma estructura de cuatro partes. Cualquier diseñador o ingeniero debería poder inferir que hace un token con solo leer su nombre.',
    'cs1.system.caption2': 'La convención de nombres de cuatro partes: class · foundation · property · modifier.',
    'cs1.system.seg1label': '1 · Class',
    'cs1.system.seg1title': 'El contexto',
    'cs1.system.seg1p': 'Agrupa tokens que pertenecen a un contexto de interfaz o concepto de producto específico. Class deja en claro dónde impacta el token: si en el design system por defecto, en una sección de navegación o en una escala de algún indicador como los ratings de riesgo.',
    'cs1.system.seg2label': '2 · Foundation',
    'cs1.system.seg2title': 'El tipo de atributo visual',
    'cs1.system.seg2p': 'El tipo de atributo de diseño visual que controla el token, como color, elevación o espaciado. Responde a qué tipo de estilo pertenece el token.',
    'cs1.system.seg3label': '3 · Property',
    'cs1.system.seg3title': 'El elemento de la interfaz',
    'cs1.system.seg3p': 'El elemento de la interfaz al que se aplica el token, como un borde, fondo, sombra u otra propiedad. Muestran qué se estiliza.',
    'cs1.system.seg4label': '4 · Modifier <span class="sd-optional-badge">opcional</span>',
    'cs1.system.seg4title': 'El rol, estado o énfasis',
    'cs1.system.seg4p': 'Detalles adicionales sobre el propósito del token: su rol de color, nivel de énfasis o estado de interacción. No todos los tokens tienen un modifier. Por ejemplo, <code>color.text</code> es nuestro color de texto por defecto, no necesita modifier.',
    'cs1.system.h3b': 'Token class:',
    'cs1.system.p3': 'El segmento <strong>class</strong> es la primera parte de cada nombre de token semántico. Indica a qué contexto de la interfaz pertenece el token. No todos los contextos necesitan una, pero cuando un contexto tiene reglas de estilo propias, es cuando conviene aislarlo en su propia class. Esto evita sobrescrituras accidentales y hace que la intención sea clara.',
    'cs1.system.ns1title': 'bs: el default',
    'cs1.system.ns1p': 'El nombre por defecto para todos los tokens. Todo lo que no pertenece a un contexto específico vive acá: tipografía, espaciado, colores centrales de la interfaz. Ejemplo: <code>bs.color.text.primary</code>.',
    'cs1.system.ns2title': 'Escalas: riskVector, rating, finding',
    'cs1.system.ns2p': 'Sistemas de color específicos para los cybersecurity grades, risk scores y security findings de Bitsight. Cada uno tiene su propia class. Ejemplo: <code>riskVector.color.background.gradeA</code>.',
    'cs1.system.ns3title': 'nav: la excepción al cambio de modo',
    'cs1.system.ns3p': 'La barra de navegación no cambia entre modo light y dark. Aislarla en su propia class deja ese comportamiento claro y evita sobrescrituras accidentales. Ejemplo: <code>nav.color.background.logo</code>.',
    'cs1.system.caption3': 'Cambiando de themes entre clases de tokens en Figma: la barra de navegación no cambia entre light y dark, mientras que el resto de la interfaz sí.',
    'cs1.system.quote1': '¿Qué color uso para un Grade A? Antes tenía que revisar el spec cada vez. Ahora solo escribo <code>riskVector...</code> y el valor está ahí.',
    'cs1.system.quote1role': 'Diseñador/a',
    'cs1.system.quote1moment': 'Sobre los tokens de la escala de ratings',
    'cs1.system.callout1': 'El segmento <strong>class</strong> fue la decisión clave. En lugar de intentar que un único conjunto universal de tokens cubriera todo, aceptamos que algunos contextos, como las escalas de rating de ciberseguridad, eran distintas y merecían su propio namespace.',
    'cs1.system.h3c': 'Tokens de tamaño: cambiar la personalidad sin cambiar los componentes',
    'cs1.system.p4': 'Una de las demos más satisfactorias que hice para el equipo fue mostrar lo que podían lograr los tokens de tamaño. Cambiar valores de radius, ajustar el espaciado, modificar la altura de un componente, hace que el producto cambie de personalidad al cambiar los tokens, sin rediseñar el componente.',
    'cs1.system.caption4': 'Cambiar los tokens de radius y espaciado transforma la personalidad visual del producto sin reconstruir el componente.',
    'cs1.system.h3d': 'Tokens de elevación: un sistema que no existía',
    'cs1.system.p5': 'Antes del sistema de tokens, la elevación y superficie no tenían documentación de ningún tipo. La elevación era simplemente una decisión de criterio tomada componente por componente, sin referencia compartida y sin reglas.',
    'cs1.system.p6': 'Definir los tokens de elevación nos hizo detenernos y decidir realmente como debía ser el sistema.',
    'cs1.system.h3e': 'Tokens de elevación',
    'cs1.system.p7': 'El sistema final usa cinco tokens. Hay cuatro niveles de superficie que cubren todo el rango de profundidad de la interfaz. Un token "blanket" maneja el estado de overlay usado por diálogos, drawers y modales.',
    'cs1.system.caption5': 'Cuatro niveles de superficie cubren todo el rango de profundidad de la interfaz.',
    'cs1.system.caption6': 'El token blanket maneja el estado de overlay: diálogos, drawers y modales.',
    'cs1.system.caption7': 'El set completo de tokens de elevación: nombre, valor y uso previsto para cada nivel.',
    'cs1.system.callout3': 'Tener estos tokens disponibles significa que cualquier componente nuevo que introduzca profundidad solo tiene que eligir un nivel.',
    'cs1.outcomes.h2': 'Consistencia que escala',
    'cs1.outcomes.p1': 'El sistema de tokens se lanzó de forma progresiva, empezando por los tokens de color, después espaciado y tipografía. Al lanzarse cubría <strong>más de 160 variables primitivas</strong> y <strong>más de 100 tokens semánticos</strong>. El efecto era visible de inmediato: actualizar un valor primitivo se propagaba automáticamente a cada token semántico que lo referenciaba.',
    'cs1.outcomes.p2': 'Lo que antes llevaba días (diseñar dos versiones de cada componente para modo light y dark, buscar el valor hexadecimal correcto, mantener todo sincronizado manualmente) se redujo a minutos.',
    'cs1.outcomes.quote1': 'Esperá... ¿cambiaste el modo y se actualizó todo? Estos cambios los tenía que hacer manualmente.',
    'cs1.outcomes.quote1role': 'Diseñador/a',
    'cs1.outcomes.quote1moment': 'Primer cambio de modo en una revisión de diseño semanal',
    'cs1.outcomes.h3a': 'Antes de los tokens: dos componentes, un mismo propósito',
    'cs1.outcomes.p3': 'Antes del sistema de tokens, soportar modo light y dark significaba diseñar dos versiones separadas de cada componente (dos sets de color en dos frames). Cada cambio de diseño requería actualizar ambos componentes, y mantenerlos sincronizados era un proceso manual y propenso a errores.',
    'cs1.outcomes.p4': 'Con los tokens, eso desapareció. Los componentes referenciaban tokens semánticos, cambiar de modo significaba cambiar el set de tokens, no reconstruir el componente.',
    'cs1.outcomes.caption1': 'Antes de los tokens: dos versiones separadas de componente para light y dark. Después: un componente, un cambio de token.',
    'cs1.outcomes.h3b': 'Tokens y accesibilidad',
    'cs1.outcomes.p5': 'Uno de los pain points de nuestro producto era el sistema de color de las escalas. Bitsight usaba rojo para el extremo no deseable de una escala de riesgo o de grado, y azul para el extremo deseable. Después de un rebranding, el azul pasó a verde, más cerca de la convención rojo-verde que la mayoría espera en una escala de riesgo. Eso resolvió un problema y generó otro, el rojo y el verde son una de las combinaciones más difíciles de distinguir para usuarios con daltonismo, por lo que se volvió un problema de accesibilidad.',
    'cs1.outcomes.p6': 'Como solución propuse un set alternativo de tokens para daltonismo. No se llegó a implementar, pero demostró que cambiar de modo no requería tocar ningún componente, solo había que generar tokens nuevos.',
    'cs1.outcomes.caption2': 'Modo para daltonismo (prueba de concepto): los mismos tokens semánticos, un set primitivo alternativo de color accesibles.',
    'cs1.outcomes.callout1': 'Esto fue un resultado directo de la arquitectura de tokens. Si los colores hubieran estado hardcodeados, agregar un modo accesible habría requerido diseñar un nuevo set de componentes para cada escala. Con los tokens, solo se necesitó un set de valores primitivos alternativos.',
    'cs1.outcomes.h3c': 'Los usuarios fueron mis compañeros de equipo',
    'cs1.outcomes.p7': 'Este proyecto me recordó al primer design system que diseñé en ThirdPartyTrust, ya que los usuarios fueron mis compañeros de equipo y yo mismo.',
    'cs1.outcomes.p8': 'Pude ver las reacciones en tiempo real, en los syncs semanales y en los comentarios de Figma. Hay algo distinto en diseñar una herramienta que les facilita el trabajo a tus colegas, o ver cómo se les dibuja una sonrisa la primera vez que cambian de modo y toda la interfaz se actualiza con un solo clic.',
    'cs1.outcomes.quote2': 'Antes buscaba el hex. Ahora busco el significado. Ya no voy a dudar sobre el valor correcto del texto primario.',
    'cs1.outcomes.quote2role': 'Diseñador/a',
    'cs1.outcomes.quote2moment': 'Asignando un token semántico a un componente por primera vez',
    'cs1.lessons.h2': 'Lecciones aprendidas',
    'cs1.lessons.p2': 'Estudiar sistemas maduros está bien, pero sin forzar su estructura sobre la propia. Carbon, Material y Atlassian fue un buen lugar para empezar pero tendría que haberme mantenido abierto a cambiar la nomenclatura desde el principio. Pasaron varias iteraciones hasta encontrar la convención de nombres que funcionara para nuestro contexto, y eso retrasó el proyecto.',
    'cs1.lessons.p4': 'Nuestras primeras conversaciones con el equipo de ingeniería fueron abiertas: ellos buscaban la misma consistencia y alineamiento, y esa predisposición me indicó que iba por el camino correcto. Dejé Bitsight después de un despido masivo en toda la empresa, antes de que el sistema de diseño pudiera cerrar la brecha con el de ingeniería, por lo que no puedo incluir esos resultados en este caso de estudio.',

    /* ═══ Case Study 2 — InfoSec Questionnaire ═══ */
    'meta.title.cs2': 'Rediseño de Cuestionario InfoSec — Hariel Baiz',
    'meta.desc.cs2': "Caso de estudio: rediseño del flujo de revisión de seguridad de Bitsight tras la adquisición de ThirdPartyTrust. 100% de éxito en tests de usabilidad.",
    'cs2.hero.tag': 'Case Study · Product Design',
    'cs2.hero.title': 'Rediseñando el cuestionario que decide el riesgo de un proveedor',
    'cs2.hero.chip4': 'Accesibilidad',
    'cs2.hero.chip6': 'Diseñador Lead',
    'cs2.idx.context': '01 — Contexto',
    'cs2.idx.problem': '02 — Problema',
    'cs2.idx.design': '03 — Diseño',
    'cs2.idx.research': '04 — Investigación',
    'cs2.idx.outcomes': '05 — Resultados',
    'cs2.idx.lessons': '06 — Lecciones',
    'cs2.hero.sub': 'Después de que Bitsight adquiriera ThirdPartyTrust, la funcionalidad de cuestionarios necesitaba más que un refresh visual. Necesitaba una base nueva. Lideré el rediseño de la interfaz y el plan de research para un flujo complejo y de alto riesgo, usado a diario por equipos de ciberseguridad.',
    'cs2.facts.timelineLabel': 'Duración',
    'cs2.facts.timelineValue': '2023-2024',
    'cs2.facts.roleLabel': 'Mi rol',
    'cs2.facts.roleValue': 'Senior Product Designer trabajando en estrategia de producto, investigación y design systems',
    'cs2.facts.deliverablesLabel': 'Entregables',
    'cs2.facts.deliverablesValue': 'Rediseño del cuestionario, riel de acciones vertical, sistema de scoring, informes de evaluación PURE y test de usabilidad',
    'cs2.outcome.label1': '100% de tasa de éxito en tareas durante testing de usabilidad con usuarios existentes',
    'cs2.outcome.label2': '1 componente reutilizable del Questionnaire, habilitado para el DS de Bitsight y listo para reutilizar en todos los productos de Bitsight',
    'cs2.outcome.label3': '5 herramientas a nivel de pregunta — revisión, marcador, finding, mensajería, notas — unificadas en un riel de acciones como componentes reutilizables del DS',
    'cs2.context.h2': 'Una funcionalidad heredada de una adquisición',
    'cs2.context.p1': 'En el tercer trimestre de 2022, Bitsight adquirió ThirdPartyTrust, una plataforma de gestión de riesgo de proveedores con producto y base de usuarios propios y establecidos. Como parte de la integración, la funcionalidad de Cuestionarios necesitaba reconstruirse dentro del ecosistema de producto de Bitsight: rediseñada desde cero usando el Bitsight Design System, con mejor accesibilidad, usabilidad más clara y paridad de funcionalidades con la original.',
    'cs2.context.p2': 'Los cuestionarios son centrales en cómo los equipos de seguridad gestionan el riesgo de proveedores. Vienen en tres formas: <strong>cuestionarios personalizados</strong> creados por el equipo para evaluaciones específicas, <strong>cuestionarios internos</strong> usados para el scoping durante el alta y los ciclos de reevaluación de proveedores y <strong>plantillas estándar de la industria</strong> como CAIQ v4, ISO 27001:2022 y SIG Core.',
    'cs2.context.callout1': 'No era un proyecto desde cero. Era una <em>migración con usuarios reales.</em> El diseño tenía que ganarse la confianza de gente que ya tenía un flujo de trabajo, memoria muscular y opiniones fuertes sobre cómo debía comportarse la herramienta.',
    'cs2.problem.h2': 'La paridad de funcionalidades no alcanza: tiene que ser mejor',
    'cs2.problem.p1': 'La plataforma original se había construido con su propio framework, antes de que existiera un design system. Las inconsistencias visuales estaban en todos lados, la accesibilidad no era una prioridad, y algunos flujos requerían demasiados pasos para completar tareas básicas. Al mismo tiempo, los usuarios tenían un conocimiento profundo de la interfaz vieja. Cada cambio necesitaba una razón lo suficientemente fuerte como para justificar la disrupción.',
    'cs2.problem.p2': 'El desafío tenía tres partes. Primero, <strong>alinear la interfaz</strong> con el design system de Bitsight sin perder las funcionalidades de las que dependían los usuarios. Segundo, <strong>mejorar la usabilidad y accesibilidad</strong> en un flujo complejo y de múltiples partes. Tercero, <strong>hacerlo de forma iterativa</strong>: entregando funcionalidades en ciclos planificados mientras el producto ya estaba en uso.',
    'cs2.problem.h3': 'Lo que el rediseño tenía que cubrir',
    'cs2.problem.feat1title': 'Diseño de preguntas',
    'cs2.problem.feat1p': 'Pregunta + descripción, múltiples tipos de respuesta (select, multiselect, valores), comentarios de proveedores, documentos subidos, historial de auditoría de cambios.',
    'cs2.problem.feat2title': 'Puntaje y progreso',
    'cs2.problem.feat2p': 'Puntaje general calculado a partir de la respuesta y la ponderación de prioridad. Seguimiento de progreso a lo largo del ciclo de vida del cuestionario.',
    'cs2.problem.feat3title': 'Integraciones de Bitsight',
    'cs2.problem.feat3p': 'Risk Vectors agregados a preguntas individuales. Vulnerability Evidence agregado a nivel del cuestionario.',
    'cs2.problem.feat4title': 'Herramientas por pregunta',
    'cs2.problem.feat4p': 'Herramientas por pregunta: revisión (aprobar/marcar), guardar, creación de findings, mensajería con proveedores, notas internas.',
    'cs2.design.h2': 'Iterando hacia la respuesta correcta',
    'cs2.design.p1': 'El proceso de diseño arrancó con un inventario completo de la plataforma existente, seguido de los primeros diseños y flujos de usuario. Cada iteración se acotó a un conjunto de funcionalidades que se podían entregar de forma independiente, lo que significó tomar decisiones tempranas sobre qué cerrar y qué mantener flexible a medida que aprendíamos más.',
    'cs2.design.h3a': 'Primero, el inventario de funcionalidades',
    'cs2.design.p2': 'Antes de empezar cualquier diseño nuevo, hice un inventario completo de la plataforma existente: cada funcionalidad, cada estado de interacción, cada edge case. Como no había documentación formal del producto original, esto fue esencialmente ingeniería inversa: mapear el sistema desde cero para entender qué tenía que contemplar el nuevo diseño. Le dio al equipo un mapa compartido de lo que existía y reveló varias funcionalidades que no tenían un lugar claro en el nuevo layout.',
    'cs2.design.caption1': 'La interfaz existente del cuestionario de ThirdPartyTrust, capturada durante la auditoría de inventario de funcionalidades antes de empezar el rediseño.',
    'cs2.design.h3b': 'Mapear el dominio antes que la interfaz',
    'cs2.design.p3': 'El inventario de funcionalidades reveló algo más profundo que una lista de cosas para construir: el cuestionario no tenía un modelo conceptual claro desde la perspectiva del revisor. Las funcionalidades se habían acumulado durante años sin un entendimiento compartido de con qué objetos trabajaban realmente los revisores.',
    'cs2.design.p4': 'Antes de bocetar pantalla alguna, mapeé el dominio, identificando los objetos centrales, sus atributos y las operaciones que los revisores realizaban sobre ellos. Con el modelo se identificó qué existía, qué faltaba y qué relaciones tenía que soportar el nuevo sistema.',
    'cs2.design.caption2': 'Modelo de objetos a nivel de dominio, deducido de la plataforma existente, mapeando las entidades, atributos y relaciones centrales que el nuevo diseño tenía que contemplar.',
    'cs2.design.p5': 'El análisis reveló un insight clave: <strong>la Pregunta (Question) es la unidad de trabajo</strong>, no el Cuestionario (Questionnaire). Los revisores piensan y actúan a nivel de pregunta: marcan, aprueban, anotan y descargan una pregunta a la vez. El Questionnaire es un contenedor; la Question es donde se toman las decisiones.',
    'cs2.design.caption3': 'Seis objetos centrales desde la perspectiva del revisor. El cuestionario es un contenedor; la pregunta es la unidad de trabajo.',
    'cs2.design.p6': 'Tres objetos distintos manejan la comunicación por pregunta: <strong>Finding</strong> (visible para el proveedor), <strong>Message</strong> (comunicación asíncrona con el proveedor) e <strong>Internal Note</strong> (privada para el equipo de revisión, nunca compartida). Mantenerlos separados fue una decisión de diseño deliberada. El modelo de dominio también moldeó cómo se escribieron las tareas de research: tareas como "ir al proveedor X → abrir el questionnaire Y → marcar la pregunta N → crear un finding" trazan el camino exacto a través de la jerarquía de objetos, lo cual es parte de por qué los participantes navegaron el test de forma natural.',
    'cs2.design.h3c': 'Herramientas de pregunta: el problema de diseño de interacción más difícil',
    'cs2.design.p7': 'Cada pregunta en un cuestionario puede tener hasta cinco herramientas independientes asociadas: revisión (approve/flag), bookmark, creación de finding, mensajería y notas internas. En la plataforma vieja, estaban dispersas y ubicadas de forma inconsistente. Los usuarios tenían que buscarlas.',
    'cs2.design.p8': 'Exploré varios enfoques de layout antes de llegar a una solución. La tensión clave era entre <strong>la capacidad de descubrimiento</strong> (que las herramientas fueran lo suficientemente visibles como para que los usuarios supieran que existían) y <strong>la densidad</strong> (mantener la interfaz de pregunta legible cuando docenas de preguntas se apilan en secuencia).',
    'cs2.design.caption4': 'Tres propuestas de layout para las herramientas a nivel de pregunta. El riel vertical equilibró visibilidad con densidad y se convirtió en la base del diseño final.',
    'cs2.design.callout1': 'La solución elegida, un riel de acciones vertical anclado a cada pregunta, mantuvo las herramientas siempre alcanzables sin competir con el contenido de la pregunta. <em>Las acciones siempre están en el mismo lugar, sin importar la extensión de la pregunta o el tipo de respuesta.</em>',
    'cs2.design.caption5': 'Comparación antes y después de la interfaz del cuestionario',
    'cs2.design.caption6': 'Comportamiento de scroll del riel de herramientas',
    'cs2.design.h3d': 'Mostrar el puntaje sin exponer la fórmula',
    'cs2.design.p9': 'El sistema de puntaje calcula el riesgo a partir de tres entradas: answer impact, question priority y category weight, combinados en un overall score. El resultado estaba fijo en el header del cuestionario. El problema era la legibilidad: los revisores no podían vincular lo que veían en pantalla con esas entradas.',
    'cs2.design.p10': 'La solución fue mostrar todo lo relacionado con el puntaje de una forma visual unificada, que permitió que los revisores entendieran intuitivamente qué impulsaba el número.',
    'cs2.design.p11': 'El puntaje usa un sistema de cinco estados con ícono + color (Good, Fair, Warn, Bad y N/A) adoptado del Bitsight DS, que pasó de una escala solo de color a ícono + color. Esto mejoró la accesibilidad y mantuvo la funcionalidad visualmente consistente con el resto del producto. A nivel de categoría y de cuestionario el puntaje se vuelve numérico, emparejado con el mismo ícono, para que los revisores puedan identificar problemas en las categorías de un vistazo.',
    'cs2.design.caption7': 'Puntaje a nivel de pregunta (cualitativo) vs. a nivel de cuestionario (numérico)',
    'cs2.research.h2': 'Dos estudios, dos ángulos distintos',
    'cs2.research.p1': 'Con los diseños y flujos de usuario iniciales, realizamos dos estudios de investigación junto al equipo de research para validar la dirección y detectar pain points antes del release. El objetivo era testear con usuarios reales y a la vez conseguir feedback experto de forma temprana.',
    'cs2.research.study1label': 'Estudio 1 · Interno',
    'cs2.research.study1title': 'Evaluación experta PURE',
    'cs2.research.study1p': 'Los flujos de ThirdPartyTrust no les eran familiares a los empleados de Bitsight, así que antes de testear con usuarios reales hicimos primero una revisión heurística estructurada con stakeholders internos. PURE (Practical Usability Rating by Experts) usa un conjunto definido de criterios para detectar problemas de usabilidad antes del testing externo, más rápido y más barato que esperar a que los usuarios reales los encuentren.',
    'cs2.research.study2label': 'Estudio 2 · Externo',
    'cs2.research.study2title': 'Test de usabilidad moderado',
    'cs2.research.study2p': 'Sesiones con usuarios existentes de la plataforma ThirdPartyTrust. Los participantes completaron tareas representativas usando el nuevo diseño y verbalizaron sus reacciones. Métricas principales: tasa de éxito en tareas, tiempo por tarea, patrones de error y feedback cualitativo.',
    'cs2.research.h3': 'Lo que encontramos',
    'cs2.research.p2': 'Los resultados del test de usabilidad fueron alentadores: los participantes completaron todas las tareas con éxito y respondieron positivamente a la nueva interfaz. Una de las reacciones más comunes fue sobre el toolbar de las preguntas: las acciones se sentían más claras y más fáciles de alcanzar que en el producto original.',
    'cs2.research.insight1': '<strong>Todas las tareas se completaron con éxito.</strong> Los usuarios existentes navegaron la interfaz rediseñada sin errores significativos. La reacción general fue que las acciones se sentían "más claras y fáciles de usar."',
    'cs2.research.insight2': '<strong>Descarga masiva de documentos.</strong> Los usuarios necesitaban descargar todos los documentos de un cuestionario a la vez, pero el sistema los obligaba a hacerlo de a uno, por pregunta. Un punto de fricción recurrente y doloroso.',
    'cs2.research.insight3': '<strong>Filtrado entre categorías.</strong> Las categorías se renderizaban del lado del cliente, lo que limitaba el filtrado a dentro de cada categoría. Los usuarios esperaban filtrar en todo el cuestionario, una restricción estructural de ingeniería, no de diseño.',
    'cs2.research.insight4': '<strong>Cuestionarios creados por el usuario.</strong> Los usuarios querían poder crear sus propios cuestionarios. En el estado actual, los cuestionarios se creaban a pedido por el equipo de Customer Success, un cuello de botella que los usuarios encontraban frustrante.',
    'cs2.research.quote1': 'La información del cuestionario es más clara ahora',
    'cs2.research.quote1role': 'Participante del test de usabilidad',
    'cs2.research.quote1moment': 'Sobre el layout de pregunta rediseñado',
    'cs2.research.quote2': 'Descargamos los archivos pregunta por pregunta, necesitamos descargar todo de una vez',
    'cs2.research.quote2role': 'Participante del test de usabilidad',
    'cs2.research.quote2moment': 'Sobre la descarga de documentos',
    'cs2.research.quote3': 'Filtrar por categorías es molesto',
    'cs2.research.quote3role': 'Participante del test de usabilidad',
    'cs2.research.quote3moment': 'Sobre el filtrado entre categorías',
    'cs2.research.callout1': 'Los últimos dos pain points eran muy solicitados, pero de baja factibilidad para ingeniería en esa etapa. Pasaron al backlog con una justificación clara.',
    'cs2.research.caption1': 'Matriz de priorización mostrando impacto versus factibilidad',
    'cs2.outcomes.h2': 'Una funcionalidad compleja, entregada en piezas que encajaron',
    'cs2.outcomes.p1': 'El rediseño se lanzó de forma progresiva a lo largo de ciclos de entrega planificados. Cada iteración se testeó o revisó antes de que empezara la siguiente. Los problemas se detectaron temprano, no después de tener todo construido.',
    'cs2.outcomes.h3a': 'Modos claro y oscuro, listos desde el lanzamiento',
    'cs2.outcomes.p2': 'Como este proyecto corrió en paralelo con el trabajo de adopción de design tokens, el cuestionario se convirtió en una de las primeras funcionalidades en tokenizarse por completo. Cada componente del rediseño referenciaba tokens semánticos, lo que significó que tanto el modo claro como el oscuro estuvieran soportados desde el inicio, sin archivos de diseño separados ni duplicación.',
    'cs2.outcomes.caption1': 'Modo claro y oscuro, listos desde el lanzamiento. Ambos modos llegaron con la decisión del sistema de tokens, no como trabajo de diseño extra.',
    'cs2.outcomes.h3b': 'Colaboración con el equipo del lado del proveedor',
    'cs2.outcomes.p3': 'La funcionalidad de cuestionarios tiene dos lados: la experiencia del usuario que revisa (lo que ven los equipos de ciber seguridad) y la experiencia del que responde (lo que ven los proveedores). Yo estaba en el equipo de VRM (Vendor Risk Management), a cargo de la interfaz del lado de las empresas que realizan la revisión, y colaboré de cerca con el equipo de TMH (Trust Management Hub), orientado al proveedor. Esa colaboración se debió a que traía contexto del producto desde la plataforma original de ThirdPartyTrust, antes que la adquisición dividiera las experiencias en dos productos. Mantener ambos lados consistentes requirió alineación constante: componentes compartidos, tokens compartidos y revisiones regulares entre equipos.',
    'cs2.outcomes.caption2': 'Panel de categorías en modo revisión y modo edición.',
    'cs2.outcomes.caption3': 'Tarjetas de pregunta en modo revisión y modo edición.',
    'cs2.outcomes.h3c': 'Resultados',
    'cs2.outcomes.p4a': 'Se entregaron dos estudios de investigación, un rediseño completo de la funcionalidad y un conjunto de componentes reutilizables.',
    'cs2.outcomes.p4b': 'El test de usabilidad validó la dirección central: todas las tareas se completaron con éxito, y los participantes respondieron positivamente al nuevo layout de herramientas.',
    'cs2.outcomes.p4c': 'Los puntos de dolor detectados en la investigación se documentaron, priorizaron y comunicaron al equipo de producto con un contexto claro de factibilidad.',
    'cs2.outcomes.caption4': 'El rediseño del cuestionario en acción',
    'cs2.outcomes.caption5': 'Hojas de acción y diálogos para la gestión de preguntas.',
    'cs2.outcomes.h3d': 'Validación en el mundo real',
    'cs2.outcomes.p5': 'Después de que todos los diseños se entregaron a producción, el equipo de producto corrió un programa piloto con clientes nuevos y existentes durante la fase de unificación de la plataforma. Los clientes existentes accedieron a VRM Beta para una vista previa y recolección de feedback. Los clientes nuevos se sumaron directamente al VRM Beta Pilot Program.',
    'cs2.outcomes.pilot1': 'Confirmar la propuesta de valor de Bitsight VRM preguntando a los usuarios si el producto estaba cumpliendo con sus expectativas',
    'cs2.outcomes.pilot2': 'Testear y aprender para la mejora continua: recolectar feedback sobre usabilidad, funcionalidad y experiencia general',
    'cs2.outcomes.pilot3': 'Seguir promoviendo Bitsight VRM entre clientes nuevos mientras los existentes permanecían en la plataforma legacy',
    'cs2.outcomes.quote1': 'Necesitamos flexibilidad sobre a quién le podemos enviar el cuestionario…',
    'cs2.outcomes.quote1role': 'Participante del VRM Beta Pilot',
    'cs2.outcomes.quote1moment': 'Sobre la flexibilidad de destinatarios',
    'cs2.outcomes.quote2': 'Podés usar SAP Ariba u otros productos de TPRM para enviar cuestionarios fácilmente, pero no necesariamente crear este tipo de experiencia en vivo… en tiempo real podés iniciar conversaciones, mandar mensajes al proveedor y colaborar teniendo todo en un solo lugar',
    'cs2.outcomes.quote2role': 'Participante del VRM Beta Pilot',
    'cs2.outcomes.quote2moment': 'Sobre la colaboración en tiempo real',
    'cs2.outcomes.quote3': 'Lo increíble es esta capacidad de definir requerimientos fácilmente y crear estas conversaciones para hacer seguimiento de las preguntas',
    'cs2.outcomes.quote3role': 'Participante del VRM Beta Pilot',
    'cs2.outcomes.quote3moment': 'Sobre la mensajería a nivel de pregunta',
    'cs2.outcomes.callout1': 'No estuve a cargo del programa piloto, pero tener ese tipo de feedback de una plataforma en vivo, de clientes reales usando la funcionalidad en producción, fue una señal significativa de que la dirección de diseño se sostenía más allá del testing de usabilidad.',
    'cs2.lessons.h3': 'Lo que este proyecto me enseñó',
    'cs2.lessons.p1': 'Aprendí lo caro que resulta trabajar sin documentación. Armar el inventario de funcionalidades significó hacer ingeniería inversa de todo el producto desde cero, y eso me llevó un tiempo real que no habría necesitado si la documentación hubiera existido desde el principio. Ahora trato de documentar sobre la marcha, incluso cuando nadie lo pide, para que quien retome el trabajo después no tenga que empezar de cero.',
    'cs2.lessons.p2': 'Correr primero la evaluación PURE detectó problemas estructurales antes de que ningún usuario viera el diseño. Después, el test de usabilidad me mostró qué se sostenía de verdad, además de fricciones que nunca hubiera detectado por mi cuenta. Hacer ambas cosas hizo mucho más fáciles las conversaciones de priorización con el equipo de producto, porque ya no estaba adivinando qué problemas importaban más.',
    'cs2.lessons.p3': 'Las limitaciones del scope cambian. Las mejoras más grandes pedidas por los usuarios estuvieron ligadas a los cuestionarios personalizados y al filtrado a nivel de cuestionario. Ambos quedaron fuera del scope en esta etapa, por lo que el rediseño mejoró el tiempo de revisión sin resolverlo del todo. Si volviera atrás, insistiría más en mantener el filtrado, ya que aceleraría significativamente el trabajo de los usuarios.',

    /* ═══ Case Study 3 — Personas & IA ═══ */
    'meta.title.cs3': 'Rediseño de Personas e IA — Hariel Baiz',
    'meta.desc.cs3': "Caso de estudio: la investigación UX que llevó a Bitsight a dividir ThirdPartyTrust en dos productos, y el rediseño de navegación que siguió para VRM.",
    'cs3.gate.h2': 'Este case study está protegido con contraseña',
    'cs3.gate.p': 'Ingresá la contraseña para ver Personas y Arquitectura de la Información.',
    'cs3.gate.placeholder': 'Contraseña',
    'cs3.gate.btn': 'Desbloquear',
    'cs3.gate.error': 'Contraseña incorrecta. Intentá de nuevo.',
    'cs3.gate.hint': '¿Todavía no tenés la contraseña? Escribime a <a href="mailto:hariel.baiz@gmail.com">hariel.baiz@gmail.com</a>',
    'cs3.hero.tag': 'Case Study · UX Research & Estrategia',
    'cs3.hero.title': 'La investigación que dividió un producto en dos',
    'cs3.hero.chip4': 'Affinity Diagramming',
    'cs3.hero.chip6': 'Diseñador Lead',
    'cs3.idx.context': '01 — Contexto',
    'cs3.idx.problem': '02 — Problema',
    'cs3.idx.research': '03 — Investigación',
    'cs3.idx.insights': '04 — Insights',
    'cs3.idx.feedback': '05 — Patrones de Feedback',
    'cs3.idx.architecture': '06 — Arquitectura',
    'cs3.idx.lessons': '07 — Lecciones',
    'cs3.hero.sub': 'ThirdPartyTrust tenía dos tipos de usuarios completamente diferentes compartiendo una misma interfaz de usuario, y ninguno de los dos sentía que se adaptara a sus necesidades. Formé parte del research que llevó a dividirla en dos productos específicos, Bitsight VRM y TMH, y lideré el rediseño de la navegación y los flujos de usuario de VRM, el lado orientado al cliente, trabajando de cerca con el equipo de TMH del lado de los proveedores.',
    'cs3.facts.timelineLabel': 'Duración',
    'cs3.facts.timelineValue': '2022-2024',
    'cs3.facts.roleLabel': 'Mi rol',
    'cs3.facts.roleValue': 'Senior Product Designer trabajando en estrategia de IA, investigación y rediseño de plataforma',
    'cs3.facts.deliverablesLabel': 'Entregables',
    'cs3.facts.deliverablesValue': 'Personas de usuario, arquitectura de información y rediseño de producto para VRM, el lado orientado al cliente de la plataforma',
    'cs3.outcome.label1': 'Productos separados, nacidos de una única interfaz compartida — VRM y TMH',
    'cs3.outcome.label2': 'Flujos rediseñados después de la división del producto — 3 mostrados en detalle abajo',
    'cs3.outcome.label3': 'Métodos de investigación — entrevistas, affinity diagramming, estudios de usabilidad',
    'cs3.outcome.label4': 'Menos tickets de soporte en onboarding y tareas centrales, tras lanzar las guías de Pendo y estados vacíos más claros',
    'cs3.context.h2': 'Una plataforma construida sin equipo de diseño',
    'cs3.context.p2': 'Cuando comencé a trabajar en ThirdPartyTrust, una plataforma de gestión de riesgo de terceros (TPRM), la UI venía siendo diseñada íntegramente por desarrolladores: no había un equipo de UX, infraestructura de investigación, o una idea clara de quién usaba realmente el producto. Dos tipos de usuario completamente distintos, <strong>clientes</strong> (empresas que gestionan el riesgo de proveedores) y <strong>proveedores</strong> (empresas siendo evaluadas), navegaban la misma interfaz, con la misma navegación, aunque sus objetivos casi no tenían nada en común.',
    'cs3.context.callout1': 'El llamado de atención ya existía: un gran volumen de tickets de soporte, la falta de soporte para suscripciones gratuitas y la imposibilidad de distinguir entre un problema de usabilidad o una carencia de features. Mi trabajo consistía en crear el proceso para interpretar esas alertas y actuar en consecuencia.',
    'cs3.context.p3': 'Después de la adquisición de ThirdPartyTrust por parte de Bitsight en el tercer trimestre del 2021, el producto se dividió en dos equipos: VRM (Vendor Risk Management, el lado orientado al cliente) y TMH (Trust Management hub, el lado orientado a los proveedores). Me dediqué exclusivamente al equipo de VRM, pero seguí trabajando de cerca con el equipo de TMH, ya que ya traía el contexto del producto ThirdPartyTrust.',
    'cs3.problem.h2': 'Dos usuarios. Una forma de navegación. Cero claridad.',
    'cs3.problem.p1': 'El problema central de la plataforma era estructural: clientes y proveedores estaban forzados a compartir el mismo modelo mental del producto, aunque estaban ahí por razones completamente distintas.',
    'cs3.problem.card1title': 'Confusión en la navegación.',
    'cs3.problem.card1p': 'La navegación de la plataforma era compartida para ambos tipos de usuario. Los clientes que buscaban su lista de proveedores y los proveedores que buscaban sus evaluaciones pendientes llegaban al mismo lugar, sin una ruta clara a seguir.',
    'cs3.problem.card2title': 'Falta de feedback del sistema.',
    'cs3.problem.card2p': 'Los usuarios no podían saber si una acción se había realizado con éxito. No había confirmación tras enviar un cuestionario. Pantallas vacías sin indicaciones sobre qué hacer a continuación.',
    'cs3.problem.card3title': 'Usuarios invisibles.',
    'cs3.problem.card3p': 'Los usuarios sin suscripción no tenían canal de soporte. Su frustración generaba tickets de soporte a través de canales indirectos, pero sin investigación no había forma de distinguir un problema de usabilidad de una feature faltante o mal diseñada.',
    'cs3.research.h2': 'Entender dos mundos distintos',
    'cs3.research.p1': 'El objetivo de la investigación era exploratorio: entender cómo pensaba cada tipo de usuario sobre su trabajo, qué necesitaba de la plataforma y dónde se rompía la UX. Usamos tres métodos, cada uno elegido con un propósito específico.',
    'cs3.research.card1title': 'Entrevistas a usuarios.',
    'cs3.research.card1p': 'Para comprender las motivaciones, los modelos mentales y los flujos de trabajo cotidianos. Hablamos con usuarios suscritos y no suscritos de ambos lados: clientes y proveedores. El objetivo era escuchar cómo describían su propio trabajo antes de preguntarles cómo el producto encajaba en él.',
    'cs3.research.card2title': 'Affinity diagramming.',
    'cs3.research.card2p': 'Para sintetizar las observaciones de todos los participantes y sacar a la luz temas comunes. Organizamos sesiones que se convirtieron en un entendimiento compartido entre el equipo de producto. Más tarde sirvió como referencia para los productos VRM y TMH, que se construyeron a partir de la misma investigación.',
    'cs3.research.card3title': 'Estudios de usabilidad.',
    'cs3.research.card3p': 'Para validar la nueva arquitectura de información (IA) después de que se tomara la decisión de dividir el producto. Se evaluó si los usuarios podían navegar por la nueva estructura antes de comprometernos a desarrollarla.',
    'cs3.research.h3a': 'El equipo de investigación',
    'cs3.research.p2': 'Esto no lo hice solo. Trabajamos 2 product designers, 2 product managers y 5 compañeros de customer success para planificar y correr las entrevistas. Customer success en particular nos brindó acceso directo a los usuarios, ya que hablaban con ellos todos los días. Los usuarios suscriptos fueron la señal principal; los no suscriptos, nos mostraron dónde la experiencia estaba fallando de manera silenciosa.',
    'cs3.research.caption1': 'Affinity diagram y journey map — hallazgos de la investigación con usuarios',
    'cs3.research.h3b': 'Surgieron dos perfiles de personas',
    'cs3.research.p3': 'A partir de las entrevistas y las sesiones de affinity diagramming surgieron dos personas, una por cada lado de la plataforma. Estos se convirtieron en el punto de referencia común para las decisiones de diseño tanto en el equipo de VRM como en el de TMH, prueba de que clientes y proveedores necesitaban productos genuinamente diferentes, no solo perspectivas distintas de un mismo producto.',
    'cs3.research.caption2': 'Sarah Chen y Tiago Ferreira — las personas del lado cliente y del lado proveedor que surgieron de esta investigación.',
    'cs3.insights.h2': 'Lo que reveló el affinity diagram',
    'cs3.insights.p1': 'Surgieron cinco temas después de agrupar las observaciones de todos los participantes. Cada uno se convirtió en un principio de diseño para la nueva IA.',
    'cs3.insights.theme1': '<strong>Tiempo.</strong> Los usuarios necesitaban saltar entre la pestaña de Requirements, Data y External Questionnaires solo para revisar lo que un proveedor había enviado. Los flujos de trabajo debían ser lineales y rápidos, sin callejones sin salida ni pasos innecesarios.',
    'cs3.insights.theme2': '<strong>Personalización.</strong> Ningún tipo de usuario sentía que la plataforma estuviera construida para su contexto. Los clientes necesitaban control sobre cómo se configuraban sus evaluaciones, como cuestionarios personalizados; los proveedores necesitaban control sobre su perfil. La personalización tenía que ser un concepto prioritario.',
    'cs3.insights.theme3': '<strong>Colaboración.</strong> Ambos lados describieron su trabajo como algo intrínsecamente multifuncional. Los clientes coordinaban con equipos internos de seguridad; los proveedores coordinaban entre los departamentos de legales, ingeniería y finanzas. Contactos, roles y delegación necesitaban ser objetos centrales en la navegación.',
    'cs3.insights.theme4': '<strong>Automatización.</strong> El trabajo manual y repetitivo era la mayor fuente de frustración en ambos lados: perseguir proveedores, hacer seguimiento del progreso en planillas, reenviar los mismos documentos. Los puntos de automatización necesitaban integrarse en los flujos principales, no ser agregados opcionales.',
    'cs3.insights.theme5': '<strong>Navegación.</strong>  Los usuarios no tenían claros los flujos de trabajo: un cliente que buscaba su lista de proveedores y un proveedor que buscaba sus evaluaciones activas compartían secciones. La plataforma carecía de un modelo conceptual que se ajustara a la forma en que cada usuario concebía su trabajo, por eso era necesario reconstruir la arquitectura de la información en torno a cada tipo de usuario.',
    'cs3.feedback.h2': 'Un producto que finalmente responde',
    'cs3.feedback.p1': 'El problema de no tener feedback del sistema, identificado al principio (sección 02), tenía una causa simple: no había una definición compartida de cómo el producto informaba a los usuarios. Antes de que empezara cualquier trabajo de rediseño estructural, el primer parche que se lanzó en ThirdPartyTrust fue más chico: configurar guías de Pendo para el onboarding de usuarios. Esas guías se mantuvieron cuando la plataforma pasó a Bitsight y siguen en uso hoy.',
    'cs3.feedback.card1title': 'Antes — ThirdPartyTrust',
    'cs3.feedback.card1p': 'La plataforma no confirmaba si un cuestionario había sido completado; los empty states no tenían ninguna guía sobre qué hacer a continuación; errores informados sin claridad. Los usuarios llegaban a la plataforma y no sabían qué hacer sin tener que contactar a soporte técnico.',
    'cs3.feedback.card2title': 'Después — patrones de feedback del Bitsight DS',
    'cs3.feedback.card2p': 'Cada pantalla contempla los mismos cuatro estados: empty, loading, success y error. Las acciones se confirman si se completan o no. Los empty states señalan el próximo paso en lugar de dejar una pantalla en blanco.',
    'cs3.feedback.h3': 'Patrones de feedback, estandarizados',
    'cs3.feedback.p2': 'El Bitsight DS ya tenía una librería completa de patrones de feedback: el problema no era ese, era su uso inconsistente. La solución fue armar un checklist para comprobar que cada nueva feature cumpliera con estos estándares.',
    'cs3.feedback.p3': 'Los empty states guían a los usuarios sobre qué hacer antes de que haya datos, en lugar de mostrar una pantalla en blanco. Los estados de carga y progreso confirman que una acción está en curso. Las confirmaciones de éxito dan una señal clara cuando algo se completa, como enviar un cuestionario. Los errores en línea aparecen junto al campo o acción que los causó.',
    'cs3.feedback.caption1': 'La checklist de cuatro estados, siempre a mano en cada proyecto desde entonces.',
    'cs3.feedback.quote1': 'Los empty states fueron realmente útiles: dejaban claro qué hacer para completar la tarea.',
    'cs3.feedback.quote1role': 'Participante del test de usabilidad PURE',
    'cs3.feedback.quote1moment': 'Sobre los estados vacíos rediseñados',
    'cs3.arch.h2': 'Primero los objetos, no las funcionalidades',
    'cs3.arch.p1': 'La investigación reveló algo más profundo que un problema de usabilidad. Clientes y proveedores no eran solo personas distintas: operaban con objetos conceptuales fundamentalmente distintos. Combinarlos en la misma navegación era la causa de la confusión. La decisión de IA se desprendió directamente de ahí: dividir los productos, uno para clientes y otro para proveedores.',
    'cs3.arch.caption1': 'Objetos centrales — Clientes y Proveedores',
    'cs3.arch.h3a': 'Antes y después',
    'cs3.arch.p2': 'ThirdPartyTrust tenía una navegación doble: una barra superior para las secciones principales y un sidebar izquierdo para settings. El rediseño pasó a un único sidebar izquierdo por producto, cada uno organizado en torno a su propio modelo de objetos.',
    'cs3.arch.card1title': 'Antes — ThirdPartyTrust',
    'cs3.arch.card1p': 'Barra de navegación superior + sidebar izquierdo. Ambos tipos de usuario compartían la misma navegación principal. Si bien podían acceder a las mismas secciones, una solución rápida antes de la adquisición fue ocultar y mostrar secciones según el tipo de usuario.',
    'cs3.arch.card2title': 'Después — Bitsight VRM + TMH',
    'cs3.arch.card2p': 'Dos productos separados. Cada uno con un único sidebar izquierdo organizado en torno a sus propios objetos centrales. Los clientes navegan Vendors, Assessments y Findings. Los proveedores navegan Profile y Requests.',
    'cs3.arch.caption2': 'Nueva arquitectura de información — Antes y Después',
    'cs3.arch.p3': 'En la interfaz original, abrir un proveedor implicaba lanzar un modal a pantalla completa con su propia barra de pestañas interna (Tiering, Requirements, Data y varias más), aparte de un mal uso de un pattern de diseño, no había un "estás acá" a nivel de URL. El rediseño incorporó Vendor Profile como una sección real, cada pestaña ahora tenía su propia URL: Overview, Tiering, Requirements, etc. se convirtieron cada uno en destinos de navegación reales, con contexto persistente, en lugar de pestañas atrapadas dentro de un modal.',
    'cs3.arch.caption3': 'Vendor Profile pasa de ser un modal de pantalla completa a una sección anidada dentro de un sidebar unificado.',
    'cs3.arch.callout2': 'Dos cosas bajaron el volumen de tickets de soporte: dividir la interfaz en dos productos hizo que clientes y proveedores tuvieran cada uno una navegación construida en torno a sus propios objetos, y los patrones de feedback hicieron que, una vez ahí, el sistema realmente les contara qué estaba pasando en lugar de dejarlos adivinar.',
    'cs3.arch.h3b': 'El mismo patrón de objeto, reutilizado dos veces',
    'cs3.arch.p4': 'Una vez que los productos se dividieron, estuve a cargo de rediseñar la navegación de más de 10 flujos de trabajo dentro de VRM. Seleccioné Security Profile y Requirements como ejemplos por su importancia y relación entre ambos productos, que requería colaboración entre equipos.',
    'cs3.arch.p5': 'Las dos páginas responden preguntas distintas, <strong>Security Profile</strong> muestra todo lo que un proveedor compartió, publicado una vez en su perfil de TMH y muchas veces no requerida por el cliente. <strong>Requirements</strong> muestra la checklist específica de artefactos que el programa de riesgo de un cliente realmente exige a ese proveedor.',
    'cs3.arch.h4a': 'Security Profile — lo que un proveedor compartió',
    'cs3.arch.p6': 'En ThirdPartyTrust, la documentación compartida de un proveedor no se mostraba en un solo lugar. Estaba dividida entre dos secciones separadas, Assurance Program y Questionnaires, cada una con su propia navegación y su propio patrón de interfaz: tarjetas para Questionnaires y Certifications, tablas para Insurance y Audits/Assessments, nada se veía consistente. El rediseño combinó ambas en una única sección Security Program y colapsó los cuatro tipos de objeto en una grilla de tarjetas: La información se volvió más fácil de escanear por dos razones: dejó de aparentar ser cuatro artefactos distintos, y dejó de estar dividida entre dos páginas.',
    'cs3.arch.caption4': 'Security Profile — cuatro patrones inconsistentes de tarjeta/tabla se convierten en un único grid de tarjetas unificado, una tarjeta por artefacto, usando el mismo estilo de chip para marcar severidad de finding o señalar un ítem como requerido.',
    'cs3.arch.caption5': 'Security Profile — el rediseño en acción',
    'cs3.arch.quote1': 'Va a ser mucho más fácil para nosotros y para los proveedores tener todo en un solo lugar.',
    'cs3.arch.quote1role': 'Cliente de VRM',
    'cs3.arch.quote1moment': 'Sobre el Security Profile rediseñado',
    'cs3.arch.h4b': 'Requirements — la vista del revisor',
    'cs3.arch.p7': 'La página de Requirements tenía un problema grave, vivía dentro de un modal gigante lleno de pestañas (Tiering, Data, External Questionnaires y otras), y la pestaña en sí era de solo lectura. Solo podía decirle a un revisor qué se requería, no dejarlo actuar sobre eso. Para revisar la respuesta de un cuestionario o una pieza de documentación, el revisor tenía que abandonar la pestaña por completo, saltar a Data o External Questionnaires, hacer la revisión ahí y volver, repitiendo ese recorrido por cada artefacto en cada requirement.',
    'cs3.arch.p8': 'El rediseño hizo que Requirements fuera completamente accionable. La documentación se abre en línea en un side sheet, sin salir de la página. Los cuestionarios se abren en su propia página dedicada, ya que su tamaño no funciona en un sheet, pero los revisores llegan ahí directamente desde el requirement en lugar de tener que buscar primero en Data o External Questionnaires. El accordion, el summary y el estado por artefacto suman a la simplicidad de completar la tarea.',
    'cs3.arch.caption6': 'Requirements — de una pestaña de solo lectura que mandaba a los revisores de un lado a otro entre Data y External Questionnaires, a una vista completamente accionable con acceso directo al cuestionario y side sheets de documentos en línea.',
    'cs3.arch.caption7': 'Requirements — el rediseño en acción',
    'cs3.arch.quote2': 'Es mucho más eficiente para nosotros que revisar requirements en una herramienta y las respuestas del cuestionario en otra, y tener que tomar notas aparte para conectar las dos cosas.',
    'cs3.arch.quote2role': 'Cliente de VRM',
    'cs3.arch.quote2moment': 'Sobre la revisión de Requirements rediseñada',
    'cs3.arch.aitag': 'Bonus · Proyecto de Hackathon',
    'cs3.arch.aititle': 'De revisar cuestionarios a análisis de SOC2 con IA',
    'cs3.arch.aip': 'Durante este proyecto, participé de un hackathon interno explorando IA generativa dentro del producto de Bitsight. Revisar manualmente un reporte SOC2 Type II podía llevar horas, así que prototipamos un agente que lee el reporte, extrae lo relevante y lo resume en insights accionables por su cuenta. El verdadero problema de diseño no era la extracción, era la confianza. Los revisores necesitaban ver qué había encontrado el agente, en qué parte del reporte y qué tan seguro estaba el sistema, sin tener que rehacer el análisis ellos mismos para verificarlo. El prototipo fue lo suficientemente convincente como para convertirse en un producto real, Instant Insights, dentro de la aplicación de Vendor Risk Management. El tiempo de revisión manual pasó de horas a minutos.',
    'cs3.lessons.h2': 'Lo que este proyecto me enseñó',
    'cs3.lessons.p1': 'Los compañeros de customer success ayudaron a reclutar y correr nuestras sesiones de investigación, pero mayormente los sumé para ejecutar, no para definir las preguntas. Ellos hablaban con estos usuarios todos los días. La próxima vez los sumaría desde el inicio, porque creo que habríamos encontrado algunos de estos insights más rápido.',
    'cs3.lessons.p2': 'Uno de los momentos más valiosos de este proyecto fue la sesión de affinity entre equipos. Construir el diagrama juntos, en lugar de simplemente entregar un reporte, fue lo que convirtió la investigación en una base compartida a la que todos podían recurrir. Esos insights se convirtieron en el terreno sobre el que construimos cada pantalla nueva, y tener esa base tan clara desde el principio hizo que el resto del trabajo de diseño fuera mucho más fácil. La próxima vez correría este tipo de sesión más temprano en el proceso, no solo al final.',
    'cs3.lessons.p3': 'En ThirdPartyTrust ya habíamos identificado estos pain points junto al equipo de producto y empezamos a impulsar cambios en la IA, pero un backlog lleno de otras prioridades no dejaba que se hicieran realidad. A pesar de algunos quick fix que introdujimos, sentí algo de frustración viendo como una solución que sabíamos necesaria quedaba sin lanzar. Pero la adquisición ya venía avanzando de fondo. Cuando la integración con Bitsight abrió la puerta para un rediseño completo, gran parte de la investigación ya estaba hecha, solo tuvimos que rediseñar y testear los nuevos flujos.',

    /* ═══ Case Study 4 — Building With AI ═══ */
    'meta.title.cs4': 'Construyendo un Portfolio con IA — Hariel Baiz',
    'meta.desc.cs4': "Cómo usé a Claude como colaborador para diseñar, construir y publicar este portfolio bilingüe, desde los primeros layouts hasta el flujo de publicación en GitHub.",
    'cs4.hero.tag': 'Case Study · Diseño y Desarrollo Asistido por IA',
    'cs4.hero.title': 'Diseñé este portafolio y Claude me ayudó a desarrollarlo.',
    'cs4.hero.chip1': 'Colaboración con IA',
    'cs4.hero.chip2': 'Front-End',
    'cs4.hero.chip3': 'Design Systems',
    'cs4.hero.chip4': 'GitHub',
    'cs4.idx.context': '01 — Contexto',
    'cs4.idx.problem': '02 — Problema',
    'cs4.idx.workflow': '03 — Workflow',
    'cs4.idx.design': '04 — El Design System',
    'cs4.idx.outcomes': '05 — Resultados',
    'cs4.idx.lessons': '06 — Lecciones',
    'cs4.facts.timelineLabel': 'Duración',
    'cs4.facts.timelineValue': '2026, en curso',
    'cs4.facts.roleLabel': 'Mi rol',
    'cs4.facts.roleValue': 'Diseñador y product owner, dirigiendo el desarrollo front-end asistido por IA',
    'cs4.facts.deliverablesLabel': 'Entregables',
    'cs4.facts.deliverablesValue': 'Landing page, 3 case studies, página About, sitio bilingüe, responsive, con light/dark themes, publicado en GitHub Pages',
    'cs4.hero.sub': "Quería este portfolio bien diseñado, bien construido, y publicado por mí, así que usé Claude como asistente de trabajo para armar layouts, escribir código y llevar adelante el flujo de publicación en GitHub. El resultado: un portfolio en producción, bilingüe, con dos themes (light/dark) y un historial de releases versionado. Este case study trata sobre ese proceso.",
    'cs4.context.h2': 'Diseñando y desarrollando el portfolio',
    'cs4.context.p1': 'Cuando empecé este proyecto, tenía una búsqueda laboral que llevar adelante y ningún equipo de front-end al que entregarle los diseños. Cada uno de los case study de este portfolio trata sobre un producto que diseñé mientras el equipo de ingeniería lo construía. Este es distinto: por primera vez, también soy responsable del código, el repositorio y el deploy.',
    'cs4.context.p2': 'Decidí comenzar a incluír IA en mi proceso de trabajo utilizando Claude, aportandole la dirección de diseño, la copy, las prioridades y la decisión final sobre lo que se publica. Claude escribe y edita el HTML, CSS y JS a gran escala. Y como diseñador que puede leer y editar código, dirijo esa relación sin perder la responsabilidad del resultado.',
    'cs4.context.callout1': "Este case study se redactó de la misma forma en que se construyó el resto del sitio. Pasó por el mismo ida y vuelta entre dirección y ejecución, revisado y ajustado antes de publicarse.",
    'cs4.problem.h2': 'El trabajo comienza luego del primer borrador',
    'cs4.problem.p1': "Lograr que Claude produzca una página funcional es la parte fácil. El problema es todo lo que viene después del primer borrador. En cada iteración tuve que mantener el sistema visual consistente en seis páginas construidas en sesiones separadas, detectar copy que se alejaba de mi voz real y llevar los cambios de mis archivos locales a un sitio en vivo sin romper nada.",
    'cs4.problem.p3': "Además de mantener sincronizado el design system del repositorio con el de Figma. Cada cambio de token o componente en el código implicaba volver a Figma para replicarlo, y ese ida y vuelta se volvía más lento a medida que el sitio crecía. Terminé resolviéndolo reemplazando Figma por Claude Design y el archivo <code>design.md</code>.",
    'cs4.workflow.h2': 'El loop: borrador, inspección, ajuste, publicación',
    'cs4.workflow.p1': "El workflow se asentó en un loop repetible a lo largo de varias sesiones. Describía el objetivo y las restricciones, revisaba lo que Claude producía, hacía las correcciones necesarias y recién ahí daba un cambio por terminado.",
    'cs4.workflow.h3prompt': 'Escribir prompts como user story',
    'cs4.workflow.pprompt': "Promptear para Claude terminó pareciéndose mucho a una user story con acceptance criteria, algo que vengo escribiendo hace años trabajando con equipos de ingeniería. Comencé a utilizar una versión libre del framework Ask, Requirements, Context, Examples. Planteaba el pedido con claridad, listaba qué tenía que quedar consistente, qué patrón existente había que igualar y daba uno o varios ejemplos.",
    'cs4.workflow.h3a': 'Prototipar rápido, testear con dev tools',
    'cs4.workflow.p2': 'Usé las dev tools del navegador todo el tiempo para inspeccionar elementos, buscar nombres de estilos CSS para pedir por cambios específicos, ajustar un padding o un line-height en vivo y probar como se veía antes de pedir que el cambio se hiciera definitivo, revisar accesibilidad en los temas light/dark y los breakpoints mobile.',
    'cs4.workflow.caption1': 'Probando ajustes de espaciado y color en vivo en las dev tools antes de confirmar un valor en la hoja de estilos.',
    'cs4.workflow.h3b': 'Tomando el control en VS Code',
    'cs4.workflow.p3': "Algunos cambios eran más rápidos y precisos de hacer directamente en VS code. Mantuve el repositorio abierto en VS Code todo el tiempo con las sesiones de Claude, para poder ver y editar directamente en lugar de describir un cambio de una línea y esperar el resultado. También tenía a mano un algunos bloques de código chicos para meter una imagen nueva o mover una cita destacada. Claude se encargaba del trabajo estructural grande y de las auditorías, yo me encargaba de los ajustes chicos que podía solucionar más rápido.",
    'cs4.workflow.caption2': 'Un ajuste directo a un valor de token en VS Code, más rápido que un ida y vuelta por conversación para un cambio de una línea.',
    'cs4.workflow.h3c': 'Un repositorio privado y otro público',
    'cs4.workflow.p4': "Dividí el sitio en dos repositorios. Un repo de dev (privado) maneja las iteraciones diarias, con un historial de commits completo más dos archivos de referencia, <code>session-context.md</code> que registra decisiones sesión a sesión y <code>design.md</code> que documenta el sistema. Un repo live (público) solo recibe releases limpios. Para publicar sigo siempre la misma secuencia. Copio los archivos terminados (excluyendo esos archivos solo de dev) al repo live, commiteo con un mensaje de versión, lo tagueo, y pusheo.",
    'cs4.workflow.p5': "Mantener esos dos repositorios separados tiene su explicación. El historial de commits del repo de dev me permitió rastrear cambios, experimentar libremente y no dejar que información protegida por NDAs en algún commit termine pública. Cada push al repo live era algo que ya había revisado y versionado.",
    'cs4.workflow.caption3': 'Repo de dev para iterar, repo live para releases deliberados y versionados. GitHub Pages sirve el repo live en un dominio propio.',
    'cs4.workflow.h3over': 'Cuando Claude se pasa de rosca',
    'cs4.workflow.pover': "No todas las sesiones siguieron el loop de forma prolija. Frente a un pedido poco acotado, Claude tiende a generar algo nuevo: una clase nueva donde un token existente ya alcanzaba, una variante de componente que nadie pidió. Los resultados me hicieron acordar a cuando era diseñador gráfico junior y quería mostrar todos los trucos que sabía, cuando lo mejor es utilizar lo justo y necesario (menos es más). Ajustar mejor el Ask y los Requirements ayudó, pero no alcanzó. Luego de varias iteraciones pude mejorar los resultados añadiendo el archivo <code>design.md</code> como referencia, donde Claude buscaba cada token y patrón existente sin desviarse sesión a sesión.",
    'cs4.ds.h2': 'La evolución del design system: de Figma a CSS auditado en producción',
    'cs4.ds.p1': "Empecé el design system en Figma, como hacía en mi workflow de diseño habitual, pero esta vez conectándolo a Claude  vía MCP. Le había pasado a Claude algunos sitios como referencia y algunas intrucciones para generar el design system desde cero. Los resultados no estaban mal, pero al pasar de Figma a CSS, cada cambio requería un ida y vuelta entre ambos para mantenerlos actualizados. Eso se volvió lento y tedioso. A mitad de camino, dejé de volver a Figma para las correcciones. Me resultó más rápido probar cambios en vivo en las dev tools y editar el CSS del token o del componente directamente.",
    'cs4.ds.p2': "Para este nuevo workflow necesitaba una forma de documentar el DS y mantenerlo actualizado. Usé Claude Design, le pedí que generara un design system a partir del repositorio y al instante se había generado desde cero con excelentes resultados. Lo malo es que no supe como conectarlo a Claude, por lo que volví al mismo problema. La solución fue generar el archivo <code>design.md</code> a partir del DS, ahora cada token y pattern queda listado y es usado por Claude como referencia, sin reexplicar el sistema desde cero en cada sesión.",
   
    'cs4.audit.h3b': 'Auditar el CSS en lugar de adivinar qué era seguro borrar',
    'cs4.audit.p3': 'Para cuando el sitio tenía seis páginas, cinco hojas de estilo y estaba listo para publicar, le pedí a Claude que audite el repositorio en busca de CSS muerto.',
    'cs4.audit.p4': 'La auditoría encontró que 151 de 281 clases en el CSS del sitio no se usaban. Eso es más de la mitad del CSS, y no solo eran clases huérfanas: algunas eran variantes de otras, otras eran restos de componentes que se habían probado y descartado, y otras eran estilos que se habían usado en un momento y luego se habían reemplazado por un token. La auditoría me permitió dejar el CSS más liviano y más fácil de mantener.',
    'cs4.audit.caption1': 'El reporte de auditoría categorizado: código muerto aprobado para eliminar, código retirado intencionalmente guardado como referencia, y un pequeño grupo reservado para una decisión futura.',
    'cs4.outcomes.h2': 'Un portfolio en producción, versionado y bilingüe que puedo seguir iterando',
    'cs4.outcomes.p1': 'El sitio está en producción en un dominio propio, construido y mantenido a través del workflow descrito arriba. Cada cambio que hago pasa por el loop de revisión y publicación, y cada release queda versionado en GitHub.',
    'cs4.outcomes.win1': 'Es completamente responsive, bilingüe y con modos light/dark.',
    'cs4.outcomes.win2': 'Una auditoría completa de CSS eliminó 151 clases muertas y redujo la hoja de estilo más grande en aproximadamente un tercio.',
    'cs4.outcomes.win3': "Un nuevo flujo de publicación de dev a producción con releases tageados, más <code>session-context.md</code> y <code>design.md</code> registrando decisiones del lado de dev, significa que cada versión del sitio está documentada.",
    'cs4.lessons.h3': 'Lo que este proyecto me enseñó',
    'cs4.lessons.p1': 'Agregar IA a mi flujo de trabajo significó que cada decisión de diseño y cambio de código pasara por mi revisión y aprobación, mi rol pasó de creador/diseñador a uno más de editor/director.',
    'cs4.lessons.p2': 'Las dev tools se convirtieron en una herramienta de prototipado rápido. Probar cambios en vivo y ajustar valores de estilos directamente fue más rápido y más preciso que describir un cambio y esperar que Claude lo hiciera bien.',
    'cs4.lessons.p5': 'El design system creado en Claude Design y el archivo <code>design.md</code> se convirtieron en la referencia principal para Claude. Figma comenzó a desvancerse dentro del flujo de trabajo, dejé de usarlo como fuente de verdad, pero supongo lo seguiré utilizando para explorar nuevos conceptos de diseño de una forma más libre, o generar assets nuevos.',
    'cs4.lessons.p6': 'Generar un design system  desde cero significaba largas horas de configuración del foundation (definiendo valores de grilla, escribiendo cada variable de color en hex, tokens, jerarquías, etc.). Con IA, se salta todo ese trabajo pesado en minutos y con muy buenos resultados.',
    'cs4.lessons.p9': "Mi próximo paso sería explorar con una librería de componentes real, algo como Storybook, en lugar de <code>design.md</code>. Me gustaría ver si puedo mantener la misma consistencia de diseño y mejorar la velocidad de ejecución, pero con un sistema de componentes más robusto y documentado.",
  },
};

let currentLang = localStorage.getItem('portfolio-lang') || 'en';

function setLang(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);
  document.documentElement.setAttribute('lang', lang);

  // Update all elements with data-i18n attribute
  // (innerHTML, not textContent — some values like contact.title carry
  // an intentional <em> tag that textContent would silently strip)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const str = i18n[lang][key];
    if (str !== undefined) el.innerHTML = str;
  });

  // Update all elements with data-i18n-placeholder (inputs)
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const str = i18n[lang][key];
    if (str !== undefined) el.setAttribute('placeholder', str);
  });

  // Update all elements with data-i18n-aria (aria-label)
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.dataset.i18nAria;
    const str = i18n[lang][key];
    if (str !== undefined) el.setAttribute('aria-label', str);
  });

  // Update all elements with data-i18n-href (e.g. language-specific downloads)
  document.querySelectorAll('[data-i18n-href]').forEach(el => {
    const key = el.dataset.i18nHref;
    const str = i18n[lang][key];
    if (str !== undefined) el.setAttribute('href', str);
  });

  // Update <title> if the page declares a translatable one
  const titleKey = document.documentElement.dataset.i18nTitle;
  if (titleKey && i18n[lang][titleKey] !== undefined) {
    document.title = i18n[lang][titleKey];
  }

  // Update <meta name="description"> if the page declares a translatable one
  const descKey = document.documentElement.dataset.i18nDesc;
  if (descKey && i18n[lang][descKey] !== undefined) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', i18n[lang][descKey]);
  }

  // Update lang button active state
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.querySelector('.lang-active').textContent = lang.toUpperCase();
    btn.querySelector('.lang-label').textContent =
      lang === 'en' ? 'ES' : 'EN';
  });
}

function toggleLang() {
  setLang(currentLang === 'en' ? 'es' : 'en');
}

/* ─────────────────────────────────────────────────────────
   3. SCROLL REVEAL
   ─────────────────────────────────────────────────────────
   Any element with class .reveal animates in when visible.
───────────────────────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────────────────
   5. MEDIA LIGHTBOX
   ─────────────────────────────────────────────────────────
   Click any .media-block video or image to open it fullscreen
   in an overlay. Close via ×, backdrop, or Esc.
───────────────────────────────────────────────────────── */
function initMediaLightbox() {
  const media = document.querySelectorAll('.media-block video, .media-block img');
  if (!media.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'video-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Media lightbox');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'video-lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.textContent = '×';

  const lbVideo = document.createElement('video');
  lbVideo.controls = true;
  lbVideo.setAttribute('playsinline', '');
  lbVideo.style.display = 'none';

  const lbImg = document.createElement('img');
  lbImg.alt = '';
  lbImg.style.display = 'none';

  overlay.appendChild(closeBtn);
  overlay.appendChild(lbVideo);
  overlay.appendChild(lbImg);
  document.body.appendChild(overlay);

  function openVideo(src) {
    lbImg.style.display = 'none';
    lbImg.src = '';
    lbVideo.style.display = '';
    lbVideo.src = src;
    lbVideo.play().catch(() => {});
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function openImage(src, alt) {
    lbVideo.style.display = 'none';
    lbVideo.pause();
    lbVideo.src = '';
    lbImg.style.display = '';
    lbImg.src = src;
    lbImg.alt = alt || '';
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    lbVideo.pause();
    lbVideo.src = '';
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  media.forEach(el => {
    el.addEventListener('click', () => {
      if (el.tagName === 'VIDEO') {
        const src = el.querySelector('source')?.src || el.src;
        openVideo(src);
      } else {
        openImage(el.src, el.alt);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ─────────────────────────────────────────────────────────
   8. TESTIMONIAL WORD REVEAL
   ─────────────────────────────────────────────────────────
   Splits each .testimonial-quote into per-word spans, then
   fades them in one by one when the quote scrolls into view,
   as if the person were speaking the line out loud.
───────────────────────────────────────────────────────── */
function initTestimonialReveal() {
  const quotes = document.querySelectorAll('.testimonial-quote');
  if (!quotes.length) return;

  quotes.forEach(quote => {
    const nodes = Array.from(quote.childNodes);
    const words = [];
    quote.textContent = '';

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part.length) return;
          if (/^\s+$/.test(part)) {
            quote.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement('span');
            span.className = 'tq-word';
            span.textContent = part;
            quote.appendChild(span);
            words.push(span);
          }
        });
      } else {
        // Element node (e.g. <code>) — animate as a single word
        const span = document.createElement('span');
        span.className = 'tq-word';
        span.appendChild(node.cloneNode(true));
        quote.appendChild(span);
        words.push(span);
      }
    });

    words.forEach((w, i) => { w.style.transitionDelay = (i * 35) + 'ms'; });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-talking');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.testimonial-card').forEach(card => observer.observe(card));
}

/* ─────────────────────────────────────────────────────────
   9. MOBILE NAV (hamburger)
   ─────────────────────────────────────────────────────────
   Toggles the .nav-links dropdown panel below 640px.
   Closes on link click or click outside the nav.
───────────────────────────────────────────────────────── */
function initMobileNav() {
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    const nav = btn.closest('nav');
    const links = nav && nav.querySelector('.nav-links');
    if (!links) return;

    function close() {
      links.classList.remove('is-open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      btn.classList.toggle('is-open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  });
}

/* ─────────────────────────────────────────────────────────
   10. COPY EMAIL TO CLIPBOARD
   ─────────────────────────────────────────────────────────
   Button next to the contact email pill. Reads the already-
   injected email text from the sibling [data-email] element
   and copies it, swapping the icon to a checkmark briefly.
───────────────────────────────────────────────────────── */
function initCopyEmail() {
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', () => {
      const emailEl = btn.closest('.email-copy-group')?.querySelector('[data-email]');
      const email = emailEl ? emailEl.textContent.trim() : '';
      if (!email) return;

      navigator.clipboard.writeText(email).then(() => {
        btn.classList.add('is-copied');
        btn.setAttribute('aria-label', 'Email copied');
        setTimeout(() => {
          btn.classList.remove('is-copied');
          btn.setAttribute('aria-label', 'Copy email address');
        }, 1800);
      });
    });
  });
}

/* ─────────────────────────────────────────────────────────
   INIT — runs after DOM is ready
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Wire theme toggle button(s)
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Wire language toggle button(s)
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', toggleLang);
  });

  // Apply stored language on page load
  setLang(currentLang);

  // Mobile nav (hamburger)
  initMobileNav();

  // Scroll reveal
  initReveal();

  // Media lightbox (images + videos)
  initMediaLightbox();

  // Testimonial word-by-word reveal
  initTestimonialReveal();

  // Copy email to clipboard button
  initCopyEmail();

  // Sync OS theme preference change (no stored value)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('portfolio-theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
});


/* ─────────────────────────────────────────────────────────
   6. EMAIL INJECTION — avoids Cloudflare obfuscation
   All mailto: links are written by JS at runtime.
   Replace YOUR_EMAIL below with your actual address.
───────────────────────────────────────────────────────── */
(function injectEmail() {
  // Split the email to prevent static scraping too
  const user   = 'hariel.baiz';
  const domain = 'gmail.com';
  const email  = user + '@' + domain;
  const mailto = 'mailto:' + email;

  document.querySelectorAll('[data-email]').forEach(el => {
    el.href        = mailto;
    el.textContent = email;
  });
  document.querySelectorAll('[data-email-href]').forEach(el => {
    el.href = mailto;
  });
})();


/* ─────────────────────────────────────────────────────────
   7. CASE STUDY INDEX — active section highlight
   Watches each section with an id and marks the matching
   .cs-index link as .is-active while it's in view.
───────────────────────────────────────────────────────── */
(function initCsIndex() {
  const nav = document.querySelector('.cs-index');
  const indexLinks = document.querySelectorAll('.cs-index a');
  if (!indexLinks.length) return;

  const sections = [...indexLinks].map(a =>
    document.querySelector(a.getAttribute('href'))
  ).filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      indexLinks.forEach(a => a.classList.remove('is-active'));
      const active = document.querySelector(
        `.cs-index a[href="#${entry.target.id}"]`
      );
      if (active) active.classList.add('is-active');
    });
  }, {
    rootMargin: '-15% 0px -75% 0px'  /* fires when section top is ~15% from viewport top */
  });

  sections.forEach(s => observer.observe(s));

  // Reveal the fixed left rail only once the hero subtitle has
  // scrolled out of view — keeps it out of the way of the hero.
  const heroSub = document.querySelector('.hero-sub');
  if (nav && heroSub) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      nav.classList.toggle('is-visible', scrolledPast);
    }, { threshold: 0 });
    heroObserver.observe(heroSub);
  }
})();
