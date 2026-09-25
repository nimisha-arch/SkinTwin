import React from 'react';
import { Recommendation } from '../types/skintwin';
import { ExternalLink } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  index,
}) => {
  const { productName, brand, productType, price, keyInfo, reasoning, link } =
    recommendation;

  return (
    <article className="bg-white rounded-2xl p-6 sm:p-7 border border-sage/50 flex flex-col justify-between transition-all duration-200 hover:border-sage hover:shadow-[0_4px_20px_-8px_rgba(56,66,56,0.08)]">
      <div className="space-y-4">
        {/* Top Header: Step/Counter Badge & Price */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-olive/60 bg-cream px-2.5 py-1 rounded-full border border-sage/40">
            Pick 0{index + 1}
          </span>
          {price && (
            <span className="text-sm font-semibold text-olive bg-sage/20 px-2.5 py-0.5 rounded-md">
              {price.startsWith('₹') ? price : `₹${price}`}
            </span>
          )}
        </div>

        {/* Product Name & Brand */}
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-olive font-normal leading-snug">
            {productName}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-olive-muted font-medium">
            <span className="uppercase tracking-wider">{brand}</span>
            <span>•</span>
            <span>{productType}</span>
          </div>
        </div>

        {/* Key Info / Hero ingredients */}
        {keyInfo && (
          <div className="bg-cream/70 rounded-xl p-3 border border-sage/30 text-xs text-olive/80 leading-relaxed">
            <span className="font-semibold text-olive">Key formulation: </span>
            {keyInfo}
          </div>
        )}

        {/* Personalized Why Recommended */}
        <div className="pt-1">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-olive/70 mb-1.5">
            Why It Fits Your Skin
          </h4>
          <p className="text-sm text-olive/90 leading-relaxed font-normal">
            {reasoning}
          </p>
        </div>
      </div>

      {/* Action Link (if confidently provided by Gemini) */}
      <div className="pt-6 mt-6 border-t border-sage/20">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-peach-dark hover:text-olive transition-colors group"
          >
            <span>View Product</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <span className="text-xs text-olive-muted/70 italic">
            Check local retailer or official store for availability
          </span>
        )}
      </div>
    </article>
  );
};
