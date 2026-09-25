export interface SkinProfile {
  ageGroup: string;
  skinType: string;
  concerns: string[];
  sensitivity: string[];
  productWanted: string;
  budget: number;
}

export interface ProductLink {
  title: string;
  url: string;
}

export interface Recommendation {
  productName: string;
  brand: string;
  productType: string;
  price: string | null;
  keyInfo: string;
  reasoning: string;
  link?: string | null;
  links?: ProductLink[];
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
}

export type AppStatus = 'idle' | 'loading' | 'success' | 'error';

export const AGE_GROUPS = [
  'Under 18',
  '18–24',
  '25–34',
  '35–44',
  '45+',
] as const;

export const SKIN_TYPES = [
  'Oily',
  'Dry',
  'Combination',
  'Normal',
  'Sensitive',
] as const;

export const SKIN_CONCERNS = [
  'Acne',
  'Pimples',
  'Dryness',
  'Oiliness',
  'Pigmentation',
  'Dark Spots',
  'Dullness',
  'Uneven Skin Tone',
  'Uneven Texture',
  'Fine Lines',
  'No Specific Concern',
] as const;

export const SENSITIVITY_OPTIONS = [
  'Sensitive',
  'Easily Irritated',
  'Normal Tolerance',
  'Dry/Tight',
  'Oily/Shiny',
  'Combination',
] as const;

export const PRODUCT_CATEGORIES = [
  'Cleanser',
  'Face Wash',
  'Serum',
  'Moisturizer',
  'Sunscreen',
  'Toner',
  'Face Mask',
  'Custom / Other',
] as const;
