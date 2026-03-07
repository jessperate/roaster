'use client';

import { useState } from 'react';
import ContentInput from '@/components/ContentInput';
import LoadingRoast from '@/components/LoadingRoast';
import RoastResult from '@/components/RoastResult';
import { RoastResult as RoastResultType } from '@/lib/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RoastResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (content: string, url?: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate roast');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-ao-off-white">
      {/* Header */}
      <header className="pt-10 pb-6 px-4 border-b border-ao-stroke">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 bg-ao-label-yellow font-mono text-xs font-medium tracking-widest uppercase text-ao-near-black">
            E-E-A-T Analysis
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-ao-near-black mb-3" style={{ letterSpacing: '-0.02em', lineHeight: 1.0 }}>
            Content Roaster
          </h1>
          <p className="text-lg text-ao-text-secondary font-sans">
            Is your content premium grade or pure slop? 🔥
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {!result && !isLoading && (
          <div className="bg-ao-white border border-ao-stroke p-6 md:p-8">
            <ContentInput onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        )}

        {isLoading && (
          <div className="bg-ao-white border border-ao-stroke p-6 md:p-8">
            <LoadingRoast />
          </div>
        )}

        {error && (
          <div className="bg-ao-white border border-ao-stroke p-6 md:p-8">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">😵</div>
              <h2 className="text-2xl font-bold text-ao-near-black mb-2">Oops!</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-ao-near-black text-white font-semibold hover:bg-ao-forest transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <RoastResult result={result} />
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-ao-near-black text-white font-bold text-lg hover:bg-ao-forest transition-colors"
              >
                Roast something else
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-ao-text-secondary text-sm border-t border-ao-stroke">
        <p>
          Built with 🔥 and Claude AI &nbsp;·&nbsp;{' '}
          <a
            href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ao-mid-green transition-colors"
          >
            Learn about E-E-A-T
          </a>
        </p>
      </footer>
    </main>
  );
}
