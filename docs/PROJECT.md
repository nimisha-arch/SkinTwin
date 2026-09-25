# SkinTwin — PROJECT.md

## 1. Overview

**SkinTwin** — *"Your skin. Your twin. Your routine."*

SkinTwin is a single-workflow, AI-powered skincare recommendation website. A user describes their skin and what they're looking for; Gemini generates personalized product recommendations with reasoning and purchase links. There is no dataset, no database, and no user accounts — Gemini *is* the recommendation engine.

## 2. Problem Statement

Skincare shopping is overwhelming: too many products, conflicting advice, and no easy way to get a quick, personalized starting point. Most "skincare quiz" tools are either gated behind signup or backed by static, sponsor-biased product catalogs.

## 3. Objective

Let a user go from "I don't know what to buy" to "here are 3 products that fit my skin, my need, and my budget" in under a minute, using AI reasoning instead of a hardcoded catalog.

## 4. Target Users

- College-age and young adult users exploring skincare for the first time.
- Budget-conscious shoppers in the Indian market (prices in ₹).
- Anyone who wants a quick recommendation without creating an account.

## 5. Core User Flow

```
Open SkinTwin
   → Enter skin details (age group, skin type, concerns, sensitivity)
   → Specify product wanted
   → Enter budget
   → Click "Generate Recommendation"
   → Gemini API call
   → ~3 personalized product recommendations
   → Reasoning per product
   → Product/search links
   → Option to "Modify My Preferences" and regenerate
```

## 6. User Inputs

| Field | Type | Options |
|---|---|---|
| Age Group | single-select | Under 18, 18–24, 25–34, 35–44, 45+ |
| Skin Type | single-select | Oily, Dry, Combination, Normal, Sensitive |
| Skin Concerns | multi-select chips | Acne, Pimples, Dryness, Oiliness, Pigmentation, Dark Spots, Dullness, Uneven Skin Tone, Uneven Texture, Fine Lines, **No Specific Concern** |
| Skin Features/Sensitivity | single or multi-select | Sensitive, Easily Irritated, Normal Tolerance, Dry/Tight, Oily/Shiny, Combination |
| Product Wanted | select + free text | Cleanser, Face Wash, Serum, Moisturizer, Sunscreen, Toner, Face Mask, or custom text (e.g. "Sunscreen for combination skin") |
| Budget | number input | ₹ amount, e.g. 500–3000 |

**Product search requirement:** the "Product Wanted" field is a core input, not decorative — Gemini must respect it and only recommend products in that category (unless the free-text field implies otherwise).

**No-Skin-Concern use case:** selecting "No Specific Concern" must be fully supported and must not degrade recommendation quality. A user with no concerns and a simple ask ("just a good sunscreen") is a first-class use case, not an edge case.

## 7. Gemini Functionality

On "Generate Recommendation," the app sends the full profile (age group, skin type, concerns, sensitivity, product wanted, budget) to Gemini via a Netlify Function. Gemini is instructed to:

1. Recommend products realistically available in the user's market (India).
2. Respect the requested product category.
3. Respect the budget as closely as possible.
4. Explain, per product, why it fits this specific profile.
5. Provide a purchase or search link where confidently possible.
6. Avoid medical claims or diagnosis.
7. Return ~3 recommendations as structured JSON.

## 8. Recommendation Output

Each recommendation includes:
- Product name
- Brand
- Product type
- Approximate price (if available)
- Key relevant info
- Personalized "why recommended" explanation tied to the user's actual inputs
- Purchase/search link (if available) — "View Product →"

## 9. Product Links

Links are only shown if Gemini can plausibly provide them (official brand site, Amazon, Nykaa, Myntra, other retailer, or a search link). No links are fabricated by the frontend. If Gemini gives no confident link, the card omits the link rather than guessing.

## 10. Error Behavior

| Scenario | Behavior |
|---|---|
| Missing required input | Inline validation, block submission, no API call |
| Invalid budget | Inline validation message |
| Gemini API failure | "We couldn't generate recommendations right now. Please try again." |
| Network failure | Same generic friendly message, retry option |
| Invalid/unparseable Gemini response | Same generic message, logged server-side only |
| Zero recommendations returned | "No matches found — try adjusting your budget or preferences." |

No raw stack traces, status codes, or technical errors are ever shown to the user.

## 11. Accuracy & Transparency

A subtle, non-intrusive note is always visible near results:

> "AI-generated recommendations may contain inaccuracies. Please verify product ingredients, current pricing, availability, and suitability before purchasing."

This is a footnote-level disclaimer, not a banner or blocker.

## 12. Explicit Non-Features

No login/signup/auth, no user accounts, no database (SQLite/Mongo/Supabase/Firebase), no product dataset, no scraping, no e-commerce/checkout/cart/payments, no admin panel, no "skin report"/"skin personality," no ingredient database, no computer vision/face scanning, no medical diagnosis, no reviews, no social features, no chatbot, no notifications, no gamification, no complex ML — **Gemini alone is the recommendation engine.**

## 13. Acceptance Criteria

- User can complete the full form and submit in under a minute.
- "No Specific Concern" + any product + any budget produces useful, relevant results.
- Recommendations respect the requested product category and budget.
- Each recommendation has a distinct, input-specific reasoning line (not generic copy).
- Links are either real/plausible or absent — never fabricated.
- Disclaimer is present but unobtrusive.
- All error states degrade gracefully with friendly copy.
- Fully responsive: desktop, tablet, mobile.
- No Gemini call fires before the user clicks "Generate Recommendation."
- Production build succeeds and deploys cleanly on Netlify with `GEMINI_API_KEY` as a server-only env var.

## 14. Definition of Done

A user can open SkinTwin, fill the form, generate recommendations, read the reasoning, click a product link, and return to modify preferences — smoothly, on any device, with a premium look, and with zero exposed API keys or unhandled errors.
