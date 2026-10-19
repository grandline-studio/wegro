---
name: anti-ai-slop-design
description: Use when a task creates or changes how a user-facing UI looks or is laid out - websites, landing pages, web apps, SaaS dashboards, internal tools, editorial or content pages, components, or visual workflows - or when asked to review a UI's design. Grounds design decisions in the product's real content, users, and existing design system; calibrates against generic AI-generated defaults without imposing a house style; requires a rendered desktop and mobile check before claiming completion. Skip for backend, CLI, or data work, and for frontend logic, state, data fetching, tests, or refactors that don't change what renders.
hooks:
  PostToolUse:
    - matcher: "Write|Edit|MultiEdit"
      hooks:
        - type: command
          command: 'f="$HOME/.claude/skills/anti-ai-slop-design/scripts/verify-gate.mjs"; [ -f "$f" ] || f="$CLAUDE_PROJECT_DIR/.claude/skills/anti-ai-slop-design/scripts/verify-gate.mjs"; [ -f "$f" ] && node "$f" track || true'
          timeout: 10
  Stop:
    - hooks:
        - type: command
          command: 'f="$HOME/.claude/skills/anti-ai-slop-design/scripts/verify-gate.mjs"; [ -f "$f" ] || f="$CLAUDE_PROJECT_DIR/.claude/skills/anti-ai-slop-design/scripts/verify-gate.mjs"; [ -f "$f" ] && node "$f" stop || true'
          timeout: 10
---

# Anti-AI-slop design

Make interfaces that belong to this product, its users, and their task. Distinctiveness comes from the brief: real content, domain, workflow, and brand. It does not come from a house style or from novelty. A familiar pattern, executed well and chosen on purpose, beats an unusual one chosen to look different.

## 0. Size the task first

- **Tier 0: adjustment** inside an existing UI (copy, spacing, a visual bug, one component). Follow the existing system exactly. No direction work. Do the light check in §6.
- **Tier 1: new screen or feature** in an existing product. Reuse its tokens and components. Before code, write a plan covering:
  - the job of the screen;
  - the layout, derived from the content (a wireframe only if it isn't obvious);
  - which components you reuse and which are new;
  - the states it needs;
  - the widths you'll check.
- **Tier 2: new product, new site, redesign, or no existing system.** Do the full context and direction work (§2–§4).

If unsure, use the lower tier and say so. Don't invent a new visual language for a feature request.

## 1. Hard constraints (every tier)

1. **The existing system wins.** Brand, tokens, components, and conventions outrank novelty, and so do the existing system's sizes and density. Deviate only when asked, or when the system breaks a constraint below, and say so.
2. **Honest content.** Never invent metrics, customers, testimonials, logos, awards, reviews, or certifications. Use real content. Where it's missing, use visible placeholders (`[Quote: needs a real customer]`) and list them in the delivery report. Plausible sample data in a prototype or internal tool is fine when it's labelled as sample.
3. **Accessibility floor (WCAG 2.2 AA):** text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 24px or ≥ 18.66px bold); component boundaries and focus indicators ≥ 3:1; visible keyboard focus; targets ≥ 24×24px or adequately spaced; status never shown by color alone; semantic HTML and labelled controls; no horizontal page scroll at 320px wide; non-essential motion respects `prefers-reduced-motion`.
4. **In what you build or change, anything that looks interactive works.** No inert decorative controls. Implement the states that the change actually involves (hover, focus-visible, active, selected, disabled, loading, empty, error, success). Don't expand scope to unrelated screens.
5. **Distinctiveness never costs clarity, readability, performance, or conversion.** If a choice trades one of these away, drop the choice.
6. **Verify the rendered result before claiming completion** (§6). If you can't, state exactly what was not verified.

## 2. Context (Tier 1–2)

Inspect the project first. Look at design docs (`design.md`, `DESIGN.md`, brand files), CSS variables, theme or Tailwind config, the component library, fonts, assets, and routes. Then establish:

- **Who and what.** Subject, audience, and their expertise.
- **The job.** The single most important action or understanding this screen must support.
- **Context of use.** Device, frequency (daily tool vs one visit), time pressure, environment.
- **Domain material.** Real objects, data, documents, places, processes, and vocabulary. These are where specific choices come from.
- **Constraints.** Brand, stack, performance budget, locales and scripts, legal.

The product type sets the priorities. Read the matching section of `references/contexts.md` (marketing, product/dashboard, editorial/content, commerce, feature-in-existing-system).

If a material fact is unknown, ask one concise question, or state a reasonable assumption and proceed.

## 3. Direction (Tier 2)

Before writing UI code, write a short brief in chat. Put it in a file only if the project already keeps design docs or the user asks.

- **Thesis.** One sentence: the point of view, and why it suits these users and this job.
- **Source of character.** Which domain element the design draws on (a material, an artifact, a data shape, a vernacular, a place). "Modern and clean" is not a source.
- **Tokens.**
  - Palette as semantic roles with hex values (surface, text, muted, accent/action, border, focus, status).
  - Type families with their roles and a scale.
  - Spacing scale.
  - Radius, border, and shadow rules, each with its reason.
  - Motion rules (or "none").
- **Layout.** A content-led structure. Add an ASCII wireframe for desktop and mobile only when the layout isn't obvious.
- **Where the boldness goes.** At most one or two places. For tools, "nowhere; clarity and density are the point" is often correct.

First list two or three genuinely different directions, one line each (different structure or type logic, not different accent colors). Then pick one and say why.

**Swap test** before building:

- Would this brief work unchanged for a direct competitor?
- Would I produce roughly this for any similar prompt?

Name the decisions that came from habit rather than the brief, and revise them. Then check the plan against §4.

## 4. Calibration: common generated-UI defaults

Generated UIs look alike because the same defaults appear unchosen. These clusters recur:

- the centered gradient hero, the big-number stat row, three identical icon cards, and same-radius cards with the same soft shadow;
- purple-to-blue on white; cream + high-contrast serif + terracotta; near-black + one acid accent;
- a fashionable display face, or a default sans, picked with no reason;
- one italic or colored word per headline;
- template chrome: ALL-CAPS eyebrows everywhere, `A · B · C`, `→` on every link, 01/02/03 on non-sequences;
- fade-up on every section;
- "Elevate / Unlock / Seamlessly" copy;
- blobs and fake charts.

None are banned. Each is right when the brief or content calls for it. The fix is a reason, not an inversion: inverting a default produces the next one, and a system or neutral sans is often correct in dense product UI.

**For Tier 1–2 planning and for reviews, read `references/defaults.md`.** It lists each default with when it's legitimate, plus convergence patterns observed in testing.

Opt-in experiment: **only if `~/.claude/design-log.md` already exists**, read its last entries and don't reuse a recent direction unless asked, then append one line after a Tier-2 build (date, project, thesis, palette, type, layout idea). Never create the file.

## 5. Build

Work in this order: content and structure → layout at mobile and desktop → type and color tokens → components and states → motion last (if any).

- Use the project's tokens or conventions (CSS variables, theme config, utility classes). For a new system, put colors, fonts, and spacing in CSS custom properties. Don't refactor an existing codebase into tokens unless asked.
- Use real content from the first pass. Lorem ipsum hides hierarchy and wrapping problems.
- Watch CSS specificity and shorthand: a section's `padding: X 0` silently resets a container's side padding, and section-level rules often cancel component spacing.
- Numbers and craft details (type scale, measure, numerals, font loading, color in dark mode, density, motion timing, breakpoints, image handling, UI copy) are in `references/craft.md`. Read the parts you need.

## 6. Verify the rendered UI

**Light check (Tier 0):** render the affected view at the width you changed, plus 320, and look at it. Run `node "${CLAUDE_SKILL_DIR}/scripts/qa.mjs" <url-or-file> --widths <w>x<h>,320x640`, or use a browser screenshot. Exercise keyboard and states only if you changed an interactive component.

**Full check (Tier 1–2):**

1. Run the page (dev server, preview, or a static file).
2. Run `node "${CLAUDE_SKILL_DIR}/scripts/qa.mjs" <url-or-file>`.
   - It screenshots 1440×900, 390×844, and 320×640 (fold and full page), after scrolling once so reveals render.
   - It checks overflow, console and network errors, fonts that failed to load, text contrast, target sizes, unnamed controls, missing alt text, heading order, line length, keyboard focus visibility (up to 40 stops), infinite animation under reduced motion, and axe-core (when available).
   - It reports pattern signals (distinct radii, uppercase labels, gradient text, and similar) as observations.
   - Output goes to `.design-qa/` (self-gitignored).
   - Options: `--widths` sets sizes, and `--dpr 2` gives sharper type when you need to judge rendering.
   - It can't measure contrast for text over images or gradients ("unknown bg"). Check those in the screenshot.
3. **Open and look at every screenshot.** Reading the code is not a visual check.
4. Fix the hard findings, then the visible ones:
   - clipping or overlap
   - awkward line breaks and lone words in headings
   - unbalanced whitespace
   - bad crops
   - misalignment
   - a hierarchy that doesn't read in one glance
   - a mobile layout that is just the desktop squeezed
5. Exercise interaction: keyboard through the primary flow, and empty, error, and loading states where they exist.
6. Re-run and re-look after fixes. For Tier 2 work or a requested audit, score with `references/review.md`.

If `qa.mjs` can't run (no Playwright library), use the session's browser tool (built-in browser pane, Claude in Chrome, Playwright or Chrome DevTools MCP) at the same widths. Then record it with `node "${CLAUDE_SKILL_DIR}/scripts/qa.mjs" --mark "<what you checked, with which tool>"`.

This skill registers a Stop hook. If UI files you edited with Write or Edit haven't been rendered since, it asks once (at most twice per session) for a QA run, a `--mark`, or a plain statement that the UI wasn't visually verified.

## 7. Deliver

Report briefly:

- **Decisions.** For Tier 2, the thesis and the one or two most brief-specific decisions.
- **Verification.** What was verified, at which widths, with which tool, and what the checks found and you fixed.
- **Open items.** What remains unverified, placeholders that need real content, and trade-offs you made.

Give evidence, not adjectives. Don't call the work "stunning", "premium", or "polished".

For high-stakes Tier 2 work, offer a fresh-context review (an extra agent run, so it costs more): a reviewer given only the brief, the screenshots, and `references/review.md`.

## Audit mode

When asked to review a UI without changing it: run `qa.mjs`, view the screenshots, score with `references/review.md`, and return prioritized findings. Each finding gets a severity, the evidence (screenshot or check), and a concrete fix. Don't edit files.

## Supporting files

- `references/contexts.md`: priorities and failure modes per product type.
- `references/defaults.md`: annotated defaults and observed convergence patterns.
- `references/craft.md`: typography, color, spacing, components, motion, responsive, imagery, and copy, with numbers.
- `references/research.md`: studying references and extracting principles without copying.
- `references/review.md`: rubric for rendered review and audits.
- `scripts/qa.mjs`: rendered QA (screenshots plus deterministic checks).
- `scripts/verify-gate.mjs`: the Stop hook. It tracks UI files Claude edits and asks for verification if they haven't been rendered since.
