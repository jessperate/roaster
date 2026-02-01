'use client';

import { useState } from 'react';

interface ContentInputProps {
  onSubmit: (content: string, url?: string) => void;
  isLoading: boolean;
}

type InputMode = 'paste' | 'url';

export default function ContentInput({ onSubmit, isLoading }: ContentInputProps) {
  const [mode, setMode] = useState<InputMode>('paste');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFetchError(null);

    if (mode === 'paste') {
      if (content.trim().length < 100) {
        setFetchError('Content must be at least 100 characters. Give us something to roast!');
        return;
      }
      onSubmit(content.trim());
    } else {
      if (!url.trim()) {
        setFetchError('Please enter a URL');
        return;
      }

      setIsFetching(true);
      try {
        const response = await fetch('/api/fetch-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url.trim() }),
        });

        const data = await response.json();

        if (data.error) {
          setFetchError(data.error);
          return;
        }

        if (data.content) {
          onSubmit(data.content, url.trim());
        }
      } catch {
        setFetchError('Failed to fetch URL. Try pasting the content directly.');
      } finally {
        setIsFetching(false);
      }
    }
  };

  const characterCount = content.length;
  const isValidLength = characterCount >= 100;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mode Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
        <button
          type="button"
          onClick={() => {
            setMode('paste');
            setFetchError(null);
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            mode === 'paste'
              ? 'bg-white text-gray-900 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📝 Paste Text
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('url');
            setFetchError(null);
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            mode === 'url'
              ? 'bg-white text-gray-900 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🔗 Enter URL
        </button>
      </div>

      {/* Input Area */}
      {mode === 'paste' ? (
        <div className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your article, blog post, or marketing content here... We'll roast it with love (and brutal honesty)."
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none text-gray-800 placeholder-gray-400"
            disabled={isLoading}
          />
          <div className="flex justify-between text-sm">
            <span className={`${isValidLength ? 'text-green-600' : 'text-gray-500'}`}>
              {characterCount} characters {!isValidLength && '(minimum 100)'}
            </span>
            <span className="text-gray-400">
              {characterCount > 15000 ? 'Content will be trimmed to 15,000 characters' : ''}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/your-article"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-gray-800 placeholder-gray-400"
            disabled={isLoading || isFetching}
          />
          <p className="text-sm text-gray-500">
            We&apos;ll fetch and extract the main content from this URL
          </p>
        </div>
      )}

      {/* Error Message */}
      {fetchError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          ⚠️ {fetchError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || isFetching || (mode === 'paste' && !isValidLength)}
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
          isLoading || isFetching || (mode === 'paste' && !isValidLength)
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        }`}
      >
        {isLoading || isFetching ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {isFetching ? 'Fetching content...' : 'Roasting...'}
          </span>
        ) : (
          '🔥 Roast My Content'
        )}
      </button>
    </form>
  );
}
