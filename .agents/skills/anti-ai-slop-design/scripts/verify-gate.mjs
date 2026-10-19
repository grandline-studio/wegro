#!/usr/bin/env node
// Skill-scoped hooks for anti-ai-slop-design. Registered only after the skill is invoked.
//   track (PostToolUse on Write|Edit|MultiEdit): remember UI files that Claude itself wrote.
//   stop  (Stop): if a tracked UI edit is newer than the last qa.mjs run, block the stop
//         and ask for a rendered check, or an explicit statement that the UI wasn't verified.
// Blocks at most twice per session, never twice in a row (stop_hook_active), and never
// breaks the session: any error exits 0. Edits made through Bash are not tracked (fails open).

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const mode = process.argv[2];
let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch {}

const stateDir = path.join(os.tmpdir(), 'anti-ai-slop-design');
const qaMarker = path.join(stateDir, 'qa-last.json'); // written by qa.mjs on every run and --mark
const sid = String(input.session_id || '').replace(/[^a-z0-9-]/gi, '');
const sessionFile = sid && path.join(stateDir, `${sid}.json`);

// Files that render UI. Server/email/config template formats (.erb, .j2, .hbs, .mdx, ...) are
// deliberately excluded: they are often not visual work and caused false blocks.
const UI_EXT = /\.(html?|css|scss|sass|less|jsx|tsx|vue|svelte|astro)$/i;
const GENERATED = /[\\/](node_modules|dist|build|out|\.next|\.nuxt|\.svelte-kit|\.output|coverage|storybook-static|playwright-report|test-results|_site|\.design-qa)[\\/]/i;
const MAX_BLOCKS = 2;

const load = () => { try { return JSON.parse(fs.readFileSync(sessionFile, 'utf8')); } catch { return { edits: [], blocks: 0 }; } };
const save = (s) => { fs.mkdirSync(stateDir, { recursive: true }); fs.writeFileSync(sessionFile, JSON.stringify(s)); };
const mtime = (p) => { try { return fs.statSync(p).mtimeMs; } catch { return 0; } };

function cleanupOldState() {
  try {
    const week = Date.now() - 7 * 864e5;
    for (const f of fs.readdirSync(stateDir)) {
      const p = path.join(stateDir, f);
      if (f !== 'qa-last.json' && mtime(p) < week) fs.rmSync(p, { force: true });
    }
  } catch {}
}

try {
  if (!sid) process.exit(0);

  if (mode === 'track') {
    const ti = input.tool_input || {};
    const file = ti.file_path || ti.path || '';
    if (!file || !UI_EXT.test(file) || GENERATED.test(file)) process.exit(0);
    const s = load();
    s.edits = [...(s.edits || []).filter((e) => e.p !== file), { p: file, t: Date.now() }].slice(-50);
    save(s);
    if (s.edits.length === 1) cleanupOldState();
    process.exit(0);
  }

  if (mode === 'stop') {
    if (input.stop_hook_active) process.exit(0);
    const s = load();
    if (!s.edits || !s.edits.length) process.exit(0);
    const lastEdit = Math.max(...s.edits.map((e) => e.t));
    const cwd = input.cwd || process.cwd();
    const qaAt = Math.max(mtime(qaMarker), mtime(path.join(cwd, '.design-qa', 'last-run.json')));
    if (qaAt >= lastEdit) process.exit(0);
    if ((s.blocks || 0) >= MAX_BLOCKS) process.exit(0);

    // An honest disclaimer passes, but it has to be about the UI or rendering, not any "not verified".
    const msg = String(input.last_assistant_message || '');
    const disclaimer = /\b(UI|page|layout|design|interface|screen|component|styles?|CSS)\b[^.\n]{0,80}(\bnot\b|n't\b|\bnever\b|\bwithout\b)[^.\n]{0,30}\b(visually |been )?(verified|checked|rendered|screenshotted|viewed|opened in a browser)\b|(\bnot|n't)\s+(been\s+)?(visually|rendered|browser)[- ](verified|checked|tested)\b|\bno (rendered|visual|browser|screenshot) (check|verification|review)\b|\b(could not|couldn't|cannot|can't|unable to) (render|screenshot|open (it|the page) in a browser|run (qa\.mjs|a browser))\b/i;
    if (disclaimer.test(msg)) process.exit(0);

    s.blocks = (s.blocks || 0) + 1;
    save(s);
    const recent = s.edits.filter((e) => e.t > qaAt).slice(-5).map((e) => path.relative(cwd, e.p) || e.p);
    process.stdout.write(JSON.stringify({
      decision: 'block',
      reason: `UI files you edited haven't been rendered since the change (${recent.join(', ')}). ` +
        'Per the anti-ai-slop-design skill: run scripts/qa.mjs on the page and look at the screenshots, ' +
        'or record a check you did with another browser tool via `qa.mjs --mark "<what you checked>"`, ' +
        'or, if rendering is impossible here, say plainly in your reply that the UI was not visually verified.' +
        (s.blocks >= MAX_BLOCKS ? ' (This reminder will not repeat this session.)' : ''),
    }));
    process.exit(0);
  }
} catch {
  process.exit(0);
}
