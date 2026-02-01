'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { decodeRoastFromUrl } from '@/lib/share';
import RoastResult from '@/components/RoastResult';
import Link from 'next/link';

function ShareContent() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');

  if (!data) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🤔</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No roast found</h2>
        <p className="text-gray-600 mb-6">This link doesn&apos;t contain any roast data.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
        >
          Roast Your Own Content
        </Link>
      </div>
    );
  }

  const result = decodeRoastFromUrl(data);

  if (!result) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">😵</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid roast data</h2>
        <p className="text-gray-600 mb-6">We couldn&apos;t decode this roast. The link might be corrupted.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
        >
          Roast Your Own Content
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
        <p className="text-yellow-800">
          🔗 Someone shared this roast with you!
        </p>
      </div>
      <RoastResult result={result} />
      <div className="text-center">
        <Link
          href="/"
          className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-bold text-lg hover:from-gray-900 hover:to-black transition-all shadow-lg hover:shadow-xl inline-block"
        >
          🔥 Roast Your Own Content
        </Link>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <header className="pt-8 pb-4 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-3">
              Content Roaster
            </h1>
          </Link>
          <p className="text-xl text-gray-600 font-medium">
            Shared Roast Report 🔥
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="text-center py-16">
            <div className="text-4xl animate-pulse">🔥</div>
            <p className="text-gray-600 mt-4">Loading roast...</p>
          </div>
        }>
          <ShareContent />
        </Suspense>
      </div>

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
