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
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full max-w-md mx-auto py-24 px-6 flex flex-col items-center justify-center text-center space-y-6"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Calm glowing pulse indicator */}
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute w-14 h-14 rounded-full bg-sage/30 animate-ping opacity-75" />
        <div className="relative w-10 h-10 rounded-full bg-sage/70 flex items-center justify-center shadow-inner">
          <div className="w-3.5 h-3.5 rounded-full bg-olive/80" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-serif text-2xl text-olive font-normal transition-opacity duration-500 ease-in-out">
          {LOADING_PHRASES[index]}
        </p>
        <p className="text-xs text-olive-muted uppercase tracking-widest font-medium">
          Consulting AI skin twin reasoning
        </p>
      </div>
    </div>
  );
};
