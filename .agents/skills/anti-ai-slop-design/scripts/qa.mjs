#!/usr/bin/env node
// Rendered design QA: screenshots at several widths plus deterministic DOM checks.
// Usage:
//   node qa.mjs <url-or-file> [--widths 1440x900,390x844,320x640] [--out .design-qa] [--dpr 1] [--no-full] [--strict]
//   node qa.mjs --mark "verified with <tool> at <widths>"
// Resolves `playwright` (and optionally `axe-core`) from: the current project, $DESIGN_QA_HOME,
// then ~/.claude/design-qa. Uses Playwright's bundled Chromium, else installed Chrome or Edge.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(name);
const cwd = process.cwd();
const outDir = path.resolve(cwd, opt('--out', '.design-qa'));

function ensureOutDir() {
  fs.mkdirSync(outDir, { recursive: true });
  const gi = path.join(outDir, '.gitignore');
  if (!fs.existsSync(gi)) fs.writeFileSync(gi, '*\n');
}

// Shared marker read by the skill's Stop hook, so a run from any folder or --out counts.
function writeGateMarker(info) {
  try {
    const dir = path.join(os.tmpdir(), 'anti-ai-slop-design');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'qa-last.json'), JSON.stringify({ ...info, cwd, out: outDir }));
  } catch {}
}

if (flag('--mark')) {
  ensureOutDir();
  const note = opt('--mark', '');
  fs.writeFileSync(path.join(outDir, 'last-run.json'), JSON.stringify({ at: new Date().toISOString(), manual: true, note }, null, 2));
  writeGateMarker({ at: new Date().toISOString(), manual: true, note });
  console.log(`Recorded manual verification: ${note}`);
  process.exit(0);
}

const target = args.find((a, i) => !a.startsWith('--') && !(i > 0 && ['--widths', '--out', '--mark', '--dpr'].includes(args[i - 1])));
if (!target) {
  console.error('Usage: node qa.mjs <url-or-file> [--widths 1440x900,390x844,320x640] [--out DIR] [--dpr 1] [--no-full] [--strict]');
  process.exit(1);
}
const url = /^[a-z]+:\/\//i.test(target) ? target : pathToFileURL(path.resolve(cwd, target)).href;
const dpr = Number(opt('--dpr', '1')) || 1;
const viewports = opt('--widths', '1440x900,390x844,320x640').split(',').map((s) => {
  const [w, h] = s.toLowerCase().split('x').map(Number);
  return { width: w, height: h || Math.round(w * 1.6) };
});

function resolveModule(name) {
  const bases = [
    path.join(cwd, 'package.json'),
    process.env.DESIGN_QA_HOME && path.join(process.env.DESIGN_QA_HOME, 'package.json'),
    path.join(os.homedir(), '.claude', 'design-qa', 'package.json'),
  ].filter(Boolean);
  for (const base of bases) {
    try { return createRequire(base).resolve(name); } catch {}
  }
  return null;
}

const pwPath = resolveModule('playwright');
if (!pwPath) {
  console.error([
    'qa.mjs: the `playwright` package was not found (project, $DESIGN_QA_HOME, ~/.claude/design-qa).',
    'Install it into the isolated tools folder (see INSTALL.md), e.g.:',
    '  npm install --prefix ~/.claude/design-qa playwright@1.64.1 axe-core@4.14.0',
    'Or verify with the session\'s browser tool and record it: node qa.mjs --mark "<what you checked>"',
  ].join('\n'));
  process.exit(3);
}
const { chromium } = (await import(pathToFileURL(pwPath).href)).default ?? (await import(pathToFileURL(pwPath).href));
const axePath = (() => {
  const p = resolveModule('axe-core');
  return p ? path.join(path.dirname(p), 'axe.min.js') : null;
})();

async function launch() {
  const attempts = [{}, { channel: 'chrome' }, { channel: 'msedge' }];
  let lastErr;
  for (const a of attempts) {
    try { return { browser: await chromium.launch(a), via: a.channel || 'bundled chromium' }; } catch (e) { lastErr = e; }
  }
  throw lastErr;
}

// Runs inside the page. Returns geometry/style findings. Keep self-contained.
function inspect() {
  const vw = document.documentElement.clientWidth;
  const sel = (el) => {
    if (!el || el === document.documentElement) return 'html';
    let s = el.tagName.toLowerCase();
    if (el.id) return `${s}#${el.id}`;
    const cls = [...el.classList].slice(0, 2).join('.');
    if (cls) s += `.${cls}`;
    const parent = el.parentElement;
    return parent && parent !== document.body ? `${sel(parent)} > ${s}` : s;
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none' && Number(cs.opacity) > 0.05;
  };
  const inClosedDetails = (el) => { const d = el.closest('details:not([open])'); return !!d && !el.closest('summary'); };
  const all = [...document.body.querySelectorAll('*')].filter((el) => !['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName) && !inClosedDetails(el));
  const vis = all.filter(visible);

  // Horizontal overflow
  const docOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  const clippedByAncestor = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox !== 'visible') return true;
    }
    return false;
  };
  let overflowers = [];
  if (docOverflow > 1) {
    const out = vis.filter((el) => { const r = el.getBoundingClientRect(); return r.right > vw + 1 || r.left < -1; });
    const unclipped = out.filter((el) => !clippedByAncestor(el));
    // Report the outermost offenders first; fall back to all offenders when every one sits in a clipping ancestor.
    const pick = (unclipped.length ? unclipped : out).filter((el, _, arr) => !arr.some((o) => o !== el && o.contains(el)));
    overflowers = pick.slice(0, 6).map((el) => { const r = el.getBoundingClientRect(); return `${sel(el)} [${Math.round(r.left)}..${Math.round(r.right)}]`; });
  }

  // Text elements: elements with their own non-empty text
  const textEls = vis.filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 0));

  // Fonts
  const generic = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif', 'ui-serif', 'ui-monospace', 'ui-rounded', '-apple-system', 'blinkmacsystemfont', 'math', 'emoji']);
  const declared = {};
  for (const f of document.fonts) {
    const fam = f.family.replace(/["']/g, '').trim().toLowerCase();
    (declared[fam] ||= []).push(f.status);
  }
  const usage = {};
  for (const el of textEls) {
    const first = getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '').trim();
    const chars = [...el.childNodes].filter((n) => n.nodeType === 3).reduce((a, n) => a + n.textContent.trim().length, 0);
    usage[first] = (usage[first] || 0) + chars;
  }
  const fonts = Object.entries(usage).sort((a, b) => b[1] - a[1]).map(([family, chars]) => {
    const key = family.toLowerCase();
    let status;
    if (generic.has(key)) status = 'generic/system keyword';
    else if (declared[key]) status = declared[key].includes('loaded') ? 'webfont loaded' : `DECLARED BUT NOT LOADED (${[...new Set(declared[key])].join('/')}) - rendering a fallback`;
    else status = 'not declared via @font-face - local font or fallback (unverifiable)';
    return { family, chars, status };
  });

  // Contrast
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
  };
  const blend = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a),
    g: top.g * top.a + bottom.g * (1 - top.a),
    b: top.b * top.a + bottom.b * (1 - top.a),
    a: 1,
  });
  const lum = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const effectiveBg = (el) => {
    const layers = [];
    for (let p = el; p; p = p.parentElement) {
      const cs = getComputedStyle(p);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (const l of layers.reverse()) bg = blend(l, bg);
    return bg;
  };
  const contrastFails = [];
  let contrastChecked = 0, contrastUnknown = 0;
  for (const el of textEls) {
    const cs = getComputedStyle(el);
    const fg = parse(cs.color);
    const bg = effectiveBg(el);
    if (!fg || !bg) { contrastUnknown++; continue; }
    contrastChecked++;
    const size = parseFloat(cs.fontSize);
    const bold = Number(cs.fontWeight) >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    const r = ratio(blend(fg, bg), bg);
    const need = large ? 3 : 4.5;
    if (r < need) contrastFails.push({ el: sel(el), ratio: Math.round(r * 100) / 100, need, text: el.textContent.trim().slice(0, 40) });
  }

  // Interactive elements: names and target size
  const interactive = vis.filter((el) => el.matches('a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],[role=tab],[role=checkbox],[role=switch],[role=menuitem],[tabindex]:not([tabindex="-1"])'));
  const nameOf = (el) => {
    const t = (s) => (s || '').replace(/\s+/g, ' ').trim();
    if (t(el.getAttribute('aria-label'))) return t(el.getAttribute('aria-label'));
    const lb = el.getAttribute('aria-labelledby');
    if (lb) return t(lb.split(/\s+/).map((id) => document.getElementById(id)?.textContent).join(' '));
    if (el.labels && el.labels.length) return t([...el.labels].map((l) => l.textContent).join(' '));
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return t(el.getAttribute('title') || (el.type === 'submit' || el.type === 'button' ? el.value : ''));
    const txt = t(el.innerText) || t(el.textContent);
    if (txt) return txt;
    const img = el.querySelector('img[alt],svg[aria-label]');
    if (img) return t(img.getAttribute('alt') || img.getAttribute('aria-label'));
    return t(el.getAttribute('title'));
  };
  const unnamed = interactive.filter((el) => !nameOf(el)).slice(0, 8).map(sel);
  const smallTargets = interactive.filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.width >= 24 && r.height >= 24) return false;
    // WCAG 2.5.8 inline exception: a target inside a sentence or block of text
    const block = el.closest('p,li,td,dd,figcaption,blockquote');
    if (block && block !== el && getComputedStyle(el).display.startsWith('inline') && block.textContent.trim().length > el.textContent.trim().length + 15) return false;
    return true;
  }).slice(0, 8).map((el) => { const r = el.getBoundingClientRect(); return `${sel(el)} (${Math.round(r.width)}x${Math.round(r.height)})`; });

  // Images
  const imgsNoAlt = [...document.images].filter((i) => !i.hasAttribute('alt')).slice(0, 8).map(sel);
  const brokenImgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).slice(0, 8).map((i) => i.currentSrc);

  // Headings
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map((h) => Number(h.tagName[1]));
  const headingIssues = [];
  if (!heads.includes(1)) headingIssues.push('no visible h1');
  for (let i = 1; i < heads.length; i++) if (heads[i] > heads[i - 1] + 1) { headingIssues.push(`skips h${heads[i - 1]} -> h${heads[i]}`); }

  // Line length (characters per line) for long text blocks
  const longLines = [];
  for (const el of vis.filter((e) => e.matches('p,li,dd,blockquote') && e.textContent.trim().length > 180)) {
    const cs = getComputedStyle(el);
    const lh = cs.lineHeight === 'normal' ? parseFloat(cs.fontSize) * 1.2 : parseFloat(cs.lineHeight);
    const lines = Math.max(1, Math.round(el.getBoundingClientRect().height / lh));
    if (lines < 2) continue;
    // count only text that flows in this block (skip floated, hidden, or absolutely positioned descendants)
    let chars = 0;
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      let ok = true;
      for (let p = n.parentElement; p && p !== el; p = p.parentElement) {
        const c = getComputedStyle(p);
        if (c.float !== 'none' || c.display === 'none' || c.position === 'absolute' || c.position === 'fixed') { ok = false; break; }
      }
      if (ok) chars += n.textContent.length;
    }
    const cpl = Math.round(chars / lines);
    if (cpl > 80) longLines.push(`${sel(el)} ~${cpl} chars/line`);
  }

  // Pattern signals (observations, not failures)
  const radii = new Set(), shadows = new Set();
  let upperLabels = 0, gradientText = 0, arrows = 0, middots = 0, emoji = 0;
  const emojiRe = /\p{Extended_Pictographic}/u;
  for (const el of vis) {
    const cs = getComputedStyle(el);
    if (cs.borderTopLeftRadius !== '0px') radii.add(cs.borderTopLeftRadius);
    if (cs.boxShadow !== 'none') shadows.add(cs.boxShadow);
    if ((cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text') && cs.backgroundImage !== 'none') gradientText++;
  }
  for (const el of textEls) {
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    const cs = getComputedStyle(el);
    if (own.length > 1 && own.length < 40 && (cs.textTransform === 'uppercase' || (/[A-Z]{3}/.test(own) && own === own.toUpperCase() && /[A-Z]/.test(own)))) upperLabels++;
    if (/→|->/.test(own)) arrows++;
    if (/\s·\s/.test(own)) middots++;
    if (emojiRe.test(own)) emoji++;
  }
  const fontSizes = new Set(textEls.map((el) => getComputedStyle(el).fontSize));

  return {
    title: document.title,
    docOverflowPx: Math.max(0, docOverflow), overflowers,
    fonts, contrast: { checked: contrastChecked, unknownBackground: contrastUnknown, failures: contrastFails.slice(0, 12), failureCount: contrastFails.length },
    unnamed, smallTargets, imgsNoAlt, brokenImgs, headings: heads, headingIssues, longLines: longLines.slice(0, 6),
    signals: {
      fontFamiliesRendered: fonts.length, distinctFontSizes: fontSizes.size,
      distinctRadii: radii.size, radii: [...radii].slice(0, 8), distinctShadows: shadows.size,
      uppercaseShortLabels: upperLabels, gradientText, arrowGlyphs: arrows, middotSeparators: middots, emojiInText: emoji,
    },
  };
}

// Tab through the page and check that each focused element changes visibly.
async function focusPass(page, steps = 40) {
  const missing = [];
  let visited = 0;
  await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
  for (let i = 0; i < steps; i++) {
    await page.keyboard.press('Tab');
    const res = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const snap = () => {
        const cs = getComputedStyle(el);
        return [cs.outlineStyle, cs.outlineWidth, cs.outlineColor, cs.boxShadow, cs.borderColor, cs.backgroundColor, cs.color, cs.textDecorationLine].join('|');
      };
      const cs = getComputedStyle(el);
      const ringed = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
      const focused = snap();
      el.blur();
      const blurred = snap();
      el.focus({ preventScroll: true });
      const name = el.tagName.toLowerCase() + (el.id ? '#' + el.id : el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/)[0] : '');
      if (!window.__qaFirstFocus) window.__qaFirstFocus = el;
      else if (window.__qaFirstFocus === el) return { wrapped: true };
      return { name, visible: ringed || focused !== blurred };
    });
    if (!res || res.wrapped) break;
    visited++;
    if (!res.visible) missing.push(res.name);
  }
  return { visited, withoutVisibleFocus: [...new Set(missing)].slice(0, 8) };
}

const report = { url, at: new Date().toISOString(), viewports: [] };
ensureOutDir();
let browser, via;
try {
  ({ browser, via } = await launch());
} catch (e) {
  console.error([
    'qa.mjs: could not start a browser (tried Playwright Chromium, Chrome, Edge).',
    `  ${String(e.message).split('\n')[0]}`,
    'Fix: install Google Chrome or Microsoft Edge, or download Playwright\'s Chromium:',
    '  node ~/.claude/design-qa/node_modules/playwright/cli.js install chromium',
    'Or verify with the session\'s browser tool and record it: node qa.mjs --mark "<what you checked>"',
  ].join('\n'));
  process.exit(3);
}
report.browser = via;
const slug = (s) => s.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(-48) || 'page';
const base = (() => {
  const u = new URL(url);
  if (u.protocol === 'file:') return slug(path.basename(path.dirname(u.pathname)) + '-' + path.basename(u.pathname, path.extname(u.pathname)));
  return slug(u.host + u.pathname);
})();
const rel = (p) => path.relative(cwd, p) || p;

for (const vp of viewports) {
  const mobile = vp.width < 700;
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: dpr, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  const consoleErrors = [], failedRequests = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${String(e.message).slice(0, 200)}`));
  page.on('requestfailed', (r) => failedRequests.push(`${r.url().slice(0, 120)} (${r.failure()?.errorText})`));
  page.on('response', (r) => { if (r.status() >= 400) failedRequests.push(`${r.url().slice(0, 120)} (${r.status()})`); });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  }
  await page.evaluate(() => document.fonts.ready);
  // Scroll through once so scroll-triggered reveals (IntersectionObserver, lazy images) render, then return to top.
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
  const name = `${base}-${vp.width}x${vp.height}`;
  const shots = { fold: path.join(outDir, `${name}.png`) };
  await page.screenshot({ path: shots.fold });
  if (!flag('--no-full')) {
    shots.full = path.join(outDir, `${name}-full.png`);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: shots.full, fullPage: h <= 9000, clip: h > 9000 ? { x: 0, y: 0, width: vp.width, height: 9000 } : undefined });
  }
  const dom = await page.evaluate(inspect);
  const focus = await focusPass(page);
  let axe = null;
  if (axePath) {
    try {
      await page.addScriptTag({ path: axePath });
      axe = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } });
        return r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, first: v.nodes[0]?.target?.join(' ') }));
      });
    } catch (e) { axe = [{ id: 'axe-error', impact: 'n/a', nodes: 0, first: String(e.message).slice(0, 120) }]; }
  }
  report.viewports.push({ viewport: `${vp.width}x${vp.height}`, screenshots: shots, consoleErrors: [...new Set(consoleErrors)].slice(0, 10), failedRequests: [...new Set(failedRequests)].slice(0, 10), ...dom, focus, axe });
  await ctx.close();
}

// Reduced-motion pass (first viewport only)
{
  const ctx = await browser.newContext({ viewport: viewports[0], reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(500);
  report.reducedMotion = await page.evaluate(() => {
    const anims = document.getAnimations();
    const infinite = anims.filter((a) => a.playState === 'running' && a.effect?.getTiming().iterations === Infinity);
    return { running: anims.filter((a) => a.playState === 'running').length, infiniteRunning: infinite.length };
  });
  await ctx.close();
}
await browser.close();

fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(outDir, 'last-run.json'), JSON.stringify({ at: report.at, url, manual: false }, null, 2));
writeGateMarker({ at: report.at, url, manual: false });

// Human/agent-readable summary
const lines = [`Design QA: ${url}  (browser: ${via}${axePath ? ', axe-core on' : ', axe-core not found'})`];
let hard = 0;
for (const v of report.viewports) {
  const f = [];
  const add = (cond, msg, isHard = true) => { if (cond) { f.push((isHard ? 'FAIL ' : 'note ') + msg); if (isHard) hard++; } };
  add(v.docOverflowPx > 1, `horizontal overflow ${v.docOverflowPx}px: ${v.overflowers.join(', ')}`);
  add(v.consoleErrors.length, `console errors: ${v.consoleErrors.join(' | ')}`);
  add(v.failedRequests.length, `failed requests: ${v.failedRequests.join(' | ')}`);
  add(v.brokenImgs.length, `broken images: ${v.brokenImgs.join(', ')}`);
  for (const fo of v.fonts) add(fo.status.startsWith('DECLARED BUT NOT LOADED'), `font "${fo.family}" ${fo.status}`);
  add(v.contrast.failureCount, `contrast failures (${v.contrast.failureCount}): ${v.contrast.failures.slice(0, 5).map((c) => `${c.el} ${c.ratio}:1<${c.need} "${c.text}"`).join('; ')}`);
  add(v.unnamed.length, `controls without accessible name: ${v.unnamed.join(', ')}`);
  add(v.imgsNoAlt.length, `img without alt: ${v.imgsNoAlt.join(', ')}`);
  add(v.focus.withoutVisibleFocus.length, `no visible focus change: ${v.focus.withoutVisibleFocus.join(', ')}`);
  add(v.headingIssues.length, `headings: ${v.headingIssues.join('; ')}`, false);
  add(v.smallTargets.length, `targets under 24px: ${v.smallTargets.join(', ')}`, false);
  add(v.longLines.length, `long measure: ${v.longLines.join('; ')}`, false);
  if (v.axe) for (const a of v.axe) add(true, `axe ${a.id} [${a.impact}] x${a.nodes} e.g. ${a.first}`, a.impact === 'serious' || a.impact === 'critical');
  lines.push(`\n[${v.viewport}] ${rel(v.screenshots.fold)}${v.screenshots.full ? `  + ${path.basename(v.screenshots.full)}` : ''}`);
  lines.push(`  fonts: ${v.fonts.slice(0, 4).map((x) => `${x.family} [${x.status.split(' -')[0]}]`).join(', ')}`);
  lines.push(`  contrast checked ${v.contrast.checked}, unknown bg ${v.contrast.unknownBackground}; focus stops checked ${v.focus.visited}`);
  lines.push(...(f.length ? f.map((x) => '  ' + x) : ['  no findings']));
  const s = v.signals;
  lines.push(`  signals: families ${s.fontFamiliesRendered}, sizes ${s.distinctFontSizes}, radii ${s.distinctRadii} [${s.radii.join(' ')}], shadows ${s.distinctShadows}, UPPERCASE labels ${s.uppercaseShortLabels}, gradient text ${s.gradientText}, arrows ${s.arrowGlyphs}, ' · ' ${s.middotSeparators}, emoji ${s.emojiInText}`);
}
const rm = report.reducedMotion;
if (rm.infiniteRunning) { lines.push(`\nFAIL ${rm.infiniteRunning} infinite animation(s) still running with prefers-reduced-motion: reduce`); hard++; }
lines.push(`\n${hard} hard finding(s). Report: ${rel(path.join(outDir, 'report.json'))}`);
lines.push('Next: open every screenshot and review it visually; these checks do not judge design quality.');
console.log(lines.join('\n'));
process.exit(flag('--strict') && hard ? 2 : 0);
