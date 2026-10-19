# Research report

Date of research: 2026-10-19. Everything marked **Verified** was checked that day against the source linked next to it (official docs, the repository, or the npm registry). **Opinion** marks my judgement. **Unverified** marks claims I could not confirm from a primary source.

---

## 1. Why AI-generated interfaces look alike

| Finding | Status | Source |
|---|---|---|
| Models without direction sample from the "high-probability center" of web design in their training data. Anthropic calls this *distributional convergence*. | Verified (Anthropic's own explanation, not an independent study) | [Anthropic: Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills) |
| Banning specific defaults moves the model to the *next* default. Anthropic saw Space Grotesk replace Inter across generations. | Verified (Anthropic's observation) | same |
| Post-training reduces output diversity (mode collapse). One documented cause is *typicality bias*: human raters prefer familiar outputs. | Verified (peer-reviewed-track arXiv paper) | [Zhang et al., Verbalized Sampling, arXiv:2510.01171](https://arxiv.org/abs/2510.01171) |
| Anthropic's current skill names five clusters that generated design falls into: cream + serif + clay; near-black + one acid accent; broadsheet with hairlines; the SaaS card kit; and template "chrome" (eyebrows, `A · B · C`, `→`, mono labels). | Verified (local copy of the official plugin, last updated 2026-09-01) | `claude-plugins-official/plugins/frontend-design/skills/frontend-design/SKILL.md`; [commit history](https://github.com/anthropics/claude-plugins-official/commits/main/plugins/frontend-design) |

**What follows from this (opinion, grounded in the findings above):**

1. Blocklists alone don't work. They just move the mode. The lasting fix is to make decisions *depend on inputs the model can't get from its prior*: the product's real content, its domain, its users' task, and the existing brand. That's why the redesigned skill starts with context and makes "swap test" reasoning explicit.
2. Some sameness is correct. Conventional patterns (a top nav, a data table, a form) are conventional because users already know them. The goal is to remove *unchosen* sameness, not to make things look different.
3. With no memory across projects, an agent repeats its own signature. A tiny opt-in log of past directions is the cheapest counter, so I shipped it as an **experiment**, not a rule.

## 2. Design fundamentals: numbers with sources

Only rules that have a defensible source or a measurable reason became hard constraints.

| Topic | Rule used | Status / source |
|---|---|---|
| Text contrast | ≥ 4.5:1 normal text, ≥ 3:1 large text (≥ 24px, or ≥ 18.66px bold) | Verified: WCAG 2.2 SC 1.4.3 (AA) |
| Non-text contrast | ≥ 3:1 for UI component boundaries, focus indicators, meaningful graphics | WCAG 2.2 SC 1.4.11 (AA). Taken from the spec text I know; I didn't re-fetch it this session |
| Target size | ≥ 24×24 CSS px, or enough spacing; inline links are exempt | Verified: [WCAG 2.2 SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) (AA) |
| Line length | ≤ 80 characters (AAA). The 45–75 typographic tradition is a starting range, not a law | Verified: [WCAG 2.2 SC 1.4.8](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) (AAA); Bringhurst range (opinion/tradition) |
| Reflow | Usable at 320 CSS px wide with no two-direction scrolling | WCAG 2.2 SC 1.4.10 (AA), from spec knowledge |
| Focus visible | Keyboard focus indicator must be visible | WCAG 2.2 SC 2.4.7 (AA) |
| Status not by color alone | Use color plus text, icon, or shape | WCAG 2.2 SC 1.4.1 (A) |
| Reduced motion | Honour `prefers-reduced-motion` for non-essential motion | WCAG 2.3.3 is AAA. Treated as a strong default, not a legal floor |
| Automated a11y coverage | axe finds ~57% of issues **by volume** in Deque's own audit data. The commonly quoted 20–30% is by **criteria count** | Verified as Deque's claim (vendor study, 2021): [Deque](https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues). Playwright's docs: "automated testing cannot detect all types of WCAG violations" ([Playwright](https://playwright.dev/docs/accessibility-testing)) |
| Apple 44×44pt tap target | Unverified: the HIG page wouldn't render for fetching. Not used as a rule; WCAG's 24px floor is used instead, with 44px as an opinion-level recommendation for primary touch actions |

Things I deliberately did **not** turn into rules, because no defensible source supports a fixed number: a maximum number of fonts, a maximum number of colors, a mandatory serif/sans pairing, a mandatory signature element, asymmetry, mandatory motion, or a ban on any specific font, gradient, card, radius, or theme.

## 3. Reference research without copying

Opinion, informed by common practice. There is no primary source:

- Study several references that use **different** visual languages, and write down *principles* (why a composition works) rather than surface traits.
- Never reuse another site's brand assets, signature illustration, copy, or exact layout. Copyright and trade dress apply to distinctive expression, and copying also defeats the purpose of being specific.
- Gallery browsing by an agent is expensive in tokens and pushes toward whatever the gallery currently features (another convergence source). So reference research is **on demand** only: when the user supplies references or asks for exploration.

## 4. Claude Code mechanics that shaped the architecture

| Fact | Status | Source |
|---|---|---|
| Skill descriptions are always in context; the body loads only when invoked. Description + `when_to_use` is truncated at 1,536 chars. | Verified | [Skills docs](https://code.claude.com/docs/en/skills) |
| Keep `SKILL.md` under 500 lines; supporting files load only when referenced. | Verified | same |
| After loading, skill content stays in context. On compaction, the first 5,000 tokens of each invoked skill are re-attached. | Verified | same. **Implication:** keep the core skill well under ~5k tokens so it survives compaction intact |
| CLAUDE.md: target < 200 lines. Imports don't reduce context cost. Multi-step procedures belong in skills. | Verified | [Memory docs](https://code.claude.com/docs/en/memory) |
| CLAUDE.md is context, not enforcement. Use hooks for things that must happen. | Verified | Memory docs; [Steering article (2026-06-18)](https://claude.com/resources/articles/steering-claude-code-skills-hooks-rules-subagents-and-more) |
| Skill frontmatter can declare hooks. They register when the skill is invoked, stay for the rest of the session, and `once: true` removes a hook after its first successful run. | Verified | [Hooks docs → Hooks in skills and agents](https://code.claude.com/docs/en/hooks) |
| **`${CLAUDE_SKILL_DIR}` is substituted in the skill body but NOT in frontmatter hook commands** (Claude Code 2.1.296, Windows). The hook got an empty value and looked for `C:\Program Files\Git\scripts\…` | **Verified by live test** (debug log), not in docs | — |
| A Stop hook can block once with `decision: "block"`. `stop_hook_active` prevents loops, and there's a cap of 8 consecutive continuations. | Verified | Hooks docs |
| Plugins show "Context cost" estimates in `/plugin`, and `claude plugin details <name>` shows always-on tokens. | Verified | [Discover plugins docs](https://code.claude.com/docs/en/discover-plugins) |

## 5. Tool evaluation

Columns: what the tool improves (**Design** = visual/design decisions, **Code** = coding accuracy, **Browser** = rendered verification, **A11y**, **Perf**), maintenance (latest npm publish or commit), security, cost, install, and overlap with this system.

### 5.1 Anthropic `frontend-design` (official plugin)

- **Improves:** Design (instructions only).
- **Maintenance:** Verified active. Six commits; the latest, on 2026-09-01, updated SKILL.md. Lives in the official marketplace, which auto-updates by default.
- **Capabilities:** About 1,500 words: art-direction persona, calibration list of five generated-design clusters, a two-pass plan → review → build process, restraint, and a copywriting section. No scripts, no hooks, no verification enforcement ("taking screenshots … if your environment supports it").
- **Security:** Instructions only, Apache-2.0. Low risk.
- **Cost:** Free. Context cost is roughly the size of the skill when invoked.
- **Install:** `claude plugin install frontend-design@claude-plugins-official` (shell) or `/plugin install frontend-design@claude-plugins-official` (session). Verified syntax from the plugin docs.
- **Overlap:** High, about 70% of the old draft restated it. Its weaknesses for your use: it biases toward "take aesthetic risk" (fine for marketing, wrong for an internal dispatch tool), it bans all-caps labels outright, it has no product-type calibration, and it doesn't require rendered verification.
- **Decision:** Don't co-install it with this skill, because two overlapping skills that both trigger on UI work create conflicting guidance. Its calibration list and copy guidance are incorporated (credited) into the new skill. Keep it as the **A/B comparator** (see `tests/AB-PROTOCOL.md`).

### 5.2 Playwright MCP (`@playwright/mcp`, Microsoft)

- **Improves:** Browser (interactive navigation, screenshots, console, network). Not design directly.
- **Maintenance:** Verified active. v0.0.83 published 2026-09-28, Apache-2.0. Still a 0.0.x version number.
- **Capabilities:** 25 default tools, with more behind `--caps` (vision, network, storage, devtools, pdf, testing). Uses the accessibility tree by default; `browser_take_screenshot` and `browser_resize` exist.
- **Security:** Verified quotes: "Playwright MCP is not a security boundary." `browser_run_code_unsafe` is "RCE-equivalent". File access is restricted to workspace roots by default. Persistent profiles keep logins unless you use `--isolated`.
- **Cost:** Free. Token cost: about 25 tool schemas in context, plus verbose snapshots. Microsoft's own README recommends the **Playwright CLI + skills** for coding agents because it is "more token-efficient".
- **Install:** `claude mcp add playwright npx @playwright/mcp@latest` (verified, README), or the official marketplace plugin `playwright@claude-plugins-official` (verified, local marketplace copy runs `npx @playwright/mcp@latest`).
- **Overlap:** Overlaps the Claude desktop app's built-in browser pane, Claude in Chrome, Chrome DevTools MCP, and the bundled `qa.mjs` script.
- **Decision:** **Optional.** Recommended only if you work in the terminal CLI without another browser tool and want *interactive* exploration (clicking through flows). Use `--isolated`.

### 5.3 Playwright CLI (`@playwright/cli`, Microsoft): the stronger alternative to 5.2

- **Improves:** Browser.
- **Maintenance:** Verified. v0.1.22 published 2026-09-28.
- **Capabilities:** `screenshot`, `resize`, `snapshot --boxes`, `open --device="iPhone 15"`. Installs skills with `playwright-cli install --skills`.
- **Cost:** Lower token use than MCP (per Microsoft's README). Needs a **global** npm install (`npm install -g @playwright/cli@latest`), which your rules say needs approval.
- **Decision:** **Optional**, preferred over Playwright MCP for CLI-only users who want interactive control. Not needed for the core workflow.

### 5.4 Chrome DevTools MCP (`chrome-devtools-mcp`, ChromeDevTools org / Google)

- **Improves:** Browser, Perf (traces, insights), A11y/SEO via `lighthouse_audit` (the Lighthouse tool excludes the performance category; performance comes from traces).
- **Maintenance:** Verified very active. v1.11.0 published 2026-10-15, Apache-2.0.
- **Capabilities:** `take_screenshot` (full page or element), `emulate` (viewport, color scheme, network/CPU throttling), `resize_page`, `get_css_styles`, console, network, memory, and more.
- **Security / privacy:** Verified. **Usage statistics are on by default** (opt out with `--no-usage-statistics`), update checks are on by default, and performance tools may send trace URLs to Google's CrUX API (`--no-performance-crux`). It exposes browser content to the MCP client.
- **Cost:** Free. Large tool surface.
- **Install:** `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest`, or the plugin via `/plugin marketplace add ChromeDevTools/chrome-devtools-mcp` then `/plugin install chrome-devtools-mcp@chrome-devtools-plugins`. Verified from its client-configuration docs. Requires Node ^20.19 / ^22.12 / ≥23.
- **Overlap:** Overlaps Playwright MCP for browsing. It is the stronger pick when **performance** debugging matters.
- **Decision:** **Optional, situational.** Install when a project needs performance work (marketing sites with heavy media, Core Web Vitals). Run it with `--no-usage-statistics --no-performance-crux` unless you're happy to share that data.

### 5.5 axe-core / `@axe-core/playwright` (Deque)

- **Improves:** A11y (deterministic WCAG rule checks, including computed color contrast).
- **Maintenance:** Verified. axe-core 4.14.0 (2026-10-05) and @axe-core/playwright 4.14.0 (2026-10-15), MPL-2.0.
- **Capabilities:** Rule engine run inside the page. Its rules are designed to avoid false positives (Deque).
- **Security:** A library you inject into your own local page. Low risk.
- **Cost:** Free. Zero standing token cost when used from a script, since only the summary enters context.
- **Decision:** **Core.** Used by the bundled `qa.mjs` when `axe-core` can be resolved; the script degrades gracefully without it.

### 5.6 Context7 (Upstash)

- **Improves:** Code only (current library docs). **Not design.**
- **Maintenance:** Verified active. `@upstash/context7-mcp` 4.4.2 published 2026-10-15, MIT. The official marketplace plugin connects to the hosted server `https://mcp.context7.com/mcp`.
- **Security:** The README disclaims that community-submitted docs may be inaccurate or insecure. Third-party CVE trackers list **CVE-2026-75130** (prompt injection through the "Custom AI Instructions" feature, affecting ≤ 2.1.2) ([OpenCVE](https://app.opencve.io/cve/CVE-2026-75130), [Mend](https://mend.io/vulnerability-database/CVE-2026-75130/)). **Unverified at vendor level:** the GitHub repo shows no published advisory, and NVD wouldn't render for fetching. Current versions are far past 2.1.2. Either way it is a channel through which third-party text reaches your agent.
- **Cost:** Free tier with an optional API key for higher limits. Paid tiers aren't documented in the README. Queries go to Upstash servers.
- **Decision:** **Not part of the design system.** Useful separately for coding accuracy with fast-moving frameworks. If you use it, treat fetched docs as untrusted data.

### 5.7 Figma MCP (official)

- **Improves:** Design, but only when design files exist (reads variables, components, layout; can write to the canvas).
- **Maintenance:** Verified. Official, documented by Figma.
- **Cost / limits:** Verified rate limits for read tools: View/Collab seats get **20 calls per month**; Dev/Full on Professional get 200/day and 10/min; Organization 200/day and 15/min; Enterprise 600/day and 20/min. Canvas writes need a Full seat outside drafts and are free during the beta.
- **Install:** `claude plugin install figma@claude-plugins-official`, or `claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp`, then `/mcp` → Authenticate. Verified.
- **Decision:** **Situational.** Only when Figma is part of the real workflow. It doesn't make designs less generic by itself; it gives the agent the real brand system, which *is* the strongest anti-generic input when one exists.

### 5.8 shadcn MCP

- **Improves:** Code (component registry access). Verified install: `pnpm dlx shadcn@latest mcp init --client claude`.
- **Decision:** **Situational**, only for shadcn projects. Pulling more stock components *raises* sameness risk unless they're restyled to project tokens.

### 5.9 Stronger or adjacent alternatives considered

| Tool | Improves | Verified status | Decision |
|---|---|---|---|
| **Impeccable** (`impeccable`, pbakaus) | Design (instructions) + a deterministic **detector** (`npx impeccable detect <path\|url>`, exit 0/2/1, ~61 rules: gradient text, overused fonts, low contrast, overflow, design-system drift) | v4.6.0, 2026-10-15, Apache-2.0. Ships **platform-specific prebuilt binaries** (`@impeccable/cli-windows-x64`), which are harder to audit than JS. Installer adds hooks + a subagent for Claude Code. Effectiveness evidence is curated screenshots; no benchmark found. | **TEST, not core.** The detector is the most relevant third-party tool, but some rules (e.g. `overused-font`) encode bans that this system deliberately rejects, and the full install overlaps the skill. If you trial it, run **only** `npx impeccable detect` on a test page and don't run the installer. I did **not** execute it here (third-party binary; you said install nothing). |
| **Hallmark** (`nutlope/hallmark`) | Design (instructions) | MIT, ~30k stars. About 8,000+ words with 58 gates, 21 themes, rotation logs, and hard rules such as "headings are never italic". | **Not recommended.** Its large catalog of mandatory themes and gates replaces one default set with another. Context cost is high. |
| **UI/UX Pro Max** | Design reference database (styles, palettes, pairings) | MIT, ~137k stars. Python search script; npm CLI global install or plugin. Its own before/after is labelled "not an official demo, benchmark". | **Not recommended** as a default. Picking from a catalog is a convergence mechanism of its own. |
| **Lighthouse CLI** | Perf, A11y, SEO | v13.5.0 (2026-09-18), Node ≥ 22.19. Run on demand: `npx lighthouse <url> --only-categories=performance,accessibility --output=json` | **Situational** (marketing/content sites). No install needed beyond npx at run time. |
| **pa11y** | A11y | v10.0.0 (2026-08-28), LGPL | Redundant with axe-core in `qa.mjs`. Not recommended. |
| **Playwright `toHaveScreenshot`** | Visual *regression* | Verified docs: baselines are OS/browser specific, so run them where they were created | **Situational**, for mature projects in CI. Regression testing protects a design; it doesn't judge one. |
| **BackstopJS** | Visual regression | Last npm publish **2024-09-07** (stale) | Not recommended. |
| **Chromatic / Percy** | Visual regression (hosted) | Paid SaaS; not evaluated in depth | Only if a team already uses Storybook/CI review. |
| **Claude desktop built-in browser pane / Claude in Chrome** | Browser | Built into the Claude desktop app / available as the Chrome extension | **Use first** when running in the desktop app; no install needed. |

### 5.10 Which tools improve what

| Category | Tools that actually move it |
|---|---|
| **Design quality (direct)** | Only the skill's process (context → direction → swap test → build → look at screenshots → revise). Figma MCP only when real design files exist. **No tool makes a design less generic by itself**; the detector-style tools flag symptoms. |
| **Coding accuracy** | Context7, shadcn MCP (situational). |
| **Browser verification** | Bundled `qa.mjs` (Playwright library), built-in browser pane, Playwright MCP/CLI, Chrome DevTools MCP. |
| **Accessibility** | axe-core (in `qa.mjs`), plus `qa.mjs`'s own focus, target, contrast, and heading checks. Manual keyboard pass still required. |
| **Performance** | Lighthouse CLI, Chrome DevTools MCP traces (situational). |

### 5.11 Smallest effective combination

1. **The redesigned skill** (instructions + references loaded on demand).
2. **The bundled `qa.mjs`**, which uses the Playwright *library* and optionally axe-core, installed into an isolated folder under `~/.claude/` (not a global npm install). It drives your installed Chrome/Edge, so there's no browser download. This one script covers screenshots at two widths, overflow, console errors, fonts that silently failed to load, contrast, targets, focus visibility, headings, reduced motion, and axe.
3. **Whatever browser tool the session already has** (desktop browser pane, or Claude in Chrome) for interactive inspection.

Everything else is situational. I recommend no MCP server by default.

## 6. How to evaluate design quality from rendered output

- Code review can't certify visual quality. Clipping, fallback fonts, and contrast over images only appear when rendered. The test run in this project confirmed this (see `tests/TEST-REPORT.md`).
- Rendered evaluation = screenshots at ≥ 2 widths that the agent **actually views**, plus deterministic checks on the live DOM (computed styles, geometry), plus an interaction pass (keyboard focus, states).
- Judging "generic vs. specific" stays a model or human judgement. It can be structured (swap test, rubric in `references/review.md`) but not automated honestly. Pattern *signals* (count of distinct radii, uppercase micro-labels, gradient text, identical card grids) are reported as observations, never as pass/fail.
