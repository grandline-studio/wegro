# anti-ai-slop-design: a Claude Code skill

A design skill for Claude Code that helps it build interfaces that don't look generically AI-generated. It also makes Claude **check the rendered page at desktop and mobile widths** before saying the work is done.

It doesn't impose a house style. A marketing site, a dense dashboard, and a long-read article should come out looking different, each fitted to its own content and users.

## What you get

| Path | What it is |
|---|---|
| `anti-ai-slop-design/` | The skill. Copy this folder into `~/.claude/skills/` |
| `anti-ai-slop-design/scripts/qa.mjs` | Takes screenshots at 1440, 390 and 320px and runs automatic checks: overflow, contrast, fonts that didn't load, keyboard focus, labels, alt text, and axe accessibility rules |
| `anti-ai-slop-design/scripts/verify-gate.mjs` | A hook that runs only after the skill is used. If Claude edited UI files and never rendered them, it asks Claude to check once (at most twice per session) |
| `CLAUDE.md-snippet.md` | Optional: three lines for your global `~/.claude/CLAUDE.md` |
| `docs/` | Background: research and sources, architecture decisions, and tool recommendations |

## How it behaves

1. **It sizes the task.**
   - Small tweak: follow the existing design and do a quick check.
   - New feature in an existing product: a short plan.
   - New site or redesign: a design brief before any code.
2. **The existing design system wins** over new visual ideas, unless you ask for a redesign.
3. **No invented proof:** no fake testimonials, logos, or metrics. Placeholders are clearly marked instead.
4. **WCAG 2.2 AA accessibility floor:** contrast, focus, target sizes, 320px reflow, and reduced motion.
5. **It checks the rendered result.** Claude runs `qa.mjs`, looks at the screenshots, fixes what it sees, and then reports what it verified.

It triggers on its own for UI work. You can also call it with `/anti-ai-slop-design`. It stays out of backend work, and out of frontend logic or test changes that don't change what renders.

## Requirements

- Claude Code
- Node.js 18 or newer
- Google Chrome or Microsoft Edge installed. It uses your installed browser, so there's no browser download.

## Install

The folder must keep the name `anti-ai-slop-design`. The hook finds its script by that name.

**macOS / Linux**

```bash
mkdir -p ~/.claude/skills && cp -r anti-ai-slop-design ~/.claude/skills/
```
```bash
npm install --prefix ~/.claude/design-qa playwright@1.64.1 axe-core@4.14.0
```

**Windows (PowerShell)**

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\skills" | Out-Null; Copy-Item -Recurse .\anti-ai-slop-design "$env:USERPROFILE\.claude\skills\"
```
```powershell
npm install --prefix "$env:USERPROFILE\.claude\design-qa" playwright@1.64.1 axe-core@4.14.0
```

The second command installs Playwright and axe-core into a private folder (`~/.claude/design-qa`), not globally.

**Check that it works** (macOS / Linux; on Windows, swap the path for the PowerShell one):

```bash
node ~/.claude/skills/anti-ai-slop-design/scripts/qa.mjs https://example.com --out ./qa-smoke
```

You should see "Design QA: https://example.com (browser: chrome, axe-core on)" and screenshots in `./qa-smoke`.

**Optional:** add the three lines from `CLAUDE.md-snippet.md` to `~/.claude/CLAUDE.md` (back the file up first).

Start a **new** Claude Code session afterwards. The skill should appear when you type `/`.

**If you also have Anthropic's `frontend-design` plugin installed,** consider turning it off. Two design skills that trigger on the same work give conflicting advice.

## Uninstall

```bash
rm -rf ~/.claude/skills/anti-ai-slop-design ~/.claude/design-qa
```

Then remove the three lines from `~/.claude/CLAUDE.md` if you added them. The skill's QA output goes into a `.design-qa/` folder in your projects. That folder ignores itself in git, and you can delete it any time.

## Honest status

- **Tested:**
  - The QA script catches planted defects and real bugs that code review missed.
  - The hook was tested live in Claude Code (2.1.296, Windows).
  - Three test sites (marketing, dashboard, editorial) came out with clearly different designs.
- **A/B evidence:** a single comparison against plain Claude. The skill triggered on its own, removed common AI-template tells, and made Claude check and fix its own render. It used about 3× more time and tokens.
- **Not proven:** a statistically meaningful quality gain. That would need a blind multi-run comparison.
- **Known gaps:**
  - Edits made through shell commands aren't tracked by the hook.
  - The contrast check can't measure text over images or gradients.
  - The hook command is POSIX shell. That's fine on macOS and Linux, and on Windows, where Claude Code runs hooks in Git Bash.

Built with Claude Code, October 2026. Treat it like any third-party skill: read `SKILL.md` before installing.
