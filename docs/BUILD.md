# SkinTwin — BUILD.md

> **Antigravity: read PROJECT.md, DESIGN.md, and TECHNICAL.md in full before writing any code.** Inspect the existing repository first. Do not create a database, dataset, or authentication. Do not over-engineer. Keep everything centered on the single Gemini-powered workflow. Never expose `GEMINI_API_KEY` to the client. Complete all phases through to a working production build — do not stop at planning.

Target: ~1–2 hours total.

## Phase 1 — Inspect Existing Repository
**Objective:** Understand current state before changing anything.
**Tasks:** List repo contents; identify any leftover code, dependencies, or config from prior iterations of this project.
**Files affected:** none (read-only pass)
**Expected result:** Clear picture of what to keep vs. remove.
**Verification:** Written summary of repo state before proceeding.

## Phase 2 — Clean Unnecessary Old Code
**Objective:** Remove anything not aligned with the simplified spec (old backend, database files, unused deps, leftover dataset files).
**Tasks:** Delete obsolete files/folders; remove unused packages from `package.json`.
**Files affected:** repo root, `package.json`
**Expected result:** Clean slate matching TECHNICAL.md's folder structure.
**Verification:** `npm install` runs clean with no dangling references.

## Phase 3 — Set Up React + TypeScript + Vite + Tailwind
**Objective:** Scaffold the base app.
**Tasks:** `npm create vite@latest` (react-ts template) if not already present; install/configure Tailwind; set up base color tokens from DESIGN.md in `tailwind.config.ts`; import chosen fonts.
**Files affected:** `vite.config.ts`, `tailwind.config.ts`, `src/styles/index.css`, `index.html`
**Expected result:** Blank app runs with SkinTwin fonts/colors available.
**Verification:** `npm run dev` loads a styled blank page.

## Phase 4 — Build the SkinTwin Assessment UI
**Objective:** Static version of the main screen per DESIGN.md.
**Tasks:** Build `AssessmentForm.tsx`, `ChipSelect.tsx`, `BudgetInput.tsx` with hardcoded/local state; hero title + tagline + description.
**Files affected:** `src/components/*`, `src/App.tsx`
**Expected result:** Full form renders, visually matches DESIGN.md, not yet wired to logic.
**Verification:** Manual visual check against color/typography spec.

## Phase 5 — Implement Form State and Validation
**Objective:** Wire form to `SkinProfile` state with validation rules from TECHNICAL.md §5.
**Tasks:** Add controlled state, validation, disabled/enabled CTA logic.
**Files affected:** `src/App.tsx`, `src/components/AssessmentForm.tsx`, `src/types/skintwin.ts`
**Expected result:** Form only submits when valid; "No Specific Concern" path works.
**Verification:** Try submitting empty/partial/valid forms.

## Phase 6 — Create Netlify Gemini Function
**Objective:** Scaffold `netlify/functions/recommend.ts` with request/response handling shell.
**Tasks:** Set up function skeleton, env var read, request validation, response shape stub.
**Files affected:** `netlify/functions/recommend.ts`, `netlify.toml`
**Expected result:** Function deployable and callable, returns stub JSON.
**Verification:** `netlify dev` → call endpoint via curl/Postman, get stub response.

## Phase 7 — Implement Gemini Prompt and Structured Response
**Objective:** Real Gemini integration per TECHNICAL.md §7–9.
**Tasks:** Build prompt from `SkinProfile`; call Gemini API; parse/validate JSON; handle malformed responses.
**Files affected:** `netlify/functions/recommend.ts`
**Expected result:** Real profile input produces real, schema-valid recommendations.
**Verification:** Test with several profiles including the no-concern sunscreen case.

## Phase 8 — Build Recommendation Result Cards
**Objective:** Render Gemini's output per DESIGN.md §9.
**Tasks:** Build `RecommendationCard.tsx`, `ResultsList.tsx`, wire to API response; add "Modify My Preferences" back-navigation.
**Files affected:** `src/components/RecommendationCard.tsx`, `src/components/ResultsList.tsx`, `src/App.tsx`
**Expected result:** Full end-to-end flow works: form → loading → results.
**Verification:** Manual run through full user flow.

## Phase 9 — Add Loading/Error/Empty States
**Objective:** Implement `LoadingState.tsx`, `ErrorState.tsx`, empty-results handling, and `Disclaimer.tsx`.
**Tasks:** Cycling loading phrases; friendly error + retry; empty-state messaging; persistent subtle disclaimer near results.
**Files affected:** `src/components/LoadingState.tsx`, `ErrorState.tsx`, `Disclaimer.tsx`, `App.tsx`
**Expected result:** All non-happy-paths feel polished, not broken.
**Verification:** Force each failure mode (bad network, malformed response, zero results) and confirm graceful handling.

## Phase 10 — Responsive Polish
**Objective:** Ensure mobile/tablet/desktop all match DESIGN.md §13.
**Tasks:** Adjust grid/stacking, spacing, touch target sizes.
**Files affected:** component Tailwind classes throughout
**Expected result:** Clean, intentional mobile layout — not just a shrunk desktop.
**Verification:** Test at common breakpoints (375px, 768px, 1440px).

## Phase 11 — Test
**Objective:** Run through TECHNICAL.md §18 test matrix.
**Tasks:** Test each skin type, no-concern case, varied budgets/products, error paths, responsive breakpoints.
**Files affected:** none (verification only)
**Expected result:** All acceptance criteria in PROJECT.md §13 pass.
**Verification:** Checklist walk-through, fix any failures found.

## Phase 12 — Production Build and Netlify Deployment
**Objective:** Ship it.
**Tasks:** `npm run build`; confirm no TS errors; set `GEMINI_API_KEY` in Netlify env vars; deploy; smoke-test live URL.
**Files affected:** none (build/deploy step)
**Expected result:** Live, working SkinTwin on Netlify with no exposed keys.
**Verification:** Full user flow tested on the live deployed URL, including a mobile device.
