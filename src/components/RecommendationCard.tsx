import React from 'react';
import { Recommendation } from '../types/skintwin';
import { ArrowUpRight } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  index: _index,
}) => {
  const { productName, brand, productType, price, keyInfo, reasoning, link } =
    recommendation;

  return (
    <article className="bg-white rounded-card p-6 sm:p-7 border border-border-subtle flex flex-col justify-between transition-colors duration-200 hover:border-olive/30">
      <div className="space-y-4">
        {/* Brand & Price Header */}
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-olive-muted">
            {brand}
          </span>
          {price && (
            <span className="text-sm font-medium text-olive tabular-nums">
              {price.startsWith('₹') ? price : `₹${price}`}
            </span>
          )}
        </div>

        {/* Product Identity */}
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-olive font-normal leading-snug tracking-tight">
            {productName}
          </h3>
          <p className="text-xs text-olive-muted mt-1 font-normal">
            {productType}
          </p>
        </div>

        {/* Key Formulation Details */}
        {keyInfo && (
          <div className="pt-2 text-xs text-olive/75 leading-relaxed">
            <span className="font-medium text-olive">Active composition: </span>
            {keyInfo}
          </div>
        )}

        {/* Editorial Reasoning */}
        <div className="pt-3 border-t border-border-subtle/70 space-y-1.5">
          <h4 className="text-[11px] uppercase tracking-[0.14em] font-medium text-olive/60">
            Why We Recommend It
          </h4>
          <p className="text-sm text-olive/85 leading-relaxed font-normal">
            {reasoning}
          </p>
        </div>
      </div>

      {/* Action Link */}
      <div className="pt-5 mt-6 border-t border-border-subtle/70">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] font-medium text-olive hover:text-peach-dark transition-colors"
          >
            <span>View Product</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <span className="text-xs text-olive-muted/65 italic font-normal">
            Available at standard Indian skincare retailers
          </span>
        )}
      </div>
    </article>
  );
};
