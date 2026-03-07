'use client';

import { useState, useEffect } from 'react';

const loadingMessages = [
  "Warming up the roast...",
  "Sharpening the criticism...",
  "Consulting the snark committee...",
  "Analyzing your word crimes...",
  "Counting the buzzwords...",
  "Checking for AI slop...",
  "Measuring the fluff content...",
  "Searching for original thoughts...",
  "Calculating cringe factor...",
  "Preparing brutal honesty...",
  "Loading disappointment.exe...",
  "Summoning Gordon Ramsay vibes...",
];

export default function LoadingRoast() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-2 border-ao-stroke animate-spin border-t-ao-mid-green"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🔥</span>
        </div>
      </div>
      <p className="text-base font-medium text-ao-text-primary animate-pulse">
        {loadingMessages[messageIndex]}
      </p>
      <p className="font-mono text-xs text-ao-text-tertiary uppercase tracking-widest">
        Usually takes 10–15 seconds
      </p>
    </div>
  );
}
