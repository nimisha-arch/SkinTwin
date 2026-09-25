# SkinTwin

> *"Your skin. Your twin. Your routine."*

SkinTwin is a single-workflow, AI-powered skincare recommendation website. A user describes their skin type, concerns, tolerance, requested product category, and budget; Gemini generates personalized product recommendations with specific reasoning and direct purchase/search links.

There is no database, no product catalog, and no user accounts — Gemini **is** the recommendation engine.

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **Styling:** Custom editorial boutique palette (`Fraunces` serif typography + `Plus Jakarta Sans`)
- **Backend / Serverless:** Netlify Functions (Node.js, TypeScript)
- **AI Engine:** Google Gemini API (`gemini-1.5-flash` with `gemini-2.0-flash` fallback)
- **Deployment:** Netlify

---

## Architecture & Security

- **Server-Only API Key:** `GEMINI_API_KEY` is loaded exclusively inside `netlify/functions/recommend.ts`. It is **never** bundled or exposed to the client application.
- **Strict Response Validation:** Gemini is called with `response_mime_type: "application/json"`. The returned payload is strictly validated and normalized server-side to guarantee required schema fields (`productName`, `brand`, `productType`, `keyInfo`, `reasoning`) and sanitized links.

---

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variable
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> Obtain your key from [Google AI Studio](https://aistudio.google.com/).

### 3. Start Development Server
```bash
# Runs the Vite dev server with built-in Netlify function proxy:
npm run dev

# Or using Netlify CLI:
netlify dev
```

---

## Production Build

```bash
npm run build
```
Generates a static production bundle in `dist/` and validates TypeScript across both the client and serverless function code.

---

## Netlify Deployment

1. Connect your repository to Netlify.
2. Build settings (configured in `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
3. In **Netlify Site Configuration → Environment Variables**, add:
   - Key: `GEMINI_API_KEY`
   - Value: `your_gemini_api_key`
4. Deploy the site.
