# Rendered review rubric

Use this on **screenshots and the live page**, not on source code. Run `scripts/qa.mjs` first, and open every screenshot it produces.

## 1. Machine findings (from `qa.mjs`)

Fix these, or justify each one:

- horizontal overflow
- console or page errors
- failed requests
- declared fonts that didn't load
- contrast failures
- unnamed controls
- images without `alt`
- missing or invisible focus
- infinite animation under reduced motion
- axe serious or critical violations

Treat small-target and line-length findings as review prompts.

Pattern signals (distinct radii, uppercase labels, gradient text, emoji, arrows) are **observations**. A high count prompts the question "was this chosen?", not a fix.

## 2. Judgement criteria

Score each criterion 1–4. 1 = clear problem; 2 = works but weak; 3 = good; 4 = specific and excellent. Give the evidence: which screenshot, which region.

| Criterion | Look for |
|---|---|
| **Fit to job** | In the first view at 390px, can you tell what this is and what to do? For tools: is the primary task region obvious? |
| **Specificity** | Would this design work unchanged for a competitor? Point to the elements that come from *this* brief's content or domain. Score 1 if you can't point to any |
| **Hierarchy** | Squint at it: is there one clear entry point, then a readable order? Is emphasis rationed? |
| **Typography** | Measure, leading, scale steps, wraps (no lone words in headlines), numerals in data, and the face rendered as intended |
| **Color and contrast** | Semantic and consistent; accent used for meaning; status not by color alone; dark mode (if any) re-checked |
| **Spacing and alignment** | One spacing scale, consistent edges, grouping by proximity, no accidental near-alignments |
| **Components and states** | Consistent controls; hover, focus, disabled, loading, empty, and error present where relevant |
| **Responsive** | Mobile is a composition, not a squeeze; nothing clipped; tables and code handled; touch targets usable |
| **Content and copy** | Specific, honest, sentence case, labels match outcomes; no filler sections; placeholders flagged |
| **Restraint** | Boldness in one place; decoration earns its place; remove-one-accessory test applied |

**Pass bar for delivery:** no 1s, and Fit to job, Hierarchy, and Responsive at 3 or above. For Tier 2 work, Specificity at 3 or above.

## 3. Three questions for the delivery report

1. What makes this feel like *this* product rather than any product in its category?
2. Which choice was made from habit or convenience, and is it still the right one?
3. What can be removed without losing meaning or usability?

## 4. Optional: fresh-context review

For high-stakes Tier 2 work, a reviewer that didn't write the design is less biased toward it. If the user agrees to the extra cost, start a subagent or a separate session with only the brief, the screenshots, and this rubric. Don't give it the design rationale.
