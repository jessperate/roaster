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
      // Fallback for browsers that don't support clipboard API
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
      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-500'
      }`}
    >
      {copied ? '✓ Link Copied!' : '🔗 Share This Roast'}
    </button>
  );
}
