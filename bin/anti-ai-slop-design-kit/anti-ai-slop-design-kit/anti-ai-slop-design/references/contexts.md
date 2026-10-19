# Design priorities by product type

Read only the section that matches the task. If a product mixes types (a SaaS company's marketing site plus its app), treat each surface separately. They should share a brand, but they don't need the same density or the same amount of expression.

---

## Marketing and brand sites

**Primary job:** make a specific visitor understand what this is, believe it, and take one next step.

**Where character comes from**
- The product's own artifact: real screenshots, the physical product, the output it produces, the data it works with, the place it's from. Open with the most characteristic thing in the subject's world, in whatever form fits it (a live demo, an image, a headline, an interactive moment).
- Typography as voice. On marketing pages, type can carry most of the personality.
- One orchestrated moment (a load sequence, an interactive demo, a striking crop) rather than effects everywhere.

**Priorities**
1. Message clarity in the first viewport at 390px wide: what it is, who it's for, and the action.
2. Proof that is real: genuine screenshots, named customers *with permission*, specific numbers with sources. If there's no proof yet, say less rather than inventing it.
3. Performance. Hero media and font files are the usual LCP problems. Budget them.

**Failure modes**
- A hero built from the standard kit (centered text, two buttons, gradient glow) with nothing from the product in it.
- Sections that exist because landing pages "have" them (logo wall with no logos, a three-feature grid, testimonials, FAQ, final CTA).
- Animation as a substitute for content.
- "Distinctive" choices that hide the call to action or make body copy hard to read.

**Expression budget:** high, but spent in one or two places.

---

## Product UI: SaaS apps, dashboards, internal tools, admin

**Primary job:** let a repeat user complete tasks quickly and correctly, and notice what needs attention.

**Where character comes from**
- How well the information architecture fits the domain's real objects and workflow. A dispatch board for field technicians should feel like dispatch (time, location, assignment), not like a generic analytics template.
- Data presentation that matches the data's shape: tables for comparison, timelines for schedules, maps for geography, sparklines for trends. A KPI tile is right only when a single number really is what the user acts on.
- Precision in density, alignment, and numerals. Restraint *is* the aesthetic here.

**Priorities**
1. Scanability. A clear primary region, consistent alignment, tabular figures for numbers, and clear status semantics (text + color + shape).
2. Every state: empty (with the next action), loading (skeletons that match layout), error (what happened and how to fix it), partial data, permissions, long names, and 0 / 1 / 10,000 rows.
3. Keyboard efficiency and focus order for daily users.
4. Density appropriate to expertise. Experts usually want more on screen, not more whitespace.

**Failure modes**
- A grid of KPI cards with sparklines and percentage deltas, regardless of what the user decides.
- Decorative gradients, glassmorphism, or a "signature" flourish in a tool people use eight hours a day.
- Every panel in an identical rounded card.
- Ambiguous status colors, and red/green alone.
- Charts with no axis labels, units, or time range.

**Typography note:** a system UI stack or a sturdy grotesque is often the *right* choice here (familiar, fast, good numerals). Choose it deliberately and say why. Check `font-variant-numeric: tabular-nums` support.

**Expression budget:** low. Usually color semantics, one domain-specific visualization, and the overall rhythm.

---

## Editorial and content-heavy: articles, docs, blogs, reports, knowledge bases

**Primary job:** sustained, comfortable reading and easy navigation through long material.

**Where character comes from**
- The typeface and the typographic system: measure, leading, heading rhythm, how figures, quotes, footnotes, and tables are treated.
- The content's own structure. Sidenotes for a heavily referenced piece, a timeline for history, a step layout for a tutorial.
- Image treatment: crops, captions, credits, and figure numbering when the content references figures.

**Priorities**
1. Body text at comfortable size (usually 17–21px on desktop) and measure (about 60–75 characters, 80 max), with leading around 1.4–1.7 depending on the face.
2. Wayfinding: a table of contents for long pieces, visible heading hierarchy, anchor links, reading position.
3. Content elements that survive: long headlines, wide tables (scroll inside a container, not the page), code blocks, embedded media, footnotes on mobile.
4. Fast first paint of text. Don't hide content behind font loading or scroll animations.

**Failure modes**
- Using the broadsheet look (hairline rules, small caps everywhere, dense columns) as costume rather than because the content is newsy.
- Fixed headers and floating UI that steal reading space on mobile.
- Pull quotes and drop caps applied to every article by template.
- Multi-column body text on screens.

**Expression budget:** medium, concentrated in typography and figures.

---

## Commerce: product listings, product pages, checkout

**Primary job:** help a shopper evaluate, compare, and buy with confidence.

**Where character comes from:** product photography and how it's cropped and sequenced, the brand's voice in product copy, and the physical attributes of the goods (material, scale, use).

**Priorities**
1. Price, variants, availability, delivery, and returns visible without hunting.
2. Image quality and zoom; real sizes and scale references.
3. Checkout follows convention. Novelty in checkout costs conversion.
4. Honest reviews and ratings only. Never fabricate them.

**Failure modes:** a decorative layout that pushes the buy box below the fold on mobile; custom form controls that break autofill or keyboard use; urgency patterns (fake timers, fake stock counts).

**Expression budget:** high in browsing and brand storytelling, near zero in checkout.

---

## Feature inside an existing design system

**Primary job:** add capability that looks as if it had always been there.

**Process**
1. Find and read the system: tokens, components, spacing, existing similar screens.
2. Compose from existing components. Add a new component only if no existing one fits, and build it from existing tokens.
3. Match the system's density, copy voice, and interaction patterns, even ones you'd personally do differently.
4. If the system has real defects (contrast failures, missing focus states), fix them in place within scope and report them. Don't redesign around them.

**Failure modes:** introducing a new accent color, radius, shadow, or font "to make it pop"; a feature page that looks like a different product.

**Expression budget:** none beyond what the system already allows.
