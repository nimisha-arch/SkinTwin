# SkinTwin — TECHNICAL.md

## 1. Architecture

```
React (Vite + TS + Tailwind)
        │  fetch("/.netlify/functions/recommend")
        ▼
Netlify Function (Node, TS)
        │  server-side fetch, GEMINI_API_KEY from env
        ▼
Gemini API
        │  structured JSON response
        ▼
Netlify Function → validates/normalizes JSON
        ▼
React Results UI
```

No server, no database, no persistent storage. Each request is stateless.

## 2. Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **Backend:** Netlify Functions (Node.js, TypeScript)
- **AI:** Gemini API (`gemini-1.5-flash` or current equivalent text model)
- **Hosting:** Netlify

## 3. Folder Structure

```
skintwin/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── AssessmentForm.tsx
│   │   ├── ChipSelect.tsx
│   │   ├── BudgetInput.tsx
│   │   ├── RecommendationCard.tsx
│   │   ├── ResultsList.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── Disclaimer.tsx
│   ├── types/
│   │   └── skintwin.ts
│   ├── lib/
│   │   └── api.ts
│   └── styles/
│       └── index.css
├── netlify/
│   └── functions/
│       └── recommend.ts
├── public/
├── docs/
│   ├── PROJECT.md
│   ├── DESIGN.md
│   ├── TECHNICAL.md
│   └── BUILD.md
├── netlify.toml
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vite.config.ts
```

## 4. React Structure / Component Architecture

- `App.tsx` — holds top-level state: `profile`, `status` (`idle | loading | success | error`), `recommendations`.
- `AssessmentForm.tsx` — controlled form, owns local field state, calls `onSubmit(profile)` on valid submit.
- `ChipSelect.tsx` — reusable multi/single-select chip group (used for concerns, sensitivity).
- `BudgetInput.tsx` — numeric input with ₹ formatting and validation.
- `ResultsList.tsx` — renders 3 `RecommendationCard`s + "Modify My Preferences".
- `LoadingState.tsx` — cycles through the 3 loading phrases.
- `ErrorState.tsx` — friendly message + retry button.
- `Disclaimer.tsx` — small persistent note near results.

## 5. Form State & Validation

```ts
interface SkinProfile {
  ageGroup: string;
  skinType: string;
  concerns: string[]; // must include at least 1, or ["No Specific Concern"]
  sensitivity: string[];
  productWanted: string; // select value or free text
  budget: number; // > 0
}
```

Validation rules:
- All single-select fields required.
- `concerns` must have ≥1 entry (default can be pre-selected "No Specific Concern" or require explicit choice).
- `productWanted` non-empty string.
- `budget` numeric, > 0, reasonable upper bound (e.g. ≤ 50000) with inline error otherwise.
- Submit button disabled until valid.

## 6. Netlify Function — `recommend.ts`

- `POST /.netlify/functions/recommend`
- Accepts `SkinProfile` JSON body.
- Validates payload server-side too (never trust client-only validation).
- Builds the Gemini prompt (see §7).
- Calls Gemini API with the server-side `GEMINI_API_KEY`.
- Requests **structured JSON output only** (system instruction: "Respond only with valid JSON, no markdown, no preamble").
- Parses and validates the response against expected shape before returning to the client.
- Returns `{ recommendations: Recommendation[] }` or `{ error: string }` with an appropriate status code.

## 7. Gemini Prompt Design

System-style instruction embedded in the request:

> "You are a skincare product recommendation assistant for users in India. Given a user's skin profile, recommend up to 3 skincare products that best match their skin type, concerns, requested product category, and budget in INR. Prefer products realistically available in the Indian market. Do not make medical claims or diagnoses. For each product, explain briefly why it fits this specific user. Provide a purchase or search link only if you are reasonably confident it is accurate; otherwise omit the link field. Respond ONLY with valid JSON matching this exact schema, no extra text: [schema below]."

User content: the serialized `SkinProfile`.

## 8. Expected JSON Response Format

```json
{
  "recommendations": [
    {
      "productName": "string",
      "brand": "string",
      "productType": "string",
      "price": "string | null",
      "keyInfo": "string",
      "reasoning": "string",
      "link": "string | null"
    }
  ]
}
```

## 9. Response Validation

- Confirm `recommendations` is an array, length 1–3.
- Confirm each item has required string fields (`productName`, `brand`, `productType`, `keyInfo`, `reasoning`); `price` and `link` may be null.
- Strip/reject any field not in the schema.
- If Gemini returns non-JSON or malformed JSON, attempt one lightweight cleanup (strip markdown code fences) before failing gracefully.
- On total failure, return a generic error to the client — never forward raw Gemini errors.

## 10. Environment Variables

- `GEMINI_API_KEY` — set in Netlify site environment variables, **server-side only**, referenced solely inside `netlify/functions/recommend.ts`. Never imported into any `src/` frontend file, never logged, never sent to the client in any response payload.

## 11. Error Handling

| Layer | Failure | Handling |
|---|---|---|
| Client | Invalid form | Inline validation, no request sent |
| Function | Missing/invalid body | 400 + generic error message |
| Function | Gemini API error/timeout | 502 + generic error message, log details server-side only |
| Function | Malformed Gemini JSON | 502 + generic error message |
| Client | Fetch/network failure | Show `ErrorState` with retry |

## 12. Link Handling

- Links rendered as `target="_blank" rel="noopener noreferrer"`.
- If `link` is null, card simply omits the "View Product →" button (no dead link, no fabricated URL).

## 13. Loading Behavior

- `status` set to `loading` immediately on submit.
- `LoadingState` cycles the 3 phrases on a simple interval (e.g. every ~1.5–2s) until response resolves.

## 14. Performance

- Gemini call fires only on explicit "Generate Recommendation" click — never on field change, never prefetched.
- Minimal dependencies: no heavy UI kit, no animation library beyond Tailwind transitions.
- Vite default code-splitting is sufficient; no manual chunking needed at this scale.

## 15. Local Development

```
npm install
npm run dev            # Vite dev server
netlify dev             # runs Vite + Netlify Functions together, proxies /.netlify/functions/*
```

`.env` (local only, gitignored): `GEMINI_API_KEY=...`

## 16. Production Build

```
npm run build           # outputs to dist/
```

## 17. Netlify Deployment

`netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"
```

Set `GEMINI_API_KEY` in Netlify site settings → Environment variables (not committed to repo).

## 18. Testing

- Manual test matrix: each skin type × "No Specific Concern" × each product category × varied budgets.
- Test malformed Gemini response handling by temporarily forcing a bad prompt.
- Test offline/network-failure path.
- Test responsive breakpoints (mobile/tablet/desktop) manually or via browser devtools.
- Run `npm run build` and verify no TypeScript errors before deployment.
