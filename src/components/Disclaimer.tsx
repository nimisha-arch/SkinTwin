import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <footer className="w-full max-w-2xl mx-auto pt-10 pb-6 text-center">
      <div className="border-t border-sage/30 pt-6">
        <p className="text-xs text-olive/60 leading-relaxed max-w-xl mx-auto">
          <span className="font-medium text-olive/80">Transparency note:</span> AI-generated recommendations may contain inaccuracies. Please verify product ingredients, current pricing, availability, and suitability before purchasing. SkinTwin does not provide medical diagnoses.
        </p>
      </div>
    </footer>
  );
};
