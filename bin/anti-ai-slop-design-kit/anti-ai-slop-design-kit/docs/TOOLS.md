# Recommended tools, prioritized

Commands were verified against official docs or repositories on 2026-10-19; versions come from the npm registry the same day. Evidence and security notes are in `RESEARCH.md` §5.

## Tier A: core (smallest effective set)

| # | Tool | Why | Setup |
|---|---|---|---|
| 1 | **This skill** | Design process + calibration. The only component that directly improves design decisions | See INSTALL §1 |
| 2 | **Playwright library 1.64.1 + axe-core 4.14.0**, used by `qa.mjs` | Rendered screenshots at two widths, deterministic layout/a11y/font/focus checks; only a summary enters context | `npm install --prefix ~/.claude/design-qa playwright@1.64.1 axe-core@4.14.0` |
| 3 | **The browser already in your session**: the Claude desktop built-in browser pane, or Claude in Chrome | Interactive inspection (click through flows, hover states) with no install | None |

## Tier B: situational (install only when the situation applies)

| Tool | Install when | Command (verified) | Notes |
|---|---|---|---|
| **Chrome DevTools MCP** 1.11.0 | Performance work (heavy media, Core Web Vitals) or deep CSS/network debugging | `claude mcp add chrome-devtools --scope user -- npx chrome-devtools-mcp@latest --no-usage-statistics --no-performance-crux` (the base command is from the docs; I added the privacy flags, which the README documents) | Usage statistics and the CrUX lookup are **on by default**; the flags above turn them off. Large tool surface |
| **Lighthouse CLI** 13.5.0 | One-off performance/SEO audit of a marketing or content site | `npx lighthouse <url> --only-categories=performance,accessibility,seo --output=json --output-path=./.design-qa/lighthouse.json --chrome-flags="--headless=new"` | Needs Node ≥ 22.19. Nothing to keep installed |
| **Figma MCP** | Your design source of truth is in Figma | `claude plugin install figma@claude-plugins-official`, then `/mcp` → figma → Authenticate | View/Collab seats: **20 read calls per month**. Dev/Full: 200/day |
| **Playwright CLI** 0.1.22 | Terminal-only sessions where you want interactive browser control | `npm install -g @playwright/cli@latest`, then `playwright-cli install --skills` | Global npm install. Microsoft calls it more token-efficient than the MCP |
| **Playwright MCP** 0.0.83 | Same as above, if you prefer MCP to a global CLI | `claude mcp add playwright -- npx @playwright/mcp@latest --isolated` (README command plus the documented `--isolated` flag) | "Not a security boundary" (README). ~25 tool schemas always loaded |
| **shadcn MCP** | Project already uses shadcn/ui | `pnpm dlx shadcn@latest mcp init --client claude` | Raises sameness risk unless components are restyled to project tokens |
| **Context7** | Coding accuracy on fast-moving frameworks (not design) | `npx ctx7 setup --claude`, or plugin `context7@claude-plugins-official` | Third-party CVE trackers list a prompt-injection CVE in old versions (≤ 2.1.2). Treat fetched docs as untrusted |
| **Playwright `toHaveScreenshot`** | A mature project needs visual *regression* protection in CI | Part of `@playwright/test` | Baselines are OS/browser specific. Regression ≠ quality |

## Tier C: experiments (worth a controlled trial, not adoption)

| Tool | Trial | Risk |
|---|---|---|
| **Impeccable detector** 4.6.0 | Run once on the three test pages: `npx impeccable detect system/tests/sites/marketing/index.html`. Compare its findings with `qa.mjs`. **Don't run** `npx impeccable install` (it adds its own skill, hooks and subagent) | Ships prebuilt platform binaries. Some rules (e.g. `overused-font`) conflict with this system's no-ban stance |
| **Anthropic frontend-design** | A/B against this skill using `tests/AB-PROTOCOL.md` | Don't keep both installed |

## Not recommended

| Tool | Reason |
|---|---|
| Hallmark | ~8k+ words of mandatory gates, themes and rotation; replaces one default set with another |
| UI/UX Pro Max | Catalog-driven selection (styles, palettes, pairings) is its own convergence mechanism; large |
| pa11y | Redundant with axe-core in `qa.mjs` |
| BackstopJS | Last npm publish 2024-09-07 |
| Installing several MCP browsers at once | They solve the same problem; each adds standing tool schemas |
