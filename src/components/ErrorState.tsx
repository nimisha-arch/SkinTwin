import React from 'react';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
  onBackToForm: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "We couldn't generate recommendations right now. Please try again.",
  onRetry,
  onBackToForm,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto py-16 px-4">
      <div className="bg-peach-light/40 border border-peach rounded-3xl p-8 sm:p-10 text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-peach/40 flex items-center justify-center mx-auto text-olive">
          <AlertCircle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl text-olive font-normal">
            Something went wrong
          </h3>
          <p className="text-sm text-olive/80 leading-relaxed max-w-md mx-auto">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-olive text-cream hover:bg-olive-hover text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <button
            type="button"
            onClick={onBackToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 hover:bg-white text-olive border border-sage/60 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
