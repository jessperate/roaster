'use client';

import { RoastResult as RoastResultType } from '@/lib/types';
import ScoreCard from './ScoreCard';
import ShareButton from './ShareButton';

interface RoastResultProps {
  result: RoastResultType;
}

function getVerdictEmoji(verdict: string): string {
  if (verdict.includes('Premium')) return '👑';
  if (verdict.includes('Solid')) return '👍';
  if (verdict.includes('Meh')) return '😐';
  if (verdict.includes('Needs Work')) return '😬';
  if (verdict.includes('Pure AI')) return '🤖';
  if (verdict.includes('Certified')) return '💩';
  return '🔥';
}

function getVerdictBgColor(verdict: string): string {
  if (verdict.includes('Premium')) return 'bg-gradient-to-r from-green-500 to-emerald-600';
  if (verdict.includes('Solid')) return 'bg-gradient-to-r from-blue-500 to-indigo-600';
  if (verdict.includes('Meh')) return 'bg-gradient-to-r from-yellow-500 to-amber-600';
  if (verdict.includes('Needs Work')) return 'bg-gradient-to-r from-orange-500 to-red-500';
  return 'bg-gradient-to-r from-red-600 to-rose-700';
}

export default function RoastResult({ result }: RoastResultProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Verdict Banner */}
      <div className={`${getVerdictBgColor(result.verdict)} rounded-2xl p-8 text-white text-center shadow-xl`}>
        <div className="text-6xl mb-4">{getVerdictEmoji(result.verdict)}</div>
        <h2 className="text-3xl font-black mb-2">{result.verdict}</h2>
        <p className="text-5xl font-black">{result.overallScore}</p>
      </div>

      {/* E-E-A-T Scores */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📊</span> E-E-A-T Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreCard
            title="Experience"
            description="First-hand, real-world experience"
            score={result.scores.experience}
          />
          <ScoreCard
            title="Expertise"
            description="Deep subject knowledge"
            score={result.scores.expertise}
          />
          <ScoreCard
            title="Authoritativeness"
            description="Credentials & citations"
            score={result.scores.authoritativeness}
          />
          <ScoreCard
            title="Trustworthiness"
            description="Accuracy & transparency"
            score={result.scores.trustworthiness}
          />
        </div>
      </div>

      {/* The Roast */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>🔥</span> The Roast
        </h3>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{result.roast}</p>
        </div>
      </div>

      {/* Callouts */}
      {result.callouts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span> Specific Callouts
          </h3>
          <div className="space-y-3">
            {result.callouts.map((callout, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm"
              >
                <blockquote className="text-gray-600 italic border-l-4 border-red-400 pl-4 mb-2">
                  &ldquo;{callout.quote}&rdquo;
                </blockquote>
                <p className="text-red-600 font-medium text-sm">
                  ⚠️ {callout.issue}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {result.improvements.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>💡</span> How to Fix This
          </h3>
          <ul className="space-y-3">
            {result.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Share */}
      <div className="text-center pt-4 space-y-4">
        <ShareButton result={result} />
        <p className="text-gray-500 text-sm">
          Think your content got unfairly roasted? Fix it and try again! 🔥
        </p>
      </div>
    </div>
  );
}
