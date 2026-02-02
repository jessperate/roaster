'use client';

import { useState } from 'react';

interface CollapsibleContentProps {
  content: string;
  sourceUrl?: string;
}

export default function CollapsibleContent({ content, sourceUrl }: CollapsibleContentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📄</span>
          <span className="font-semibold text-gray-700">Original Content</span>
          {sourceUrl && (
            <span className="text-xs text-gray-500 truncate max-w-[200px]">
              ({new URL(sourceUrl).hostname})
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-200">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 mt-3 mb-2"
            >
              <span>View original source</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <div className="mt-3 max-h-96 overflow-y-auto">
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
              {content}
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              {content.length.toLocaleString()} characters
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
