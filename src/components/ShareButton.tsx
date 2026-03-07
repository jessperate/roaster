'use client';

import { useState } from 'react';
import { RoastResult } from '@/lib/types';
import { encodeRoastForUrl } from '@/lib/share';

interface ShareButtonProps {
  result: RoastResult;
}

export default function ShareButton({ result }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const encoded = encodeRoastForUrl(result);
    const url = `${window.location.origin}/share?data=${encoded}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`px-6 py-3 font-semibold transition-colors border ${
        copied
          ? 'bg-ao-interaction text-ao-near-black border-ao-interaction'
          : 'bg-ao-white border-ao-stroke text-ao-text-primary hover:border-ao-mid-green hover:text-ao-mid-green'
      }`}
    >
      {copied ? '✓ Link copied!' : '🔗 Share this roast'}
    </button>
  );
}
