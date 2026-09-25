import React, { useState, useEffect } from 'react';

const LOADING_PHRASES = [
  'Finding recommendations for your skin…',
  'Matching your preferences…',
  'Preparing your SkinTwin…',
];

export const LoadingState: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full max-w-md mx-auto py-28 px-6 flex flex-col items-center justify-center text-center space-y-6"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Calm, quiet loading indicator */}
      <div className="w-8 h-8 rounded-full border border-border-subtle border-t-olive animate-spin" />

      <div className="space-y-1.5">
        <p className="font-serif text-2xl sm:text-3xl text-olive font-normal transition-opacity duration-300">
          {LOADING_PHRASES[index]}
        </p>
        <p className="text-xs uppercase tracking-[0.16em] text-olive-muted font-medium">
          Personalized Routine
        </p>
      </div>
    </div>
  );
};
