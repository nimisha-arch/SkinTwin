import React from 'react';
import { Recommendation, SkinProfile } from '../types/skintwin';
import { RecommendationCard } from './RecommendationCard';
import { Disclaimer } from './Disclaimer';
import { ArrowLeft } from 'lucide-react';

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
      <div className="w-full max-w-xl mx-auto py-16 text-center space-y-6">
        <div className="space-y-3">
          <h3 className="font-serif text-3xl text-olive font-normal">
            No matches found
          </h3>
          <p className="text-sm text-olive-muted leading-relaxed max-w-md mx-auto">
            We couldn't locate specific products matching all criteria within this target budget. Try broadening your category or adjusting the budget limit.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={onModifyPreferences}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-control bg-olive text-cream hover:bg-olive-hover text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modify Preferences</span>
          </button>
        </div>
        <Disclaimer />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-4 space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-border-subtle pb-8 space-y-4">
        <button
          type="button"
          onClick={onModifyPreferences}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-medium text-olive-muted hover:text-olive transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-1" />
          <span>Modify Preferences</span>
        </button>

        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-serif text-olive font-normal tracking-tight">
            Your Curated Recommendations
          </h2>
          {profile && (
            <p className="text-sm text-olive-muted font-normal">
              Tailored for <span className="text-olive font-medium">{profile.skinType}</span> skin • Seeking{' '}
              <span className="text-olive font-medium">{profile.productWanted}</span> • Target under ₹
              {profile.budget.toLocaleString('en-IN')}
            </p>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
        {recommendations.map((rec, idx) => (
          <RecommendationCard
            key={`${rec.productName}-${idx}`}
            recommendation={rec}
            index={idx}
          />
        ))}
      </div>

      {/* Return Action & Disclaimer */}
      <div className="pt-8 border-t border-border-subtle text-center space-y-6">
        <button
          type="button"
          onClick={onModifyPreferences}
          className="text-xs uppercase tracking-[0.14em] font-medium text-olive-muted hover:text-olive transition-colors"
        >
          ← Adjust your skin consultation inputs
        </button>
        <Disclaimer />
      </div>
    </div>
  );
};
