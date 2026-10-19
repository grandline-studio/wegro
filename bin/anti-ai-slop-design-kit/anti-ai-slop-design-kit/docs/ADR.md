# ADR-001: Architecture of the anti-AI-slop design system

Status: **Accepted** (2026-10-19). Revised once after an independent cold-context review.
Date: 2026-10-19

## Context

- Generic output is caused by sampling from the center of the training distribution and by typicality bias (RESEARCH §1). Blocklists move the mode rather than removing it.
- Claude Code loads CLAUDE.md every session, loads skill bodies only on use, and treats both as context, not enforcement. Hooks enforce. Skill-frontmatter hooks register only after the skill is invoked (RESEARCH §4).
- The user builds several kinds of products (marketing sites, SaaS, dashboards, workflows), so one aesthetic cannot be right.
- The original draft overlapped ~70% with Anthropic's `frontend-design` skill and relied on instructions for verification.

## Decision

| Layer | What goes there | Why there | Cost |
|---|---|---|---|
| **Global `~/.claude/CLAUDE.md`** (3 lines) | (1) route UI work to the skill; (2) an existing design system outranks novelty; (3) never claim visual quality without a rendered check, and say what wasn't verified | These must hold even when the skill isn't loaded, e.g. a quick CSS fix where the skill didn't trigger. Everything else is task-specific and would cost tokens in every unrelated session | ~70 tokens per session |
| **Skill `anti-ai-slop-design/SKILL.md`** (~1,700 words, under the 5k-token compaction re-attach budget) | Task tiers, hard constraints, context → direction → swap test → build → render → review loop, compact defaults calibration, delivery report | A multi-step procedure belongs in a skill (memory docs). The description is always visible for auto-routing; the body costs nothing until used | Description ~110 tokens per session; body on use |
| **References (load on demand)** | `contexts.md` (5 product types), `defaults.md` (annotated reflex patterns), `craft.md` (type/color/space/motion/responsive numbers), `research.md` (references without copying), `review.md` (rendered review rubric) | Progressive disclosure: an editorial page doesn't need dashboard guidance; a 2-line fix needs none of it | 0 until read |
| **Script `scripts/qa.mjs`** | Screenshots at desktop and mobile widths, plus deterministic DOM checks and optional axe-core | Deterministic checks belong in code, not prose. Output is a short summary, so token cost is small. Works in CLI and desktop | Needs the Playwright library + local Chrome/Edge |
| **Skill-scoped hooks `scripts/verify-gate.mjs`** (on with the skill; delete the `hooks:` block to disable) | PostToolUse records UI files Claude writes; Stop blocks (at most twice per session) if any is newer than the last `qa.mjs` run | Converts "should verify" into "will be asked to verify", only in sessions that invoked the skill. Tracking Claude's own edits (not file mtimes) avoids false blocks from your editor, generated HTML, and template formats, and needs no folder scan. Live-tested twice: `${CLAUDE_SKILL_DIR}` isn't expanded in hook commands, so the command locates the script via `$HOME`, then `$CLAUDE_PROJECT_DIR` | Two blocks per session at most; ~0.1s per call |
| **Subagents** | **None shipped** | Design review benefits from a cold context, but it doubles cost on every task. Offered as an on-demand step in `review.md` ("fresh-context review") for high-stakes work only | 0 by default |
| **MCP servers** | **None required** | RESEARCH §5.11: no MCP improves design quality by itself. The browser tools Claude Code users usually already have (desktop browser pane, Claude in Chrome) plus `qa.mjs` cover verification | 0 |
| **Experiment: direction log** | Opt-in one line per new visual direction in `~/.claude/design-log.md` | The only workable counter to cross-project self-repetition without memory. Unproven, so it's opt-in | ~1 line read per Tier-2 task |

## Alternatives considered

1. **Install Anthropic `frontend-design` as-is and add only `qa.mjs`.** This is cheapest to maintain because Anthropic updates it. Rejected as the default because it pushes every brief toward aesthetic risk, bans all-caps labels outright, has no product-type calibration, and doesn't require verification. Kept as the A/B comparator.
2. **Adopt Hallmark or Impeccable wholesale.** Rejected: large context, theme catalogs or font bans that replace one default set with another, and an installer that adds its own hooks and subagents. Impeccable's detector stays a **TEST** candidate.
3. **Put the design rules in global CLAUDE.md.** Rejected: ~2k tokens on every unrelated session (backend work, scripts, video), and lower adherence (memory docs).
4. **Global Stop hook in settings.json.** Rejected: it would fire in non-design sessions. Skill-scoped hooks give the same enforcement only where relevant.
5. **Playwright MCP as the verification layer.** Rejected as default: ~25 standing tool schemas, Microsoft recommends the CLI for coding agents, and it overlaps tools you already have. Kept optional.
6. **Visual regression (toHaveScreenshot, BackstopJS) as quality gate.** Rejected: regression detects change, not quality. Situational for mature projects.

## Consequences

- One skill to maintain. Third-party skill updates won't flow in automatically, so re-check the defaults calibration every few months (the list will date; RULE-AUDIT notes it).
- `qa.mjs` depends on the Playwright library. It is pinned in an isolated folder (`~/.claude/design-qa/`) and removed by deleting that folder.
- The Stop hook relies on file modification times, not transcript parsing. That's robust to Claude Code format changes, but a UI edit made by a non-file tool (e.g. a CMS) won't be noticed.
- "Generic vs specific" remains a judgement. The system structures that judgement (swap test, rubric) and makes it visible in the delivery report, but doesn't pretend to automate it.

## Smallest effective combination (decision)

`SKILL.md` + references + `qa.mjs` (Playwright library + axe-core, local Chrome/Edge) + the skill-scoped Stop hook, plus the 3-line CLAUDE.md addition. Optional: Chrome DevTools MCP for performance work, Figma MCP if you design in Figma.

Note: the skill folder must be named `anti-ai-slop-design` and live in `~/.claude/skills/` or `<project>/.claude/skills/`, because the hook command locates its script by that path.
