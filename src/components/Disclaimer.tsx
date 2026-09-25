import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <footer className="w-full max-w-2xl mx-auto pt-12 pb-8 text-center">
      <p className="text-[11px] text-olive-muted/70 leading-relaxed max-w-lg mx-auto font-normal">
        Recommendations are generated using AI based on your inputs and Indian market availability. Please review product ingredients, patch test, and verify pricing prior to purchase. SkinTwin provides lifestyle product guidance, not medical diagnosis.
      </p>
    </footer>
  );
};
