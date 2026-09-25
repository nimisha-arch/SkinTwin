import type { Handler, HandlerEvent } from '@netlify/functions';

interface SkinProfile {
  ageGroup: string;
  skinType: string;
  concerns: string[];
  sensitivity: string[];
  productWanted: string;
  budget: number;
}

interface Recommendation {
  productName: string;
  brand: string;
  productType: string;
  price: string | null;
  keyInfo: string;
  reasoning: string;
  link: string | null;
}

const SYSTEM_INSTRUCTION = `You are a skincare product recommendation assistant for users in India. Given a user's skin profile, recommend up to 3 skincare products that best match their skin type, concerns, requested product category, and budget in INR. Prefer products realistically available in the Indian market. Do not make medical claims or diagnoses. For each product, explain briefly why it fits this specific user. Provide a purchase or search link only if you are reasonably confident it is accurate; otherwise omit the link field. Respond ONLY with valid JSON matching this exact schema, no extra text:
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
}`;

function validateProfile(data: any): SkinProfile | null {
  if (!data || typeof data !== 'object') return null;

  const { ageGroup, skinType, concerns, sensitivity, productWanted, budget } =
    data;

  if (typeof ageGroup !== 'string' || !ageGroup.trim()) return null;
  if (typeof skinType !== 'string' || !skinType.trim()) return null;
  if (!Array.isArray(concerns) || concerns.length === 0) return null;
  if (!Array.isArray(sensitivity) || sensitivity.length === 0) return null;
  if (typeof productWanted !== 'string' || !productWanted.trim()) return null;
  if (typeof budget !== 'number' || isNaN(budget) || budget <= 0 || budget > 50000)
    return null;

  return {
    ageGroup: ageGroup.trim(),
    skinType: skinType.trim(),
    concerns: concerns.map((c) => String(c).trim()).filter(Boolean),
    sensitivity: sensitivity.map((s) => String(s).trim()).filter(Boolean),
    productWanted: productWanted.trim(),
    budget: Math.round(budget),
  };
}

function cleanAndParseJSON(rawText: string): any {
  // Strip markdown code fences if present
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  }
  return JSON.parse(cleaned);
}

function validateAndNormalizeRecommendations(parsed: any): Recommendation[] {
  if (!parsed || !Array.isArray(parsed.recommendations)) {
    throw new Error('Response missing recommendations array');
  }

  const normalized: Recommendation[] = [];

  for (const item of parsed.recommendations) {
    if (!item || typeof item !== 'object') continue;

    const productName = typeof item.productName === 'string' ? item.productName.trim() : '';
    const brand = typeof item.brand === 'string' ? item.brand.trim() : '';
    const productType = typeof item.productType === 'string' ? item.productType.trim() : '';
    const reasoning = typeof item.reasoning === 'string' ? item.reasoning.trim() : '';
    const keyInfo = typeof item.keyInfo === 'string' ? item.keyInfo.trim() : '';

    // productName, brand, productType, and reasoning are required fields
    if (!productName || !brand || !reasoning) {
      continue;
    }

    let price: string | null = null;
    if (typeof item.price === 'string' && item.price.trim()) {
      price = item.price.trim();
    } else if (typeof item.price === 'number') {
      price = `₹${item.price}`;
    }

    let link: string | null = null;
    if (typeof item.link === 'string' && item.link.trim()) {
      const trimmedLink = item.link.trim();
      if (trimmedLink.startsWith('http://') || trimmedLink.startsWith('https://')) {
        link = trimmedLink;
      }
    }

    normalized.push({
      productName,
      brand,
      productType: productType || 'Skincare',
      price,
      keyInfo,
      reasoning,
      link,
    });

    if (normalized.length >= 3) break;
  }

  if (normalized.length === 0) {
    throw new Error('No valid recommendations found in response');
  }

  return normalized;
}

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let rawBody: any;
  try {
    rawBody = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON request body' }),
    };
  }

  const profile = validateProfile(rawBody);
  if (!profile) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Invalid skin profile provided. Please check all fields.',
      }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Server error: GEMINI_API_KEY environment variable is missing.');
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        error: 'Skincare recommendation service is not configured. Please set GEMINI_API_KEY in environment variables.',
      }),
    };
  }

  const userPrompt = `User Skin Profile:
- Age Group: ${profile.ageGroup}
- Skin Type: ${profile.skinType}
- Primary Skin Concerns: ${profile.concerns.join(', ')}
- Skin Tolerance & Sensitivity: ${profile.sensitivity.join(', ')}
- Product Requested: ${profile.productWanted}
- Target Budget: Up to ₹${profile.budget} INR

Please recommend up to 3 suitable products realistically available in India matching this profile within the budget.`;

  // Supported Gemini models with resilient fallbacks for spikes/availability
  const models = [
    'gemini-flash-lite-latest',
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.5-flash',
    'gemini-flash-latest',
  ];
  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: [
          {
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          response_mime_type: 'application/json',
          temperature: 0.2,
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Gemini API error with model ${model} (${response.status}):`, errorText);
        lastError = new Error(`Gemini status ${response.status}`);
        continue;
      }

      const responseData = await response.json();
      const textOutput =
        responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textOutput) {
        console.error('Gemini API returned empty text part');
        lastError = new Error('Empty response from AI engine');
        continue;
      }

      const parsedJSON = cleanAndParseJSON(textOutput);
      const normalizedRecommendations =
        validateAndNormalizeRecommendations(parsedJSON);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          recommendations: normalizedRecommendations,
        }),
      };
    } catch (err: any) {
      console.error(`Error processing recommendation with model ${model}:`, err.message);
      lastError = err;
    }
  }

  // Graceful fallback error per TECHNICAL.md §11 & PROJECT.md §10
  if (lastError) {
    console.error('All model attempts failed. Last recorded error:', lastError.message || lastError);
  }

  return {
    statusCode: 502,
    headers,
    body: JSON.stringify({
      error: "We couldn't generate recommendations right now. Please try again.",
    }),
  };
};
