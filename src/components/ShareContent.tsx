'use client';

import { useSearchParams } from 'next/navigation';
import { decodeRoastFromUrl } from '@/lib/share';
import RoastResult from '@/components/RoastResult';
import Link from 'next/link';

export default function ShareContent() {
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
