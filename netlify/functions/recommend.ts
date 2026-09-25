import type { Handler, HandlerEvent } from '@netlify/functions';

interface SkinProfile {
  ageGroup: string;
  skinType: string;
  concerns: string[];
  sensitivity: string[];
  productWanted: string;
  budget: number;
}

interface ProductLink {
  title: string;
  url: string;
}

interface Recommendation {
  productName: string;
  brand: string;
  productType: string;
  price: string | null;
  keyInfo: string;
  reasoning: string;
  link: string | null;
  links: ProductLink[];
}

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
      "links": [
        {
          "title": "string",
          "url": "string"
        }
      ]
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

    // productName, brand, and reasoning are required fields
    if (!productName || !brand || !reasoning) {
      continue;
    }

    let price: string | null = null;
    if (typeof item.price === 'string' && item.price.trim()) {
      price = item.price.trim();
    } else if (typeof item.price === 'number') {
      price = `₹${item.price}`;
    }

    const links: ProductLink[] = [];
    const query = `${brand} ${productName}`.trim();

    // 1. Direct official product store link (Google I'm Feeling Lucky direct redirect to product page)
    if (typeof item.link === 'string' && item.link.trim().startsWith('http')) {
      links.push({
        title: 'Official Store',
        url: item.link.trim(),
      });
    } else {
      links.push({
        title: 'Official Store',
        url: `https://www.google.com/search?btnI=1&q=${encodeURIComponent(`${query} official buy online`)}`,
      });
    }

    // 2. Direct Nykaa product page link
    links.push({
      title: 'Nykaa',
      url: `https://www.google.com/search?btnI=1&q=${encodeURIComponent(`site:nykaa.com "${brand}" "${productName}"`)}`,
    });

    // 3. Direct Amazon India product page link
    links.push({
      title: 'Amazon',
      url: `https://www.google.com/search?btnI=1&q=${encodeURIComponent(`site:amazon.in "${brand}" "${productName}"`)}`,
    });

    const primaryLink = links[0]?.url || null;

    normalized.push({
      productName,
      brand,
      productType: productType || 'Skincare',
      price,
      keyInfo,
      reasoning,
      link: primaryLink,
      links,
    });

    if (normalized.length >= 6) break;
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

Please recommend exactly 6 top products comfortably available in the Indian market matching this profile within the budget.`;

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
