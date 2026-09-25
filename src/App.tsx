import { useState } from 'react';
import { SkinProfile, Recommendation, AppStatus } from './types/skintwin';
import { AssessmentForm } from './components/AssessmentForm';
import { ResultsList } from './components/ResultsList';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { Disclaimer } from './components/Disclaimer';
import { fetchRecommendations } from './lib/api';

export default function App() {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [profile, setProfile] = useState<SkinProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (submittedProfile: SkinProfile) => {
    setProfile(submittedProfile);
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetchRecommendations(submittedProfile);
      setRecommendations(response.recommendations || []);
      setStatus('success');
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          "We couldn't generate recommendations right now. Please try again."
      );
      setStatus('error');
    }
  };

  const handleRetry = () => {
    if (profile) {
      handleFormSubmit(profile);
    } else {
      setStatus('idle');
    }
  };

  const handleModifyPreferences = () => {
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-cream text-olive flex flex-col justify-between selection:bg-peach-light selection:text-olive">
      {/* Refined Brand Header */}
      <header className="w-full border-b border-border-subtle bg-cream/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-lg tracking-[0.22em] font-medium text-olive uppercase">
              SkinTwin
            </span>
          </div>
          <span className="text-xs text-olive-muted font-normal tracking-wide hidden sm:inline">
            Your skin. Your twin. Your routine.
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {status === 'idle' && (
          <div className="space-y-12 sm:space-y-16">
            {/* Editorial Hero */}
            <div className="text-center max-w-xl mx-auto space-y-3.5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-olive font-normal tracking-tight leading-[1.18]">
                Personalized skincare, thoughtfully curated.
              </h1>
              <p className="text-sm sm:text-base text-olive-muted font-normal leading-relaxed">
                Describe your skin profile, active concerns, and budget. We provide three targeted product recommendations for your daily routine.
              </p>
            </div>

            {/* Assessment Consultation Form */}
            <AssessmentForm
              initialValues={profile}
              onSubmit={handleFormSubmit}
              isLoading={false}
            />

            <Disclaimer />
          </div>
        )}

        {status === 'loading' && <LoadingState />}

        {status === 'error' && (
          <ErrorState
            message={errorMessage || undefined}
            onRetry={handleRetry}
            onBackToForm={handleModifyPreferences}
          />
        )}

        {status === 'success' && (
          <ResultsList
            recommendations={recommendations}
            profile={profile}
            onModifyPreferences={handleModifyPreferences}
          />
        )}
      </main>
    </div>
  );
}
