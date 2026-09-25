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
  const { productName, brand, productType, price, keyInfo, reasoning, link, links } =
    recommendation;

  const query = `${brand} ${productName}`.trim();
  const encodedQuery = encodeURIComponent(query);

  const displayLinks =
    links && links.length > 0
      ? links
      : [
          ...(link ? [{ title: 'Direct Store', url: link }] : []),
          { title: 'Nykaa', url: `https://www.nykaa.com/search/result/?q=${encodedQuery}` },
          { title: 'Amazon', url: `https://www.amazon.in/s?k=${encodedQuery}` },
        ];

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

      {/* Multiple Retailer / Purchase Options */}
      <div className="pt-5 mt-6 border-t border-border-subtle/70 space-y-2">
        <span className="text-[11px] uppercase tracking-[0.14em] font-medium text-olive/50 block">
          Available at:
        </span>
        <div className="flex flex-wrap gap-2">
          {displayLinks.map((item, idx) => (
            <a
              key={`${item.title}-${idx}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-xs font-medium text-olive hover:text-olive-hover px-2.5 py-1.5 rounded-control bg-cream/70 hover:bg-cream border border-border-subtle hover:border-olive/30 transition-colors"
            >
              <span>{item.title}</span>
              <ArrowUpRight className="w-3 h-3 text-olive-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};
