# Generated-UI defaults: annotated

Use this during planning (§3 swap test) and in reviews. Each entry says why it reads as generated, when it is the right call, and what to ask instead. **Nothing here is banned.** The test is always whether the choice came from the brief or from habit.

The palette and type entries are a snapshot of current convergence points (late 2026). They will date: new defaults replace old ones as models and trends shift. Re-check this list every few months against recent generated output.

| Default | Why it reads as generated | Legitimate when | Ask instead |
|---|---|---|---|
| Centered hero: headline + subline + two buttons + gradient glow | It's the statistical center of landing pages; nothing in it is about the product | A very simple product with one message and no visual artifact yet | What is the most characteristic thing in this subject's world, and can the first view show it? |
| Big-number stat row (number large, label small, gradient accent) | Fills space with "proof" that often isn't real | The numbers are real, sourced, and the decision hinges on them | Which single fact would change a visitor's mind? Is it verifiable? |
| Three identical icon cards | Default way to say "features" | There are exactly three parallel, equally important items, and icons carry meaning | Is this a list, a comparison (table), a sequence (steps), or a story (narrative)? |
| Everything in same-radius cards with the same `rgba(0,0,0,.1)` shadow | Hierarchy flattened into boxes | Items really are discrete, movable, or selectable objects | Which content needs a container, and which reads better as direct layout? |
| Bento grid | Trend shape; often forces content into tiles that don't fit | Several heterogeneous items of different importance that benefit from a visual map | Does the grid follow content size, or does content get cropped to fit the grid? |
| Purple→blue gradient on white | Long-standing generated-SaaS look | It's the brand | What color comes from the domain, brand, or material? |
| Cream background + high-contrast serif + terracotta/clay accent (~#D97757) | Current "tasteful" generated default | Brand or subject really is warm, crafted, editorial (and even then, check you aren't on autopilot) | What would a designer who'd never seen this trend pick for this subject? |
| Near-black + one acid green/vermilion/electric accent | Current "bold tech" default | Dev tools or nightlife brands *where the user expects it*, and the accent has a semantic role | Is dark the right theme for the context of use (daylight, print, long reading)? |
| Tinted near-black (#0B0B0B, #111) in place of a chosen dark | A no-decision value | You picked it for a reason (e.g. matching hardware black) | What is the dark *for*? Warm, cool, ink, slate? |
| Broadsheet layout: hairline rules, zero radius, dense columns | Current "editorial" costume | Real news or reference content with high density | Does the content have newspaper structure? |
| Inter / Roboto / system sans with no rationale | The most common font choice | Product UIs: performance, familiarity, numerals, language coverage. Choose it *on purpose* | What does the type need to do here: read long, scan numbers, carry a voice? |
| Fashionable display faces (Space Grotesk, Fraunces, Instrument Serif, etc.) | The replacement defaults that appear when Inter is discouraged | The face's specific character suits the subject | Name the quality you want (warm, technical, civic, playful) and pick from faces with it, including less obvious ones |
| One italic or colored word in each headline | Highly repeated generated treatment | A single deliberate instance where the emphasis carries meaning | Can the whole headline do the work through size, weight, or layout? |
| Tracked ALL-CAPS eyebrow above every heading | Template chrome | The label carries information (section category, status, code) and appears where needed, not everywhere | Does the heading need a label at all? |
| `A · B · C` metadata, `WORD — fragment` labels | Template chrome | Actual metadata in a dense list where the separator aids scanning | Would a table, definition list, or line breaks be clearer? |
| Monospace small labels | "Technical" costume | Code, IDs, measurements, aligned numeric data | Is the content actually code or data? |
| `→` appended to every link/button | Template chrome | One primary forward action where direction matters | Does the label already say where it goes? |
| 01 / 02 / 03 numbering | Decoration pretending to be structure | The content is a true sequence (steps, timeline, ranked list) | Is it a sequence? |
| Fade-and-slide-up on every section | The default entrance; delays content, adds jank | One orchestrated reveal that directs attention | What does motion explain here? |
| Hover lift on every card | Default interaction garnish | Cards are clickable and lift signals affordance consistently | Is it clickable? Is there a clearer affordance? |
| Endless marquee / parallax | Attention without meaning; motion sensitivity issues | A brand moment with reduced-motion fallback | What is the user meant to read? |
| Glassmorphism / blur panels | Trend surface; contrast over busy backgrounds fails | The background is controlled and contrast is verified | Is there a simpler surface that reads? |
| "Elevate / Unlock / Seamlessly / Supercharge / all-in-one" copy | Generic benefit language | Never better than a specific sentence | What does it actually do, for whom, in their words? |
| Benefit triads ("Fast. Simple. Secure.") | Says nothing checkable | Rarely | Which claim can you prove, and how? |
| Blobs, mesh gradients, abstract 3D, AI stock | Fill, not meaning | Brand system includes them deliberately | What real image, diagram, screenshot, or data could go here? |
| Emoji as icons | Fast filler; inconsistent rendering across platforms | Casual consumer contexts where the brand voice is emoji-native | Is an icon needed? If so, use one consistent set |
| Decorative charts with invented data | Fake proof | Never in production; labelled sample data in prototypes | Is there real data, or should this be text? |
| Fake browser/app chrome around nothing | Pretends to be a product shot | A device frame around a *real* screenshot, clearly non-interactive | Show the actual product. |

## Watch list: convergence observed in testing (n = 1, unconfirmed)

These appeared in independent generations for the same brief, with and without this skill. They're domain-apt, which is exactly how a new default forms. Treat them as prompts for the swap test, not as bans. Promote them to the table above only once they repeat across several runs.

| Pattern | Seen in | Ask instead |
|---|---|---|
| Chart/Admiralty magenta as the accent on maritime or outdoor briefs | All 3 generations of the sea-kayak brief (2026-10-19) | Is magenta carrying a chart meaning here, or is it the obvious "nautical but not navy" move? |
| Local-only serif stack (Charter, Iowan Old Style) for headings + `system-ui` body, as the "no web font" pairing | Both A/B arms, same brief | On Windows these render a fallback. Is a real webfont or one family more honest? |

## Inverting defaults is also a default

Swapping the SaaS kit for brutalism, zero radius, an unexpected serif, or forced asymmetry *as a rule* only produces the next cluster. The check is the same in both directions: can you name the brief-specific reason for this choice?
