import React from 'react';
import { RefreshCw, ArrowLeft } from 'lucide-react';

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
    <div className="w-full max-w-md mx-auto py-20 px-4">
      <div className="bg-white border border-border-subtle rounded-card p-8 sm:p-10 text-center space-y-6">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl text-olive font-normal">
            Consultation Interrupted
          </h3>
          <p className="text-sm text-olive-muted leading-relaxed max-w-sm mx-auto">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-control bg-olive text-cream hover:bg-olive-hover text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <button
            type="button"
            onClick={onBackToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-control bg-white text-olive border border-border-subtle hover:border-olive/30 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Inputs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
