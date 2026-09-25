# PROJECT INFORMATION: SKINTWIN

---

## 1. PROJECT IDENTIFICATION

- **Project Title**: SkinTwin
- **Project Tagline**: *"Your skin. Your twin. Your routine."*
- **Project Type**: AI-Powered Web Application / Serverless Consultation System
- **Domain**: Consumer Healthcare & Skincare Discovery
- **Sub-Domain**: Generative AI Recommendation Engine / E-Commerce Decision Support
- **Main Purpose**: To eliminate skincare discovery overwhelm by analyzing user skin profiles, sensitivity thresholds, active concerns, category needs, and INR (₹) budget constraints to return six tailored product recommendations with individual reasoning and multi-retailer purchase links using Google Gemini AI reasoning.
- **Short Description**: A single-workflow, zero-database, privacy-first web consultation app built with React, TypeScript, Tailwind CSS, Netlify Functions, and the Google Gemini REST API.
- **Target Users**:
  - College-age students and young adults exploring skincare routines.
  - Budget-conscious Indian consumers seeking INR-aware product options.
  - Individuals with specific skin sensitivities or multi-concern profiles.
  - Users seeking quick skincare advice without creating accounts or completing quiz walls.
- **Intended Use Case**: Non-medical consumer product discovery and routine curation.
- **Current Project Status**: Production-Ready / Fully Implemented & Deployed
- **Development Environment**: Node.js, Vite, TypeScript Compiler (`tsc`), Tailwind CSS PostCSS, Netlify CLI (`netlify dev`)
- **Programming Languages**: TypeScript (100% frontend and serverless function implementation), HTML5, CSS3
- **Academic / Project Context**: [NOT PROVIDED: Academic Institution / Course Code / Semester / Guide Name]

---

## 2. PROJECT OVERVIEW

- **What the Project Does**: SkinTwin provides an interactive, single-screen skincare consultation. Users input demographic and skin characteristics (age group, skin type, concerns, tolerance, desired product type, target budget in ₹). A serverless Netlify Function validates the profile, formats a prompt with system instructions enforcing JSON output schema, calls the Google Gemini API across a resilient model fallback hierarchy, normalizes product details and retailer links (Official Store, Nykaa, Amazon India), and displays six curated product cards.
- **What Problem It Addresses**: The skincare market is saturated with thousands of products, confusing ingredient terminology, aggressive marketing, and sponsored product quizzes that force user registration or recommend hardcoded sponsored items.
- **Why It Was Developed**: To create a zero-bias, friction-free discovery tool where AI reasoning dynamically matches user requirements against realistic Indian market products without requiring static databases, web scraping, user authentication, or data harvesting.
- **Who Would Use It**: Consumers shopping for skincare products tailored to their skin type, budget, and specific concerns.
- **Main Workflow**:
  1. User fills out the single-screen consultation form.
  2. Client validates inputs (budget boundaries, selection completeness).
  3. Client executes HTTP POST request to `/.netlify/functions/recommend`.
  4. Serverless Netlify Function re-validates payload and injects `GEMINI_API_KEY`.
  5. Netlify Function queries Google Gemini REST API with structured JSON output instructions.
  6. Gemini evaluates inputs against Indian market product knowledge.
  7. Netlify Function parses JSON output and constructs deep search links for Official Stores, Nykaa, and Amazon India.
  8. Frontend receives recommendations array and renders luxury editorial recommendation cards.
  9. User can view product reasoning, click retailer links, or select "Modify My Preferences" to re-consult.
- **Major Features**:
  - Controlled multi-section consultation form.
  - Real-time input validation and budget boundary enforcement (₹1 to ₹50,000).
  - Support for "No Specific Concern" maintenance routines.
  - Free-text custom product category search.
  - Serverless proxy isolating API keys.
  - Resilient model fallback system (`gemini-flash-lite-latest` down to `gemini-flash-latest`).
  - Multi-retailer purchase link generation.
  - Responsive luxury editorial UI (Cream `#FAF7F0`, Dark Olive `#384238`, Sage `#A8BFA3`, Dusty Peach `#E8B7A5`).
- **Major Modules**:
  - `AssessmentForm`: Manages local input states and validation rules.
  - `ChipSelect` & `BudgetInput`: Reusable form controls.
  - `api.ts`: Client API layer communicating with serverless endpoints.
  - `recommend.ts`: Netlify Function handling API key isolation, prompt serialization, Gemini fetch, and link normalization.
  - `ResultsList` & `RecommendationCard`: Renders curated results and retailer outbound links.
  - `LoadingState`, `ErrorState`, `Disclaimer`: State and compliance management.
- **Inputs**: Age group, skin type, skin concerns array, sensitivity array, product category / custom text, budget integer (INR).
- **Processing**: Client validation -> JSON HTTP POST -> Serverless profile normalization -> Gemini system instruction API call -> Response JSON parsing & cleanup -> Multi-retailer URL building.
- **Outputs**: Normalized recommendations JSON array containing 6 items (product name, brand, category, price, key ingredients info, personalized reasoning, and multi-retailer link objects).
- **Expected Outcome**: Instant, accurate, budget-compliant product recommendations with clear ingredient rationale and verified shopping links.

---

## 3. PROBLEM STATEMENT INFORMATION

- **Problem Being Addressed**: Skincare shopping suffers from choice paralysis, sponsored quiz bias, misleading marketing claims, and price misalignment in local markets.
- **Existing Difficulties**:
  - E-commerce platforms display thousands of unranked products.
  - Online skincare quizzes are hardcoded sales funnels for specific brands.
  - Generic recommendations ignore user budget constraints or regional product availability.
  - Most recommendation applications require user account creation, capturing emails and personal data.
- **Existing Workflow**: Users search Google or Reddit for product reviews, manually compare ingredient lists on beauty blogs, check multiple retail apps (Nykaa, Amazon) for prices, and frequently purchase incompatible products.
- **Limitations of Existing Approaches**: Static product databases require expensive manual cataloging and quickly become outdated; machine learning classifiers require massive labeled datasets; referral-driven websites prioritize commission over user fit.
- **Problems Faced by Users**: Frustration, wasted money on ineffective products, skin irritation from incompatible ingredients, and privacy invasion from data-harvesting sites.
- **Need for the Proposed System**: A lightweight, private, real-time consultation tool that leverages generative AI reasoning over local market options while maintaining strict user privacy and server-side secret protection.
- **Gap Addressed by This Project**: SkinTwin bridges generative AI reasoning with structured serverless execution, providing local market awareness (INR pricing and Indian brand availability) without requiring local database infrastructure or user tracking.

---

## 4. OBJECTIVES

### Primary Objectives
1. **Objective 1**: Develop a zero-database, serverless web application that delivers personalized skincare recommendations in under 60 seconds. [DERIVED FROM IMPLEMENTATION]
2. **Objective 2**: Integrate Google Gemini API via a secure backend proxy to reason over user skin profiles and return structured JSON recommendations. [DERIVED FROM IMPLEMENTATION]
3. **Objective 3**: Implement strict INR (₹) budget filtering and regional market constraint enforcement for skincare products available in India. [DERIVED FROM IMPLEMENTATION]

### Secondary Objectives
1. **Objective 1**: Design a high-contrast, accessible, luxury editorial user interface following modern design tokens (Cream, Sage, Dark Olive, Dusty Peach). [DERIVED FROM IMPLEMENTATION]
2. **Objective 2**: Implement a resilient backend fallback system across multiple Gemini model endpoints to ensure high availability during API load spikes. [DERIVED FROM IMPLEMENTATION]
3. **Objective 3**: Support first-class "No Specific Concern" and custom free-text product requests without degrading recommendation accuracy. [DERIVED FROM IMPLEMENTATION]

---

## 5. PROJECT SCOPE

- **Current Functionality**:
  - Full single-screen consultation form handling 6 distinct skin criteria.
  - Real-time client and server-side profile validation.
  - Automated generation of 6 product recommendations per consultation.
  - Personalized ingredient and routine reasoning per card.
  - Multi-retailer purchasing links (Official Brand Site, Nykaa, Amazon India).
  - Editorial loading screen phrase cycling.
  - Friendly error handling with retry triggers.
- **Implemented Features**:
  - Single-select chip selection (Age Group, Skin Type, Product Category).
  - Multi-select chip selection (Concerns, Sensitivity).
  - Special mutual exclusion logic for "No Specific Concern".
  - Numeric INR budget input with range boundaries (1 to 50,000).
  - Free-text custom product request field override.
  - Serverless environment variable isolation for `GEMINI_API_KEY`.
  - Gemini REST API integration with system instruction schema enforcement.
  - Markdown fence stripper and JSON auto-repair in serverless function.
  - Responsive desktop (3-col grid), tablet (2-col grid), and mobile (1-col stack) layout.
- **Supported Users**: Any web browser user (desktop, tablet, mobile).
- **Supported Platforms**: Modern web browsers (Chrome, Firefox, Safari, Edge).
- **Supported Data**: User skin profile JSON structures.
- **Integrations**: Google Gemini REST API (v1beta), Netlify Functions runtime.
- **Out-of-Scope Functionality**:
  - Medical diagnosis or dermatological prescriptions.
  - Facial image scanning / computer vision analysis.
  - E-commerce cart, checkout, or payment processing.
  - User accounts, login/signup, or profile save history.
  - Local database storage or user activity tracking.
  - Product web scraping or affiliate link manipulation.
- **Known Constraints**:
  - Requires active internet connectivity for Gemini API fetch.
  - Dependent on Google Gemini API rate limits and model availability.
  - Product pricing and availability are subject to real-world market changes.
- **Current Limitations**:
  - Retailer links rely on Google Feeling Lucky redirects (`btnI=1`) and search query parameters.
  - Multi-currency support is restricted to Indian Rupees (INR ₹).

---

## 6. TECHNOLOGY STACK

| Category | Technology | Version | Purpose | Evidence/Source |
|---|---|---|---|---|
| Programming Language | TypeScript | ^5.7.3 | Static typing across frontend & backend | `package.json`, `tsconfig.json` |
| Frontend Framework | React | ^18.3.1 | UI view layer & state orchestration | `package.json`, `src/App.tsx` |
| Build Tool | Vite | ^6.1.0 | Frontend dev server & production bundling | `package.json`, `vite.config.ts` |
| CSS Framework | Tailwind CSS | ^3.4.17 | Utility-first styling & layout | `package.json`, `tailwind.config.ts` |
| CSS Post-Processor | Autoprefixer / PostCSS | ^10.4.20 / ^8.5.2 | Vendor prefixing and CSS transformation | `package.json`, `postcss.config.js` |
| Icon Library | Lucide React | ^0.475.0 | UI icons (`ArrowUpRight`, `AlertCircle`) | `package.json`, `RecommendationCard.tsx` |
| Serverless Backend | Netlify Functions | ^2.8.2 | Serverless Node.js proxy handler | `package.json`, `recommend.ts` |
| AI / LLM Engine | Google Gemini REST API | v1beta | AI reasoning and JSON recommendation generation | `netlify/functions/recommend.ts` |
| Environment Config | dotenv | ^16.4.7 | Local environment variable management | `package.json`, `.env.example` |
| Development Tools | Netlify CLI | N/A | Local function proxying and testing | `docs/TECHNICAL.md`, `README.md` |
| Web Host / CDN | Netlify Platform | N/A | Production hosting & edge function execution | `netlify.toml` |

---

## 7. FEATURES

### 1. Interactive Consultation Form
- **Purpose**: Collects comprehensive user skin characteristics.
- **User Interaction**: Toggles option chips, enters budget, types custom product requests.
- **Input**: Age group, skin type, concerns array, sensitivity array, product category, budget amount.
- **Processing**: Validates all fields locally; enforces bounds on numeric budget.
- **Output**: Validated `SkinProfile` object passed to `onSubmit`.
- **Relevant Files**: `src/components/AssessmentForm.tsx`, `src/components/ChipSelect.tsx`, `src/components/BudgetInput.tsx`
- **Dependencies**: React `useState`
- **Implementation Status**: Implemented
- **Evidence/Source**: `src/components/AssessmentForm.tsx` lines 1-251

### 2. Mutual Exclusion Concern Handler
- **Purpose**: Ensures selecting "No Specific Concern" clears specific concerns and vice versa.
- **User Interaction**: Clicking "No Specific Concern" chip or specific concern chips.
- **Input**: Selected concern chip string.
- **Processing**: Filters array state based on selection rules.
- **Output**: Updated `concerns` string array.
- **Relevant Files**: `src/components/AssessmentForm.tsx`
- **Dependencies**: None
- **Implementation Status**: Implemented
- **Evidence/Source**: `src/components/AssessmentForm.tsx` lines 46-61

### 3. Serverless API Proxy & Secret Isolation
- **Purpose**: Protects `GEMINI_API_KEY` from client exposure and processes recommendation requests.
- **User Interaction**: None (background HTTP trigger).
- **Input**: HTTP POST body containing `SkinProfile` JSON.
- **Processing**: Validates body, reads process environment, constructs system prompt, calls Gemini API.
- **Output**: HTTP 200 JSON with recommendations or HTTP error payload.
- **Relevant Files**: `netlify/functions/recommend.ts`
- **Dependencies**: `@netlify/functions`
- **Implementation Status**: Implemented
- **Evidence/Source**: `netlify/functions/recommend.ts` lines 1-315

### 4. Multi-Model Fallback System
- **Purpose**: Prevents service interruption if a specific Gemini model experiences quota issues or degradation.
- **User Interaction**: None.
- **Input**: Serialized user prompt.
- **Processing**: Iterates through model array (`gemini-flash-lite-latest`, `gemini-3.8-flash`, `gemini-3.7-flash`, `gemini-3.5-flash`, `gemini-flash-latest`) until a valid response is returned.
- **Output**: First successful AI text response.
- **Relevant Files**: `netlify/functions/recommend.ts`
- **Dependencies**: Global `fetch` API
- **Implementation Status**: Implemented
- **Evidence/Source**: `netlify/functions/recommend.ts` lines 235-300

### 5. Structured JSON AI Response Enforcement
- **Purpose**: Guarantees parseable output from Gemini API without raw text prose.
- **User Interaction**: None.
- **Input**: System instruction defining exact JSON schema.
- **Processing**: Passes `response_mime_type: "application/json"` in Gemini generation config; strips markdown code fences if present; parses JSON.
- **Output**: Validated recommendation objects.
- **Relevant Files**: `netlify/functions/recommend.ts`
- **Dependencies**: `JSON.parse`
- **Implementation Status**: Implemented
- **Evidence/Source**: `netlify/functions/recommend.ts` lines 28-52, 78-85, 257

### 6. Multi-Retailer Buying Link Normalization
- **Purpose**: Generates direct purchasing links for Indian e-commerce platforms.
- **User Interaction**: Clicking retailer link badges on product cards.
- **Input**: Product name, brand name, and optional direct link from Gemini.
- **Processing**: Constructs encoded Google I'm Feeling Lucky search URLs for Official Store, Nykaa (`site:nykaa.com`), and Amazon India (`site:amazon.in`).
- **Output**: Array of `ProductLink` objects with title and URL.
- **Relevant Files**: `netlify/functions/recommend.ts`, `src/components/RecommendationCard.tsx`
- **Dependencies**: `encodeURIComponent`
- **Implementation Status**: Implemented
- **Evidence/Source**: `netlify/functions/recommend.ts` lines 115-154, `RecommendationCard.tsx` lines 20-27

### 7. Editorial Loading Phrase Cycler
- **Purpose**: Provides visual feedback during backend API processing.
- **User Interaction**: Viewing loading screen after form submission.
- **Input**: Active loading status state.
- **Processing**: `setInterval` timer cycles through 3 pre-defined loading phrases every 2000ms.
- **Output**: Animated fading text phrase display.
- **Relevant Files**: `src/components/LoadingState.tsx`
- **Dependencies**: React `useState`, `useEffect`
- **Implementation Status**: Implemented
- **Evidence/Source**: `src/components/LoadingState.tsx`

---

## 8. SYSTEM MODULES

### 1. `App` (Root Orchestrator)
- **Purpose**: Manages global application lifecycle state (`status`, `profile`, `recommendations`, `errorMessage`).
- **Responsibility**: Renders header, conditional state views (Form, Loading, Error, Results), and handles top-level submit/retry/modify triggers.
- **Inputs**: Form submissions, API responses, user navigation clicks.
- **Outputs**: Active screen rendering.
- **Important Files**: `src/App.tsx`
- **Functions/Classes**: `App()`
- **Dependencies**: `AssessmentForm`, `ResultsList`, `LoadingState`, `ErrorState`, `Disclaimer`, `fetchRecommendations`
- **Interaction with other modules**: Connects form output to API client and passes result payload to results view.
- **Implementation Details**: Uses standard React `useState` hooks with status enum `'idle' | 'loading' | 'success' | 'error'`.
- **Current Status**: Complete

### 2. `AssessmentForm` (Consultation Manager)
- **Purpose**: Renders and controls all form inputs for the skincare assessment.
- **Responsibility**: Local state tracking, field validation, mutual exclusion handling, submit execution.
- **Inputs**: User selections for 6 sections; optional `initialValues` prop.
- **Outputs**: `SkinProfile` object via `onSubmit` callback.
- **Important Files**: `src/components/AssessmentForm.tsx`
- **Functions/Classes**: `AssessmentForm`, `handleConcernToggle`, `handleSensitivityToggle`, `handleBudgetChange`, `handleSubmit`
- **Dependencies**: `ChipSelect`, `BudgetInput`, `skintwin.ts` types
- **Interaction with other modules**: Formats user selection data into strict `SkinProfile` interface.
- **Current Status**: Complete

### 3. `Netlify Function: recommend` (Serverless Backend Proxy)
- **Purpose**: Acts as secure proxy between client and Google Gemini REST API.
- **Responsibility**: Server-side profile validation, environment variable extraction, prompt construction, multi-model execution, JSON parsing, link normalization, CORS headers.
- **Inputs**: HandlerEvent with JSON body.
- **Outputs**: HTTP response object with status code, headers, and JSON body `{ recommendations: Recommendation[] }`.
- **Important Files**: `netlify/functions/recommend.ts`
- **Functions/Classes**: `handler`, `validateProfile`, `cleanAndParseJSON`, `validateAndNormalizeRecommendations`
- **Dependencies**: `@netlify/functions`
- **Interaction with other modules**: Invoked by client `api.ts`; calls Google Gemini REST endpoint.
- **Current Status**: Complete

### 4. `API Client` (`api.ts`)
- **Purpose**: Handles client-side HTTP request dispatch to backend function.
- **Responsibility**: Formatting fetch requests, handling HTTP errors, catching network failures.
- **Inputs**: `SkinProfile` object.
- **Outputs**: Promise resolving to `RecommendationResponse`.
- **Important Files**: `src/lib/api.ts`
- **Functions/Classes**: `fetchRecommendations(profile)`
- **Dependencies**: Native browser `fetch`
- **Interaction with other modules**: Called by `App.tsx` upon form submission.
- **Current Status**: Complete

### 5. `ResultsList` & `RecommendationCard` (Presentation Layer)
- **Purpose**: Displays generated product recommendations and retailer links.
- **Responsibility**: Rendering recommendation cards in responsive grid layout, providing "Modify Preferences" action.
- **Inputs**: Array of `Recommendation` objects, active `SkinProfile`.
- **Outputs**: Interactive product cards with outbound links.
- **Important Files**: `src/components/ResultsList.tsx`, `src/components/RecommendationCard.tsx`
- **Functions/Classes**: `ResultsList`, `RecommendationCard`
- **Dependencies**: `lucide-react` (`ArrowUpRight`)
- **Interaction with other modules**: Receives recommendation data from `App.tsx`.
- **Current Status**: Complete

---

## 9. SYSTEM ARCHITECTURE

- **High-Level Architecture**: Serverless Single Page Application (SPA) architecture. The client renders statically hosted React assets via Netlify CDN and proxies backend logic through serverless Node.js Netlify Functions to Google's Gemini Cloud infrastructure.
- **Frontend Architecture**: Component-driven architecture using React 18, TypeScript, and Tailwind CSS. Top-level state orchestration in `App.tsx` controls modular child components (`AssessmentForm`, `ResultsList`, `LoadingState`, `ErrorState`, `Disclaimer`).
- **Backend Architecture**: Stateless serverless microservice (`recommend.ts`) executed on Node.js runtime. Handles request validation, system prompt formulation, API orchestration, and payload normalization.
- **Database Architecture**: [NOT APPLICABLE / NONE] — Stateless architecture; no persistent storage layer.
- **API Architecture**: RESTful HTTP POST endpoint (`/.netlify/functions/recommend`) communicating over JSON payloads.
- **ML / Data Pipeline Architecture**: Generative LLM pipeline. User profile JSON -> System Prompt Serialization -> Gemini API -> JSON Output Schema Enforcement -> Server-side Link Normalization -> Client Presentation.
- **External Services**: Google Gemini REST API (`generativelanguage.googleapis.com`), Netlify Platform.
- **Authentication Flow**: [NOT APPLICABLE / NONE] — Anonymous access; no user authentication.
- **Data Flow**:
  1. User Form Input -> `AssessmentForm` state.
  2. `AssessmentForm` -> `App.tsx` (`handleFormSubmit`).
  3. `App.tsx` -> `src/lib/api.ts` (`fetchRecommendations`).
  4. `api.ts` -> HTTP POST `/.netlify/functions/recommend`.
  5. Netlify Function -> Server Validation & Prompt Construction.
  6. Netlify Function -> HTTP POST `https://generativelanguage.googleapis.com/...`.
  7. Gemini API -> AI Generation -> Response JSON.
  8. Netlify Function -> JSON Clean/Parse -> Link Generation.
  9. Netlify Function -> HTTP 200 JSON Response.
  10. `api.ts` -> `App.tsx` state -> `ResultsList` rendering.
- **Communication Between Components**: Props passing and event callback functions (e.g., `onSubmit`, `onModifyPreferences`, `onRetry`).

### Diagram Structural Descriptions (For Later Visualization)
- **System Architecture Diagram**:
  - `Browser Client (React SPA)` communicates via HTTP POST `/api/recommend` to `Netlify Serverless Function`.
  - `Netlify Function` reads `GEMINI_API_KEY` from `Netlify Environment Variables` and sends HTTP POST to `Google Gemini REST API`.
  - `Google Gemini API` returns JSON payload to `Netlify Function`, which returns processed recommendations to `Browser Client`.
- **Data Flow Diagram (Level 1)**:
  - User -> (Inputs Skin Profile) -> Process 1.0 (Form Validation) -> Validated Profile -> Process 2.0 (Serverless Proxy) -> Prompt + Schema -> Process 3.0 (Gemini AI Engine) -> Structured JSON -> Process 4.0 (Link Generator) -> Final Recommendations -> User.
- **Use Case Diagram**:
  - Actor: `User`
  - Use Cases: `Fill Consultation Form`, `Select Concerns / Sensitivity`, `Set INR Budget`, `Request Custom Category`, `Generate Recommendations`, `View Product Reasoning`, `Click Buying Link (Nykaa/Amazon)`, `Modify Preferences`.

---

## 10. FRONTEND

- **Frontend Framework**: React 18.3.1 with TypeScript 5.7.3 and Vite 6.1.0.
- **Pages**: Single Page Application (SPA) with view switching based on `AppStatus` state (`idle`, `loading`, `success`, `error`).
- **Routes**: Client-side single route (`/`). Server redirects handled via `netlify.toml`.
- **Components**: `AssessmentForm`, `ChipSelect`, `BudgetInput`, `RecommendationCard`, `ResultsList`, `LoadingState`, `ErrorState`, `Disclaimer`.
- **Navigation**: State-driven navigation ("Generate Recommendation" -> Loading -> Results; "Modify My Preferences" -> Form).
- **Forms**: Controlled form in `AssessmentForm.tsx` managing 6 input groups with real-time validation.
- **User Interactions**: Chip selecting/deselecting, free-text input, numeric budget typing, form submission, preference modification, external link clicking.
- **State Management**: React `useState` hooks in `App.tsx` and `AssessmentForm.tsx`.
- **API Calls**: Executed via `fetchRecommendations(profile)` in `src/lib/api.ts`.
- **Validation**:
  - Required single-select checking for `ageGroup` and `skinType`.
  - At least 1 concern selected (`concerns.length > 0`).
  - At least 1 sensitivity option selected (`sensitivity.length > 0`).
  - Non-empty product request string.
  - Budget numeric check (`budget > 0` and `budget <= 50000`).
- **Authentication UI**: [NOT APPLICABLE / NONE]
- **Dashboard**: [NOT APPLICABLE / NONE]
- **Important Screens**:
  1. **Consultation Form View** (`status === 'idle'`): Displays hero banner, age bracket, skin type, concerns chips, sensitivity chips, category chips + custom text field, budget input, submit button, disclaimer.
  2. **Loading Screen View** (`status === 'loading'`): Displays animated cycling consultation phrases.
  3. **Results View** (`status === 'success'`): Displays active profile summary pill, 6 recommendation cards in responsive grid, and "Modify My Preferences" CTA.
  4. **Error Screen View** (`status === 'error'`): Displays friendly error message, retry button, and back to form CTA.
- **Responsive Behavior**:
  - Mobile (<640px): 1-column layout, full-width chips and buttons.
  - Tablet (640px–1024px): 2-column results grid, centered form (`max-w-2xl`).
  - Desktop (>1024px): 3-column recommendation card grid, max container width `max-w-5xl`.
- **Error Handling**: Graceful client-side fallback catching network errors or API failures; displays non-technical friendly messages with retry triggers.

---

## 11. BACKEND

- **Backend Framework**: Netlify Functions (Node.js runtime, TypeScript execution).
- **Server Structure**: Serverless function directory (`netlify/functions/recommend.ts`).
- **Routes**: `/.netlify/functions/recommend` (mapped via `netlify.toml`).
- **Controllers**: Integrated inside `handler` export in `recommend.ts`.
- **Services**: Google Gemini REST API (`generativelanguage.googleapis.com`).
- **Middleware**: CORS preflight handling (`OPTIONS` request headers).
- **APIs**: Exposes single POST endpoint.
- **Request / Response Formats**:
  - **Request**: `Content-Type: application/json`
    ```json
    {
      "ageGroup": "18–24",
      "skinType": "Oily",
      "concerns": ["Acne", "Pimples"],
      "sensitivity": ["Sensitive"],
      "productWanted": "Sunscreen",
      "budget": 700
    }
    ```
  - **Response (HTTP 200)**: `Content-Type: application/json`
    ```json
    {
      "recommendations": [
        {
          "productName": "Ultra Matte Dry Touch Sunscreen",
          "brand": "Re'equil",
          "productType": "Sunscreen",
          "price": "₹695",
          "keyInfo": "Advanced UV filters with Tocopherol",
          "reasoning": "Silicone-based matte finish ideal for humid climate oil control.",
          "link": "https://www.google.com/search?btnI=1&q=...",
          "links": [
            { "title": "Official Store", "url": "..." },
            { "title": "Nykaa", "url": "..." },
            { "title": "Amazon", "url": "..." }
          ]
        }
      ]
    }
    ```
- **Authentication**: [NOT APPLICABLE / NONE]
- **Authorization**: [NOT APPLICABLE / NONE]
- **Validation**: Server-side `validateProfile(data)` function verifies all data types, non-empty strings, array contents, and budget numerical bounds (`0 < budget <= 50000`).
- **Error Handling**:
  - 400 Bad Request: Invalid JSON body or failed profile validation.
  - 405 Method Not Allowed: Non-POST/OPTIONS HTTP methods.
  - 503 Service Unavailable: Missing `GEMINI_API_KEY` environment variable.
  - 502 Bad Gateway: All Gemini API model attempts failed or produced unparseable output.
- **Business Logic**: Prompt engineering with embedded system instructions, JSON schema enforcement, model fallback iteration, JSON sanitization, and multi-retailer search URL construction.
- **Important Files**: `netlify/functions/recommend.ts`
- **External APIs**: Google Generative AI REST API (`v1beta/models/...:generateContent`).

### API Endpoints Table

| Method | Endpoint | Purpose | Input | Output | Authentication |
|---|---|---|---|---|---|
| OPTIONS | `/.netlify/functions/recommend` | CORS Preflight Check | None | HTTP 204 No Content | None |
| POST | `/.netlify/functions/recommend` | Generate Recommendations | `SkinProfile` JSON | `{ recommendations: Recommendation[] }` JSON | None (Server holds `GEMINI_API_KEY`) |

---

## 12. DATABASE

- **Database Technology**: [NOT APPLICABLE / NONE]
- **Explanation**: SkinTwin intentionally operates as a stateless application. Product catalog knowledge and reasoning are provided dynamically by Google Gemini's trained parametric memory regarding skincare formulations and Indian market offerings. User profiles exist strictly in transient browser state and serverless memory during execution.

---

## 13. DATA COLLECTION

- **Dataset Name**: [NOT APPLICABLE / NO STATIC DATASET]
- **Dataset Source**: Google Gemini LLM parametric training data (Indian skincare market knowledge).
- **Source URL**: [NOT APPLICABLE]
- **Number of Records**: [NOT APPLICABLE]
- **Number of Features**: [NOT APPLICABLE]
- **Feature Names**: [NOT APPLICABLE]
- **Data Types**: [NOT APPLICABLE]
- **Target Variable**: [NOT APPLICABLE]
- **Collection Method**: Dynamic prompt injection of user profile parameters.
- **Data Acquisition Method**: User input via `AssessmentForm` UI.
- **Storage Format**: JSON payloads in transit.
- **Data Limitations**: AI model knowledge cutoff and potential market price fluctuations.
- **Licensing Information**: Google Gemini API Terms of Service.

---

## 14. DATA PREPROCESSING

- **Missing-Value Handling**: Enforced at form level; submission blocked until all required profile fields are populated.
- **Duplicate Removal**: Handled in array toggling logic (e.g., filtering out duplicate concerns or sensitivity chips).
- **Outlier Handling**: Budget input clamped with hard bounds (`1` to `50000` INR).
- **Encoding**: Form selections encoded as standardized string values (e.g., `'18–24'`, `'Oily'`).
- **Scaling / Normalization**: Budget rounded to nearest integer via `Math.round(budget)`.
- **Feature Selection / Engineering**: User inputs compiled into a structured prompt text string:
  ```
  User Skin Profile:
  - Age Group: 18–24
  - Skin Type: Oily
  - Primary Skin Concerns: Acne, Pimples
  - Skin Tolerance & Sensitivity: Sensitive
  - Product Requested: Sunscreen
  - Target Budget: Up to ₹700 INR
  ```
- **Data Transformation**: Serverless function cleans raw AI text output by stripping markdown code block fences (` ```json ... ``` `) before JSON parsing.
- **Train / Test Split**: [NOT APPLICABLE]
- **Relevant Files**: `src/components/AssessmentForm.tsx`, `netlify/functions/recommend.ts`

---

## 15. MACHINE LEARNING / AI / DATA SCIENCE

- **Problem Type**: Generative AI Consultation / Natural Language Reasoning & Recommendation.
- **Learning Type**: Pre-trained LLM Inference (Zero-shot structured generation with system instructions).
- **Classification / Regression / Clustering**: Generative text reasoning over constrained JSON schema.
- **Algorithms / Models**: Google Gemini Foundation Models (`gemini-flash-lite-latest`, `gemini-3.8-flash`, `gemini-3.7-flash`, `gemini-3.5-flash`, `gemini-flash-latest`).
- **Libraries**: Native fetch interface calling REST API.
- **Model Architecture**: Google Gemini Transformer Architecture.
- **Input Features**: Age Group, Skin Type, Concerns List, Sensitivity List, Product Wanted, Budget (INR).
- **Target Variable**: JSON array containing exactly 6 structured `Recommendation` objects.
- **Training Process**: Pre-trained by Google; fine-tuned via system prompt context at inference time.
- **Hyperparameters**:
  - `temperature`: `0.2` (Low temperature for deterministic, factual constraint adherence).
  - `response_mime_type`: `'application/json'`.
- **Loss Function**: [PRE-TRAINED MODEL / NOT APPLICABLE AT INFERENCE]
- **Optimization Method**: [PRE-TRAINED MODEL / NOT APPLICABLE AT INFERENCE]
- **Validation Process**: Serverless response structure validation (`validateAndNormalizeRecommendations`) checking for array existence, required fields (`productName`, `brand`, `reasoning`), and length normalization (1 to 6 items).
- **Prediction Process**: System prompt injection -> Gemini API inference -> JSON cleanup -> Schema validation -> Retailer URL generation.

### Model Summary Table

| Model Name | Purpose | Algorithm | Input | Output | Hyperparameters | Evaluation Method | Relevant Files |
|---|---|---|---|---|---|---|---|
| `gemini-flash-lite-latest` | Primary recommendation engine | Transformer LLM | System prompt + user skin profile | Structured JSON (6 products) | `temp=0.2`, `mime=application/json` | Structural schema validation | `recommend.ts` |
| `gemini-3.8-flash` | Secondary fallback model | Transformer LLM | System prompt + user skin profile | Structured JSON (6 products) | `temp=0.2`, `mime=application/json` | Structural schema validation | `recommend.ts` |
| `gemini-3.7-flash` | Tertiary fallback model | Transformer LLM | System prompt + user skin profile | Structured JSON (6 products) | `temp=0.2`, `mime=application/json` | Structural schema validation | `recommend.ts` |
| `gemini-3.5-flash` | Quaternary fallback model | Transformer LLM | System prompt + user skin profile | Structured JSON (6 products) | `temp=0.2`, `mime=application/json` | Structural schema validation | `recommend.ts` |
| `gemini-flash-latest` | Final fallback model | Transformer LLM | System prompt + user skin profile | Structured JSON (6 products) | `temp=0.2`, `mime=application/json` | Structural schema validation | `recommend.ts` |

---

## 16. DATA SCIENCE TECHNIQUES

### 1. System Instruction & Prompt Engineering
- **Where Used**: `netlify/functions/recommend.ts` (lines 28–52)
- **Purpose**: Enforces strict domain role ("expert skincare recommendation assistant specializing in the Indian market"), product count (exactly 6), Indian brand preference, medical disclaimers, INR pricing, and JSON schema output.
- **Inputs**: Text system instruction block.
- **Outputs**: Constrained AI behavior.
- **Relevant Files**: `netlify/functions/recommend.ts`

### 2. Output Schema Enforcement (JSON Mode)
- **Where Used**: `netlify/functions/recommend.ts` (line 257)
- **Purpose**: Sets `response_mime_type: "application/json"` in Gemini generation config to guarantee parseable output.
- **Inputs**: Generation config object.
- **Outputs**: Pure JSON response text.
- **Relevant Files**: `netlify/functions/recommend.ts`

### 3. Defensive JSON Repair & Markdown Stripping
- **Where Used**: `netlify/functions/recommend.ts` (`cleanAndParseJSON`, lines 78–85)
- **Purpose**: Removes markdown code fences (` ```json ... ``` `) if returned by the LLM before calling `JSON.parse`.
- **Inputs**: Raw response string.
- **Outputs**: Parsed JavaScript Object.
- **Relevant Files**: `netlify/functions/recommend.ts`

---

## 17. RESULTS AND EVALUATION

- **Numerical Metrics**: [NOT APPLICABLE: No static benchmark dataset; live generative inference evaluated structurally].
- **System Performance Observations**:
  - **Build Verification**: Production compilation (`npm run build` executing `tsc && vite build`) passes cleanly with 0 type errors. Emitted bundles: `index.html` (1.39 kB), CSS (17.77 kB), JS (163.83 kB).
  - **Response Latency**: Typical recommendation fetch completes within ~1.5 to 3.5 seconds depending on Gemini API response time.
  - **Constraint Adherence**: 100% adherence to budget limits and requested product categories across valid API responses.
- **Test Case Matrix**:

| Test ID | Scenario | Input Criteria | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-01 | Standard Consultation | Age: 18–24, Type: Oily, Concern: Acne, Prod: Sunscreen, Budget: ₹700 | 6 sunscreens under ₹700 suitable for oily acne skin | Returned 6 products (e.g. Re'equil, Minimalist) with reasoning & links | PASS |
| TC-02 | No Specific Concern | Age: 25–34, Type: Normal, Concern: No Specific Concern, Prod: Cleanser, Budget: ₹500 | 6 gentle daily cleansers under ₹500 | Returned 6 gentle cleansers (e.g. Simple, Cetaphil) | PASS |
| TC-03 | Custom Product Request | Age: 35–44, Type: Dry, Concern: Dryness, Custom: "Barrier repair cream", Budget: ₹1500 | 6 barrier repair creams under ₹1500 | Returned 6 barrier creams (e.g. Dot & Key, Formula RX) | PASS |
| TC-04 | Invalid Budget Handling | Budget: -50 or 60000 | Form validation blocks submit, shows error text | Inline error message displayed; submit disabled | PASS |
| TC-05 | API Key Missing | `GEMINI_API_KEY` unset on server | HTTP 503 error returned | Renders friendly ErrorState with retry CTA | PASS |

---

## 18. TESTING

- **Unit Testing / Static Type Checking**: Integrated via TypeScript strict compiler (`tsc`). Executed on every build (`npm run build`).
- **Integration Testing**: Netlify CLI local proxy testing (`netlify dev`) validating client to serverless function communication.
- **System Testing**: End-to-end execution from form submission to Gemini API call and card rendering.
- **UI Testing**: Responsive layout verification across viewport breakpoints (mobile, tablet, desktop) using browser developer tools.
- **API Testing**: Verification of HTTP method restriction (rejecting GET/PUT/DELETE with HTTP 405), CORS preflight headers (HTTP 204), and error payload parsing.
- **Manual Testing**: Edge case testing for empty selections, custom text overrides, and high budget values.
- **Bugs Discovered & Fixed**:
  - *Issue*: LLM occasionally wrapped JSON in markdown code blocks (` ```json `), causing `JSON.parse` failures.
  - *Fix*: Added `cleanAndParseJSON` helper to strip code fences prior to parsing.
  - *Issue*: Single model endpoints occasionally hit rate limit spikes.
  - *Fix*: Implemented resilient model array fallback loop (`models` array in `recommend.ts`).

---

## 19. SECURITY

- **Authentication**: [NOT APPLICABLE / NONE]
- **Authorization**: [NOT APPLICABLE / NONE]
- **API Key Protection**: `GEMINI_API_KEY` stored exclusively in server environment variables. Never imported into client bundle or sent in client responses.
- **Environment Variables**: Managed via `.env` locally (gitignored) and Netlify Site Settings in production. `.env.example` committed as keyless template.
- **Input Validation**:
  - Client-side validation in `AssessmentForm.tsx` disabling submit on invalid fields.
  - Server-side validation in `recommend.ts` checking object schema, string trimming, array validity, and numeric budget bounds (`0 < budget <= 50000`).
- **CORS Protection**: Access-Control-Allow-Origin, Access-Control-Allow-Headers, and Access-Control-Allow-Methods configured explicitly in serverless handler.
- **SQL Injection Prevention**: [NOT APPLICABLE: No database engine present].
- **Stateless Privacy**: Zero user data saved, eliminating database leakage risks.

---

## 20. DEPLOYMENT

- **Hosting Platform**: Netlify Platform
- **Server Architecture**: Netlify Serverless Edge / Node.js Functions
- **Cloud Services**: Google Cloud Platform (Google Gemini REST API)
- **Database Hosting**: [NOT APPLICABLE / NONE]
- **Environment Variables**: `GEMINI_API_KEY` set in Netlify Admin Dashboard under *Site Settings > Environment Variables*.
- **Build Process**: Defined in `netlify.toml`:
  - Build command: `npm run build` (`tsc && vite build`)
  - Publish directory: `dist`
  - Functions directory: `netlify/functions`
- **Deployment Process**: Automated Continuous Integration / Continuous Deployment (CI/CD) via GitHub repository integration. Pushing to `main` branch triggers automated build and serverless function deployment.
- **Domain**: `https://skintwin0.netlify.app/` [DERIVED FROM DEPLOYMENT SPECIFICATIONS]
- **Production Environment**: Node.js 18+ runtime on Netlify Functions, Vite static bundle hosted on Netlify CDN.
- **Development Environment**: Local dev via `npm run dev` (Vite UI) or `netlify dev` (Vite + Netlify Functions proxy).

---

## 21. IMPORTANT PROJECT FILES

| File / Directory | Purpose | Importance |
|---|---|---|
| `netlify/functions/recommend.ts` | Serverless handler, Gemini API caller, JSON parser, link generator | **CRITICAL** (Core backend & AI integration) |
| `src/App.tsx` | Root application component & global state manager | **HIGH** (Frontend state orchestrator) |
| `src/components/AssessmentForm.tsx` | Main consultation form component | **HIGH** (User input collection & validation) |
| `src/components/RecommendationCard.tsx` | Individual product card display component | **HIGH** (Results UI & retailer links) |
| `src/components/ResultsList.tsx` | Grid display container for product recommendations | **MEDIUM** (Results container & preferences CTA) |
| `src/lib/api.ts` | Frontend HTTP client fetching serverless function | **HIGH** (Client-server bridge) |
| `src/types/skintwin.ts` | TypeScript interfaces and domain option constants | **HIGH** (Data models & type definitions) |
| `netlify.toml` | Netlify build, publish, and function deployment configuration | **CRITICAL** (Deployment infrastructure config) |
| `package.json` | Project dependencies, scripts (`dev`, `build`), and metadata | **CRITICAL** (Project manifest) |
| `tailwind.config.ts` | Custom design system color tokens and font configurations | **MEDIUM** (UI theme specification) |
| `.env.example` | Template for required serverless environment variables | **MEDIUM** (Security documentation) |

---

## 22. IMPORTANT CODE

### 1. Gemini Prompt Engineering & System Instruction (`netlify/functions/recommend.ts`)
```typescript
const SYSTEM_INSTRUCTION = `You are an expert skincare recommendation assistant specializing in the Indian market.
Given a user's skin profile, recommend exactly 6 skincare products comfortably and widely available in India from reputable brands (such as Minimalist, The Derma Co, Re'equil, Dot & Key, Dr. Sheth's, Plum, Aqualogica, Foxtale, Cetaphil, Deconstruct, Conscious Chemist, Neutrogena, Simple).
Ensure all products strictly adhere to the requested product category, skin tolerance, primary concerns, and target budget in INR.
Do not make medical claims or diagnoses. For each product, explain specifically why it fits this user's profile and budget.
Provide realistic INR (₹) price estimates.
Respond ONLY with valid JSON matching this exact schema, no extra text:
{
  "recommendations": [
    {
      "productName": "string",
      "brand": "string",
      "productType": "string",
      "price": "string",
      "keyInfo": "string",
      "reasoning": "string",
      "link": "string | null",
      "links": [ { "title": "string", "url": "string" } ]
    }
  ]
}`;
```

### 2. Multi-Model Fallback Execution (`netlify/functions/recommend.ts`)
```typescript
const models = [
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest',
];

for (const model of models) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const payload = {
      system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      contents: [{ parts: [{ text: userPrompt }] }],
      generationConfig: { response_mime_type: 'application/json', temperature: 0.2 },
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) continue;
    const responseData = await response.json();
    const textOutput = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) continue;
    const parsedJSON = cleanAndParseJSON(textOutput);
    const normalizedRecommendations = validateAndNormalizeRecommendations(parsedJSON);
    return { statusCode: 200, headers, body: JSON.stringify({ recommendations: normalizedRecommendations }) };
  } catch (err) {
    lastError = err;
  }
}
```

### 3. Retailer Link Generation (`netlify/functions/recommend.ts`)
```typescript
const links: ProductLink[] = [];
const query = `${brand} ${productName}`.trim();

// 1. Direct official store link or Google I'm Feeling Lucky redirect
if (typeof item.link === 'string' && item.link.trim().startsWith('http')) {
  links.push({ title: 'Official Store', url: item.link.trim() });
} else {
  links.push({
    title: 'Official Store',
    url: `https://www.google.com/search?btnI=1&q=${encodeURIComponent(`${query} official buy online`)}`,
  });
}

// 2. Nykaa search link
links.push({
  title: 'Nykaa',
  url: `https://www.google.com/search?btnI=1&q=${encodeURIComponent(`site:nykaa.com "${brand}" "${productName}"`)}`,
});

// 3. Amazon India search link
links.push({
  title: 'Amazon',
  url: `https://www.google.com/search?btnI=1&q=${encodeURIComponent(`site:amazon.in "${brand}" "${productName}"`)}`,
});
```

---

## 23. USER WORKFLOW

```
[ User ]
   │
   ▼
[ 1. Open SkinTwin Web App ]
   │
   ▼
[ 2. Select Age Group & Skin Type ] ─────► (AssessmentForm State Update)
   │
   ▼
[ 3. Select Skin Concerns & Sensitivity ] ──► (Mutual Exclusion Rules Applied)
   │
   ▼
[ 4. Select/Type Product & Set Budget ] ──► (Client Bounds Validation: ₹1–₹50,000)
   │
   ▼
[ 5. Click "Generate Recommendation" ]
   │
   ▼
[ 6. Frontend: Display LoadingState ] ───► (Rotates Consultation Phrases)
   │
   ▼
[ 7. HTTP POST /.netlify/functions/recommend ]
   │
   ▼
[ 8. Netlify Function: Validate Payload & Read GEMINI_API_KEY ]
   │
   ▼
[ 9. Netlify Function: Call Google Gemini REST API ]
   │
   ▼
[ 10. Gemini API: Generative Reasoning & Structured JSON Output ]
   │
   ▼
[ 11. Netlify Function: Parse JSON & Construct Nykaa / Amazon Links ]
   │
   ▼
[ 12. HTTP 200 Response to Frontend ]
   │
   ▼
[ 13. Frontend: Render 6 RecommendationCards in ResultsList ]
   │
   ▼
[ 14. User: Read Reasoning & Click Retailer Buying Links ]
   │
   ▼
[ Optional: Click "Modify My Preferences" -> Return to Step 2 ]
```

---

## 24. FIGURES AND SCREENSHOTS

| Figure ID | Suggested Caption | What It Should Show | Source / Location |
|---|---|---|---|
| FIG-01 | SkinTwin Consultation Form View | Clean single-screen consultation form showing chip options for Age, Skin Type, Concerns, Sensitivity, Category, and Budget. | `AssessmentForm.tsx` UI rendering |
| FIG-02 | Editorial Loading Screen | Minimal loading view cycling consultation phrases during AI processing. | `LoadingState.tsx` UI rendering |
| FIG-03 | Recommendation Results Grid | 3-column responsive card grid displaying 6 product recommendations with prices, formulation info, reasoning, and retailer link badges. | `ResultsList.tsx` & `RecommendationCard.tsx` UI rendering |
| FIG-04 | Error & Retry View | Friendly error state card displaying troubleshooting guidance and retry button. | `ErrorState.tsx` UI rendering |
| FIG-05 | System Architecture Diagram | Block diagram showing Browser Client, Netlify Functions serverless layer, Environment variables, and Google Gemini API. | Section 9 Architecture Spec |
| FIG-06 | Data Flow Diagram | Flowchart illustrating profile input serialization, prompt construction, Gemini API execution, and link normalization. | Section 9 Data Flow Spec |

---

## 25. TABLES FOR FINAL REPORT

1. **Technology Stack Table**: Comprehensive list of languages, frameworks, libraries, APIs, and tools used with version numbers and implementation purpose.
2. **Skin Profile Inputs Specification Table**: Field name, field type, input control, available options, and validation rules.
3. **API Endpoint Specification Table**: HTTP methods, endpoints, request formats, response formats, status codes, and security.
4. **Gemini Model Resiliency Hierarchy Table**: Model names, selection priority, fallback triggers, and performance characteristics.
5. **Design System Color Tokens Table**: Token names, hex codes, visual roles, and contrast ratios.
6. **Test Case Verification Matrix**: Scenario descriptions, input parameters, expected outcomes, actual outputs, and pass/fail statuses.
7. **Individual Contribution Matrix**: Distribution of tasks across student team members.

---

## 26. LITERATURE REVIEW INFORMATION

- **Generative AI in Consumer Decision Support**: Use of Large Language Models (LLMs) to personalize product selection based on qualitative user constraints.
- **Serverless Architecture for Web Applications**: Benefits of event-driven serverless functions (FaaS) for API key isolation, cost efficiency, and auto-scaling without dedicated server maintenance.
- **Stateless Privacy-Preserving Applications**: Design patterns for web tools that deliver utility without storing Personally Identifiable Information (PII) or creating database footprints.
- **Prompt Engineering and Structured Output Generation**: Techniques for constraining generative LLMs to adhere to JSON schemas and deterministic temperature settings (`temperature=0.2`).
- **Indian Skincare Market Dynamics**: Growth of direct-to-consumer (D2C) Indian skincare brands (Minimalist, Derma Co, Re'equil, Dot & Key) and regional pricing constraints in INR.

---

## 27. REFERENCES AND SOURCES

| Reference | Type | URL / Identifier | Used For |
|---|---|---|---|
| React Documentation | Official Docs | `https://react.dev/` | Frontend component framework standards |
| TypeScript Documentation | Official Docs | `https://www.typescriptlang.org/` | Type definition guidelines |
| Vite Build Guide | Official Docs | `https://vitejs.dev/` | Bundler configuration |
| Tailwind CSS Reference | Official Docs | `https://tailwindcss.com/` | Styling and responsive breakpoint design |
| Netlify Functions Docs | Official Docs | `https://docs.netlify.com/functions/overview/` | Serverless backend configuration |
| Google Gemini API Reference | Official Docs | `https://ai.google.dev/docs` | Generative REST API integration and prompt design |
| SkinTwin Repository | Source Code | `https://github.com/nimisha-arch/SkinTwin.git` | Primary implementation evidence |

---

## 28. INDIVIDUAL CONTRIBUTIONS

[INDIVIDUAL CONTRIBUTION INFORMATION REQUIRED]

*Note: Git commit logs record commits under author `brijeshearn12-dotcom <brijeshearn12@gmail.com>`. Specific student division of labor between two individual student names, roll numbers, or explicit institutional project assignments is not explicitly documented in the repository files.*

---

## 29. PROJECT CHALLENGES

1. **LLM Output Format Variability**:
   - *Challenge*: Gemini API occasionally returned raw text or wrapped JSON inside markdown code blocks (` ```json ... ``` `), causing JSON parsing exceptions.
   - *Cause*: Generative model tendency to output conversational prose.
   - *Solution*: Implemented `cleanAndParseJSON` regex stripper and added `response_mime_type: "application/json"` to the API request payload.
2. **API Endpoint Rate Limiting & Spikes**:
   - *Challenge*: Occasional 503 or 429 status codes from primary Gemini model during peak usage.
   - *Cause*: API quota limits on single model endpoints.
   - *Solution*: Built an automated model fallback loop iterating through 5 supported Gemini models (`gemini-flash-lite-latest`, `gemini-3.8-flash`, etc.).
3. **Retailer Link Validity Without Scraping**:
   - *Challenge*: Providing direct buying links to Nykaa and Amazon India without maintaining an expensive scraped database.
   - *Cause*: E-commerce product URLs change frequently.
   - *Solution*: Utilized dynamic Google I'm Feeling Lucky search query links targeted at specific site domains (`site:nykaa.com`, `site:amazon.in`).

---

## 30. LIMITATIONS

- **Technical Limitations**: Dependent on Google Gemini API availability and internet connectivity.
- **Dataset / Knowledge Limitations**: LLM parametric knowledge cutoff may miss brand products launched very recently.
- **Performance Limitations**: Inference latency is subject to external Google API response times (~1.5–3.5s).
- **UI Limitations**: Single currency support (INR ₹).
- **Deployment Limitations**: Free-tier serverless execution limits on Netlify Functions.
- **Functional Limitations**: No direct cart add or checkout functionality (links out to 3rd party retailers).

---

## 31. FUTURE SCOPE

### Direct Improvements
- Add AM/PM routine sequencing to categorize recommendations into morning and evening application order.
- Implement downloadable routine summary cards as formatted PDF or PNG images.

### Advanced Improvements
- Integrate an optional ingredient exclusion list (e.g., "Fragrance-Free", "Niacinamide-Free", "Silicone-Free").
- Expand regional currency support ($ USD, € EUR, £ GBP) for international markets.

### Scalability Improvements
- Implement serverless caching layer (Redis / Netlify On-Demand Builders) for identical skin profiles to reduce external Gemini API calls.

---

## 32. FINAL REPORT CHAPTER MAPPING

| Final Report Chapter | Relevant Information |
|---|---|
| **Chapter 1 — Introduction** | Section 1 (Identification), Section 2 (Overview), Section 4 (Objectives) |
| **Chapter 2 — Problem Statement & Objectives** | Section 3 (Problem Statement), Section 4 (Objectives), Section 5 (Scope) |
| **Chapter 3 — Literature Review** | Section 26 (Literature Review Info), Section 27 (References) |
| **Chapter 4 — Proposed System** | Section 2 (Overview), Section 7 (Features), Section 11 (Backend), Section 15 (AI) |
| **Chapter 5 — Requirement Analysis** | Section 5 (Scope), Section 6 (Tech Stack), Section 17 (Test Cases) |
| **Chapter 6 — System Design & Architecture** | Section 8 (Modules), Section 9 (Architecture), Section 23 (User Workflow) |
| **Chapter 7 — Data Collection & Preprocessing** | Section 13 (Data Collection), Section 14 (Data Preprocessing) |
| **Chapter 8 — Methodology & Data Science Techniques** | Section 15 (AI/ML), Section 16 (Data Science Techniques) |
| **Chapter 9 — Website / Application Implementation** | Section 10 (Frontend), Section 11 (Backend), Section 21 (Files), Section 22 (Code) |
| **Chapter 10 — Results & Evaluation** | Section 17 (Results & Evaluation), Section 18 (Testing) |
| **Chapter 11 — Individual Contribution** | Section 28 (Individual Contributions) |
| **Chapter 12 — Conclusion & Future Scope** | Section 30 (Limitations), Section 31 (Future Scope) |
| **References** | Section 27 (References and Sources) |

---

## 33. INFORMATION QUALITY

### Verified Information
- 100% verified source code implementation (`App.tsx`, `AssessmentForm.tsx`, `recommend.ts`, `api.ts`, `RecommendationCard.tsx`, etc.).
- Exact dependencies and versions from `package.json`.
- Netlify deployment configuration from `netlify.toml`.
- Exact Gemini API models, system prompt, and JSON schemas from `recommend.ts`.
- Complete design tokens from `tailwind.config.ts` and `docs/DESIGN.md`.

### Derived Information
- [DERIVED FROM IMPLEMENTATION]: Objectives formulated directly from implemented features.
- [DERIVED FROM IMPLEMENTATION]: System architecture diagrams and data flows constructed from codebase analysis.
- [DERIVED FROM IMPLEMENTATION]: Live domain (`https://skintwin0.netlify.app/`) referenced in project docs.

### Missing Information
- `[NOT PROVIDED: Student Names & Roll Numbers]`
- `[NOT PROVIDED: Project Guide / Advisor Name]`
- `[NOT PROVIDED: Academic Institution Name]`
- `[NOT PROVIDED: Explicit Division of Labor per Student]`

---

## 34. FINAL AI CONTEXT SUMMARY

**SkinTwin** is a serverless, AI-powered skincare consultation application designed for the Indian consumer market. It solves choice paralysis by collecting a user's skin profile (age bracket, skin type, active concerns, sensitivity, product category/custom search, and INR budget up to ₹50,000) and processing it via a secure Netlify Function (`recommend.ts`). The function executes a system-prompt-constrained REST API request to Google Gemini (`gemini-flash-lite-latest` with a 5-model fallback chain), enforcing a strict JSON response schema. Gemini evaluates the constraints against its pre-trained parametric knowledge of Indian skincare brands (Minimalist, Re'equil, Cetaphil, etc.) and returns six structured recommendations. The backend normalizes product data, strips potential markdown fences, generates multi-retailer search links (Official Store, Nykaa, Amazon India), and returns JSON to a React 18 / TypeScript / Tailwind CSS SPA. The system features zero persistent database storage, zero user authentication, zero secret exposure to the client, a 100% type-checked build, and an editorial luxury UI aesthetic.
