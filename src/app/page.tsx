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
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="pt-8 pb-4 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-3">
            Content Roaster
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Is your content premium grade or pure slop? 🔥
          </p>
          <p className="text-sm text-gray-500 mt-2">
            E-E-A-T analysis with brutal honesty
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {!result && !isLoading && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <ContentInput onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        )}

        {isLoading && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <LoadingRoast />
          </div>
        )}

        {error && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">😵</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
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
                className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-bold text-lg hover:from-gray-900 hover:to-black transition-all shadow-lg hover:shadow-xl"
              >
                🔄 Roast Something Else
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-500 text-sm">
        <p>
          Built with 🔥 and Claude AI •{' '}
          <a
            href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-orange-500"
          >
            Learn about E-E-A-T
          </a>
        </p>
      </footer>
    </main>
  );
}
