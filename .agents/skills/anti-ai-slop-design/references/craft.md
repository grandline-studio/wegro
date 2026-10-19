# Craft reference

Numbers here are starting points with reasons, not quotas. Where a number is a standard, the source is named. Read only the sections you need.

## Typography

- **Roles before fonts.** Decide what type must do: carry a voice (display), read for long stretches (body), scan numbers and labels (UI/data). One family can cover all three. Two clearly different families are fine. More than two needs a reason, because every family and weight adds download cost and visual noise.
- **Choosing a face:**
  - Character that fits the subject.
  - Legibility at the sizes it will be used.
  - Language and script coverage for the content.
  - Licence (self-hosting, web use).
  - Weight and width range needed.
  - Numerals: tabular and lining for data, oldstyle can suit prose.
  - File size.
  - Be suspicious of the first face that comes to mind; it's usually the distribution's center.
- **Scale.** A modular scale (e.g. ratio 1.2–1.333 for product UI, 1.333–1.618 for expressive marketing) keeps steps consistent. Use fewer, more distinct steps rather than many close sizes. Use `clamp()` for fluid display sizes and keep body size stable.
- **Body text:**
  - Size: 16px minimum for reading text; 17–21px for long reading. Dense product UI follows its system (often 13–14px for labels, tables, and controls), as long as contrast holds and the page survives 200% zoom.
  - Line-height: about 1.4–1.7, more for serif and longer measures.
  - Measure: about 45–75 characters (60–75 suits long reading), with 80 as the upper limit (WCAG 2.2 SC 1.4.8, AAA). Set it with `max-width` in `ch`. `qa.mjs` notes anything over 80.
- **Headings.** Tighten line-height (1.0–1.2) and, for large sizes, slightly tighten tracking. Balance multi-line headings (`text-wrap: balance`) and avoid single-word last lines. Hierarchy can come from weight, size, space, or position. It doesn't always need size.
- **Numbers:** `font-variant-numeric: tabular-nums` in tables, timers, prices that update, and aligned columns.
- **Loading:**
  - Self-host or preconnect.
  - `font-display: swap` (or `optional` for non-critical faces).
  - Subset where possible.
  - Choose fallbacks with similar metrics, or `size-adjust`, to limit layout shift.
  - Always confirm in the rendered page that the face loaded. `qa.mjs` reports declared-but-unloaded faces.
  - Local-only stacks (e.g. `Charter`, `Iowan Old Style`, `Avenir`) render differently per OS. `qa.mjs` can't verify them, so check the screenshot or name the fallback you accept.
- **Uppercase.** Fine for short labels when it encodes something. Add letter-spacing (~0.04–0.08em) for legibility. Never use it for sentences.

## Color

- **Semantic tokens, not swatches:**
  - `--surface`, `--surface-raised`
  - `--text`, `--text-muted`
  - `--border`
  - `--accent` (action), `--accent-text` (text on accent)
  - `--focus`
  - `--success`, `--warning`, `--danger`, `--info`
  - chart series (when relevant)
- **Contrast (WCAG 2.2 AA):**
  - Text ≥ 4.5:1; large text (≥ 24px, or ≥ 18.66px bold) ≥ 3:1 (SC 1.4.3).
  - Component boundaries, focus indicators, and meaningful graphics ≥ 3:1 (SC 1.4.11).
  - Muted text is the usual failure.
- **Status:** color plus text, icon, or shape (SC 1.4.1). Check red/green pairs for color-vision deficiency. Distinguish by lightness as well as hue.
- **Dark themes** are a choice for context (low light, media, long sessions in dark rooms), not a style default. Don't invert the light palette. Reduce saturation of accents, raise surface lightness for elevation, avoid pure white body text on pure black for long reading, and re-check every contrast pair.
- **Where palettes come from:** brand, product material, place, domain conventions (e.g. map colors, medical status), or a reasoned art direction. Write the reason next to the token.
- **Charts:** categorical series need distinct lightness, not just hue. Use sequential palettes for magnitude and diverging palettes only around a meaningful midpoint.

## Space and layout

- **Spacing scale.** Choose one (e.g. 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96) and use only its steps. Related items sit closer than unrelated ones (proximity carries grouping).
- **Grid.** Choose it from content: a reading column for prose, a 12-column or auto-fill grid for collections, a fixed sidebar plus fluid main area for tools. Align to a small number of edges.
- **Density** follows expertise and frequency. Daily expert tools can be dense (32–40px rows); first-visit marketing breathes.
- **Containers** (cards, panels) only where the content is a discrete object. Use direct layout, dividers, or whitespace otherwise. Vary radius and elevation only to encode hierarchy.

## Components and states

Design every state that can occur: default, hover, focus-visible, active/pressed, selected, disabled (with a reason when possible), loading, empty (with the next action), error (what happened and how to fix it), success, partial or overflow (long names, many items).

- Labels say exactly what happens ("Save changes", "Assign technician"), and the same word appears in the resulting toast or state.
- Forms:
  - Visible labels, not placeholder-only.
  - Errors next to the field, in text.
  - Correct `type`, `autocomplete`, and `inputmode`.
  - Preserve input on error.
- Focus: a visible indicator at ≥ 3:1 against adjacent colors. `:focus-visible` with a 2px+ outline and offset is a reliable default.
- Targets: ≥ 24×24px (WCAG 2.2 SC 2.5.8). About 44px is a comfortable size for primary touch actions (opinion; platform guidelines are similar).

## Motion

- Motion should explain something: what changed, where something came from, what's loading, what's interactive. One orchestrated moment beats scattered effects.
- Timing: about 100–200ms for small UI feedback and 200–400ms for larger transitions. Ease-out for entering and ease-in for leaving. Avoid bounce on UI state.
- Animate `transform` and `opacity`; avoid animating layout properties.
- `@media (prefers-reduced-motion: reduce)`: remove non-essential movement and keep essential state changes as instant or fades. Content must never depend on an animation finishing.

## Responsive

- Design mobile and desktop as two compositions, not one squeezed. Decide what moves, stacks, collapses, or hides, and why.
- Check 320, 390, 768, 1024, 1440. Nothing scrolls horizontally except deliberate containers (tables, carousels) that show they scroll.
- Navigation on mobile: the primary task should stay reachable without a menu when possible.
- Touch: no hover-only information.
- Images: `srcset`/`sizes`, `width`/`height` or `aspect-ratio` to prevent layout shift, crops chosen per breakpoint for key images, and `loading="lazy"` below the fold only.

## Imagery and illustration

- Prefer real: product screenshots, the actual object, the place, the people (with consent), the data. Then diagrams that explain. Decorative imagery comes last.
- Keep one consistent illustration and icon language. Don't mix icon sets.
- `alt` describes the purpose of an image in context; `alt=""` for purely decorative images.

## UI copy

- Write from the user's side: name things by what users understand, not by how the system is built ("Notifications", not "Webhook config").
- Use active voice, plain verbs, and sentence case. Each element does one job.
- Headlines are specific: what it is, for whom, and what changes for them.
- Errors explain and direct, without apology or vagueness. An empty state invites the next action.
- No filler sections, no unverifiable superlatives, no invented proof.
