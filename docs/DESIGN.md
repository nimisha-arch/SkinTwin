# SkinTwin — DESIGN.md

## 1. Brand

**SkinTwin** — *"Your skin. Your twin. Your routine."*

A calm, premium, editorial skincare brand feel — closer to a boutique skincare label's website than a generic SaaS dashboard.

## 2. Visual Philosophy

- Minimal, elegant, quiet confidence.
- Generous whitespace; content breathes.
- Typography carries the hierarchy — not boxes, borders, or shadows.
- Every screen should feel intentional, never templated or "AI dashboard generic."
- Calm > flashy. No dopamine-bait gradients or glass panels.

## 3. Color System

| Name | Hex | Usage |
|---|---|---|
| Cream | `#FAF7F0` | Primary background |
| White | `#FFFFFF` | Card surfaces |
| Sage | `#A8BFA3` | Secondary accents, borders, chip backgrounds |
| Dark Olive | `#384238` | Primary text, headings, primary button |
| Dusty Peach | `#E8B7A5` | Highlight accent, hover states, secondary CTA |
| Green | `#8DB596` | Success/positive states |
| Yellow | `#E2C66D` | Subtle warning/disclaimer accent (used sparingly) |
| Red | `#D88B8B` | Error states only |

No neon, no purple/blue, no gradients beyond a very subtle cream→white wash, no glassmorphism.

## 4. Typography

- A refined serif or high-contrast humanist serif for headings (e.g. Fraunces, Playfair Display, or similar) — gives the "premium skincare label" feel.
- A clean sans-serif for body/UI text (e.g. Inter, Manrope).
- Generous line-height (1.5–1.7) on body copy.
- Heading scale: large hero title, clear step-down for section headers, restrained for card titles.

## 5. Spacing & Layout

- 8px base spacing unit.
- Max content width ~720–840px for the form; results grid can breathe wider.
- Section padding generous (64–96px vertical on desktop, 32–48px mobile).
- Cards use consistent internal padding (24–32px).

## 6. Main Form Design

- Centered, single-column, single-screen flow — no multi-step wizard.
- Section labels in small caps or muted uppercase tracking (e.g. "SKIN TYPE").
- Fields grouped with clear visual rhythm: Age → Skin Type → Concerns → Sensitivity → Product → Budget → CTA.

## 7. Input Chips

- Skin Concerns and Sensitivity use pill-shaped chips.
- Unselected: white/cream background, sage border, dark olive text.
- Selected: sage or dusty-peach fill, dark olive text, subtle scale/opacity transition (no bounce).
- "No Specific Concern" chip should visually behave as a normal chip but can optionally deselect other concern chips when picked (UX nicety, not required).

## 8. Buttons

- **Primary CTA** ("Generate Recommendation"): dark olive fill, cream text, full-width or prominent on mobile, subtle hover darken.
- **Secondary** ("← Modify My Preferences"): text/ghost button, sage or dark olive text, no heavy border.
- **Link button** ("View Product →"): dusty peach text or underline, arrow icon, opens in new tab.

## 9. Recommendation Cards

- White card on cream background, soft 1px sage border or very subtle shadow (no heavy drop shadow).
- Layout: Product name (serif, bold) → Brand + type (muted small text) → Price (if available, right-aligned or badge) → "Why we recommend it" paragraph → link button at bottom.
- 3 cards in a responsive grid (3-col desktop, 1-col mobile, stacked with clear spacing).

## 10. Loading State

- Centered, minimal — no spinner-heavy animation.
- Rotate through short phrases: "Finding recommendations for your skin…" → "Matching your preferences…" → "Preparing your SkinTwin…"
- Simple pulse or fade, not a complex animation sequence.

## 11. Error State

- Inline, calm messaging in dusty peach/red-tinted card, not a jarring red alert box.
- Always paired with a retry action.

## 12. Empty State

- If zero recommendations return, show a calm illustration-free message with a suggestion to adjust budget/preferences and a "Modify Preferences" button.

## 13. Responsive Design

- Mobile: single column throughout, chips wrap naturally, CTA button sticky or clearly reachable, cards stack full-width.
- Tablet: form stays single column but slightly wider; result cards can go 2-col.
- Desktop: form centered ~640–720px; results 3-col grid.

## 14. Accessibility

- Sufficient contrast (dark olive on cream/white passes AA for body text).
- All chips and buttons keyboard-navigable and focus-visible.
- Form labels always visible (not placeholder-only).
- Disclaimer text readable, not decorative-only.

## 15. Animation Guidelines

- Subtle only: 150–250ms ease transitions on hover/select/focus.
- No parallax, no scroll-triggered flourishes, no bouncy easing.
- Loading phrase transitions: simple crossfade.

## 16. Visual Quality Checklist

- [ ] Does it look like a boutique skincare brand, not a generic AI tool?
- [ ] Is whitespace doing most of the layout work?
- [ ] Is the color palette limited to the defined system?
- [ ] Is typography hierarchy clear without relying on boxes/borders?
- [ ] Do chips and buttons feel tactile but calm?
- [ ] Is the disclaimer present but not shouting?

## 17. Visual Anti-Patterns (avoid)

- Gradient hero banners, neon accent colors, glassmorphic cards, dashboard-style stat tiles, excessive icons, dense multi-column dashboards, generic "AI sparkle" iconography, stock-photo skincare imagery clutter.
