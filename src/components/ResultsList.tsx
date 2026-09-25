import React from 'react';
import { Recommendation, SkinProfile } from '../types/skintwin';
import { RecommendationCard } from './RecommendationCard';
import { Disclaimer } from './Disclaimer';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface ResultsListProps {
  recommendations: Recommendation[];
  profile: SkinProfile | null;
  onModifyPreferences: () => void;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  recommendations,
  profile,
  onModifyPreferences,
}) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="p-8 bg-white rounded-3xl border border-sage/60 max-w-lg mx-auto">
          <h3 className="font-serif text-2xl text-olive mb-2">
            No matches found
          </h3>
          <p className="text-sm text-olive-muted leading-relaxed mb-6">
            We couldn't find products that match all your criteria within your budget. Try adjusting your budget or selecting a broader product category.
          </p>
          <button
            type="button"
            onClick={onModifyPreferences}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-olive text-cream hover:bg-olive-hover text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Modify My Preferences
          </button>
        </div>
        <Disclaimer />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-4 space-y-10">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-sage/30 pb-6">
        <div>
          <button
            type="button"
            onClick={onModifyPreferences}
            className="inline-flex items-center gap-2 text-sm font-medium text-olive-muted hover:text-olive transition-colors mb-3 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Modify My Preferences</span>
          </button>
          <h2 className="text-3xl sm:text-4xl font-serif text-olive font-normal">
            Your Curated Recommendations
          </h2>
          {profile && (
            <p className="text-sm text-olive-muted mt-1.5">
              Personalized for {profile.skinType} skin • Looking for{' '}
              <span className="font-medium text-olive">{profile.productWanted}</span> • Budget up to ₹
              {profile.budget.toLocaleString('en-IN')}
            </p>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-olive-muted/80 bg-sage/15 px-3 py-1.5 rounded-full self-start sm:self-auto border border-sage/30">
          <Sparkles className="w-3.5 h-3.5 text-sage-dark" />
          <span>Formulated by Gemini AI</span>
        </div>
      </div>

      {/* 3-column Grid per DESIGN.md §9 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
        {recommendations.map((rec, idx) => (
          <RecommendationCard
            key={`${rec.productName}-${idx}`}
            recommendation={rec}
            index={idx}
          />
        ))}
      </div>

      {/* Bottom Actions & Disclaimer */}
      <div className="flex flex-col items-center pt-6 space-y-4">
        <button
          type="button"
          onClick={onModifyPreferences}
          className="text-sm font-medium text-olive hover:text-olive-hover underline underline-offset-4 transition-colors"
        >
          ← Want something different? Adjust your preferences
        </button>
        <Disclaimer />
      </div>
    </div>
  );
};
