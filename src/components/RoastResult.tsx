'use client';

import { RoastResult as RoastResultType } from '@/lib/types';
import {
  SEO_AEO_METADATA,
  INFORMATION_GAIN_METADATA,
  STRUCTURE_READABILITY_METADATA,
} from '@/lib/scoreMetadata';
import ScoreCard from './ScoreCard';
import ExtendedScoreCard from './ExtendedScoreCard';
import ShareButton from './ShareButton';
import CollapsibleContent from './CollapsibleContent';

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

function getVerdictStyle(verdict: string): { bg: string; text: string; score: string } {
  if (verdict.includes('Premium')) return { bg: '#002910', text: '#ffffff', score: '#00ff64' };
  if (verdict.includes('Solid'))   return { bg: '#008c44', text: '#ffffff', score: '#CCFFE0' };
  if (verdict.includes('Meh'))     return { bg: '#dfeae3', text: '#000d05', score: '#008c44' };
  if (verdict.includes('Needs'))   return { bg: '#EEFF8C', text: '#000d05', score: '#000d05' };
  return { bg: '#000d05', text: '#ffffff', score: '#00ff64' };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 bg-ao-label-yellow font-mono text-xs font-medium tracking-widest uppercase text-ao-near-black">
      {children}
    </span>
  );
}

export default function RoastResult({ result }: RoastResultProps) {
  const verdictStyle = getVerdictStyle(result.verdict);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Verdict Banner */}
      <div
        className="p-8 text-center"
        style={{ background: verdictStyle.bg, color: verdictStyle.text }}
      >
        <div className="text-5xl mb-4">{getVerdictEmoji(result.verdict)}</div>
        <h2 className="font-serif text-3xl mb-2" style={{ letterSpacing: '-0.02em' }}>{result.verdict}</h2>
        <p className="text-6xl font-mono font-bold" style={{ color: verdictStyle.score }}>
          {result.overallScore}
        </p>
      </div>

      {/* E-E-A-T Scores */}
      <div>
        <div className="mb-4"><SectionLabel>E-E-A-T Breakdown</SectionLabel></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ScoreCard title="Experience" description="First-hand, real-world experience" score={result.scores.experience} />
          <ScoreCard title="Expertise" description="Deep subject knowledge" score={result.scores.expertise} />
          <ScoreCard title="Authoritativeness" description="Credentials & citations" score={result.scores.authoritativeness} />
          <ScoreCard title="Trustworthiness" description="Accuracy & transparency" score={result.scores.trustworthiness} />
        </div>
      </div>

      {/* SEO & AEO Discoverability */}
      {result.seoAeoScores && (
        <div>
          <div className="mb-4"><SectionLabel>SEO & AEO Discoverability</SectionLabel></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ExtendedScoreCard score={result.seoAeoScores.keywordDensity} metadata={SEO_AEO_METADATA.keywordDensity} />
            <ExtendedScoreCard score={result.seoAeoScores.keywordInH2} metadata={SEO_AEO_METADATA.keywordInH2} />
            <ExtendedScoreCard score={result.seoAeoScores.keywordInFirst100Words} metadata={SEO_AEO_METADATA.keywordInFirst100Words} />
            <ExtendedScoreCard score={result.seoAeoScores.altText} metadata={SEO_AEO_METADATA.altText} />
            <ExtendedScoreCard score={result.seoAeoScores.internalLinks} metadata={SEO_AEO_METADATA.internalLinks} />
          </div>
        </div>
      )}

      {/* Information Gain */}
      {result.informationGainScores && (
        <div>
          <div className="mb-4"><SectionLabel>Information Gain</SectionLabel></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ExtendedScoreCard score={result.informationGainScores.firstPartyInsights} metadata={INFORMATION_GAIN_METADATA.firstPartyInsights} />
          </div>
        </div>
      )}

      {/* Structure & Readability */}
      {result.structureReadabilityScores && (
        <div>
          <div className="mb-4"><SectionLabel>Structure & Readability</SectionLabel></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ExtendedScoreCard score={result.structureReadabilityScores.paragraphSentenceLength} metadata={STRUCTURE_READABILITY_METADATA.paragraphSentenceLength} />
            <ExtendedScoreCard score={result.structureReadabilityScores.headingHierarchy} metadata={STRUCTURE_READABILITY_METADATA.headingHierarchy} />
            <ExtendedScoreCard score={result.structureReadabilityScores.lists} metadata={STRUCTURE_READABILITY_METADATA.lists} />
          </div>
        </div>
      )}

      {/* The Roast */}
      <div className="bg-ao-white border border-ao-stroke p-6">
        <div className="mb-4"><SectionLabel>The Roast 🔥</SectionLabel></div>
        <p className="text-ao-text-primary whitespace-pre-wrap leading-relaxed">{result.roast}</p>
      </div>

      {/* Callouts */}
      {result.callouts.length > 0 && (
        <div>
          <div className="mb-4"><SectionLabel>Specific Callouts</SectionLabel></div>
          <div className="space-y-3">
            {result.callouts.map((callout, index) => (
              <div key={index} className="bg-ao-white border border-ao-stroke p-4">
                <blockquote className="text-ao-text-secondary italic border-l-4 border-ao-mid-green pl-4 mb-2">
                  &ldquo;{callout.quote}&rdquo;
                </blockquote>
                <p className="text-ao-mid-green font-medium text-sm font-mono">
                  ⚠️ {callout.issue}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvements */}
      {result.improvements.length > 0 && (
        <div className="border border-ao-stroke p-6" style={{ background: '#F8FFFA' }}>
          <div className="mb-4"><SectionLabel>How to fix this</SectionLabel></div>
          <ul className="space-y-3">
            {result.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="font-mono font-bold text-sm w-6 h-6 flex items-center justify-center shrink-0"
                  style={{ background: '#008c44', color: '#ffffff' }}
                >
                  {index + 1}
                </span>
                <span className="text-ao-text-primary">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Original Content */}
      {result.originalContent && (
        <CollapsibleContent
          content={result.originalContent}
          sourceUrl={result.sourceUrl}
        />
      )}

      {/* Share */}
      <div className="text-center pt-2 space-y-3">
        <ShareButton result={result} />
        <p className="text-ao-text-secondary text-sm">
          Think your content got unfairly roasted? Fix it and try again. 🔥
        </p>
      </div>
    </div>
  );
}
