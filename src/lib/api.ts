import { SkinProfile, RecommendationResponse } from '../types/skintwin';

export async function fetchRecommendations(
  profile: SkinProfile
): Promise<RecommendationResponse> {
  try {
    const response = await fetch('/.netlify/functions/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      let errorMessage = "We couldn't generate recommendations right now. Please try again.";
      try {
        const errorData = await response.json();
        if (errorData?.error && typeof errorData.error === 'string') {
          // Keep user-facing message friendly and clean
          errorMessage = errorData.error;
        }
      } catch {
        // Fallback to default message
      }
      throw new Error(errorMessage);
    }

    const data: RecommendationResponse = await response.json();
    return data;
  } catch (err: any) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error(
        "Network connection issue. Please check your internet and try again."
      );
    }
    throw new Error(
      err.message ||
        "We couldn't generate recommendations right now. Please try again."
    );
  }
}
