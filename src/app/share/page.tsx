import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import ShareContent from '@/components/ShareContent';
import { decodeRoastFromUrl } from '@/lib/share';

interface SharePageProps {
  searchParams: Promise<{ data?: string }>;
}

export async function generateMetadata({ searchParams }: SharePageProps): Promise<Metadata> {
  const params = await searchParams;
  const data = params.data;

  // Default metadata
  const defaultMeta: Metadata = {
    title: 'Shared Roast | Content Roaster',
    description: 'Someone shared a content roast with you. See how this content scored on E-E-A-T criteria.',
    openGraph: {
      title: 'Shared Roast | Content Roaster',
      description: 'Someone shared a content roast with you. See how this content scored on E-E-A-T criteria.',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Shared Roast | Content Roaster',
      description: 'Someone shared a content roast with you. See how this content scored on E-E-A-T criteria.',
    },
  };

  if (!data) {
    return defaultMeta;
  }

  const result = decodeRoastFromUrl(data);

  if (!result) {
    return defaultMeta;
  }

  // Build dynamic metadata from roast result
  const title = `${result.verdict} (${result.overallScore}) | Content Roaster`;
  const description = `E-E-A-T Scores: Experience ${result.scores.experience.grade}, Expertise ${result.scores.expertise.grade}, Authority ${result.scores.authoritativeness.grade}, Trust ${result.scores.trustworthiness.grade}. ${result.roast.slice(0, 150)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
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
