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
    <div className="min-h-screen bg-cream text-olive flex flex-col justify-between selection:bg-peach selection:text-olive">
      {/* Brand Header */}
      <header className="w-full border-b border-sage/20 bg-cream/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-peach" />
            <span className="font-serif text-xl tracking-tight font-medium text-olive">
              SkinTwin
            </span>
          </div>
          <span className="text-xs uppercase tracking-widest text-olive-muted font-medium hidden sm:inline">
            Your skin. Your twin. Your routine.
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {status === 'idle' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Section */}
            <div className="text-center max-w-2xl mx-auto pt-4 sm:pt-8 space-y-4">
              <span className="text-xs uppercase tracking-widest text-olive-muted font-semibold bg-sage/20 px-3.5 py-1.5 rounded-full border border-sage/40 inline-block">
                AI Skincare Intelligence
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-olive tracking-tight leading-[1.15]">
                Targeted recommendations. No bias.
              </h1>
              <p className="text-base sm:text-lg text-olive-muted font-normal max-w-xl mx-auto leading-relaxed">
                Describe your skin type, primary concerns, and budget. Our AI skin engine finds 3 curated products that actually match you.
              </p>
            </div>

            {/* Assessment Form */}
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
