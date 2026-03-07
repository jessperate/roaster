'use client';

import { ExtendedScore } from '@/lib/types';
import { ScoreMetadata } from '@/lib/scoreMetadata';

interface ExtendedScoreCardProps {
  score: ExtendedScore;
  metadata: ScoreMetadata;
}

function getGradeBadgeStyle(grade: string): { bg: string; text: string } {
  const letter = grade.charAt(0).toUpperCase();
  switch (letter) {
    case 'A': return { bg: '#008c44', text: '#ffffff' };
    case 'B': return { bg: '#CCFFE0', text: '#000d05' };
    case 'C': return { bg: '#EEFF8C', text: '#000d05' };
    case 'D': return { bg: '#dfeae3', text: '#676c79' };
    case 'F': return { bg: '#000d05', text: '#00ff64' };
    default:  return { bg: '#dfeae3', text: '#000d05' };
  }
}

function getGradeBorderColor(grade: string): string {
  const letter = grade.charAt(0).toUpperCase();
  switch (letter) {
    case 'A': return '#008c44';
    case 'B': return '#CCFFE0';
    case 'C': return '#EEFF8C';
    case 'D': return '#dfeae3';
    case 'F': return '#000d05';
    default:  return '#d4e8da';
  }
}

const LOW_GRADE = new Set(['C', 'D', 'F']);

export default function ExtendedScoreCard({ score, metadata }: ExtendedScoreCardProps) {
  const badge = getGradeBadgeStyle(score.grade);
  const borderColor = getGradeBorderColor(score.grade);
  const showGuidance = LOW_GRADE.has(score.grade.charAt(0).toUpperCase());

  return (
    <div
      className="bg-ao-white p-5 border-l-4"
      style={{ borderColor, borderTop: '1px solid #d4e8da', borderRight: '1px solid #d4e8da', borderBottom: '1px solid #d4e8da' }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h4 className="font-bold text-ao-near-black text-base">{metadata.title}</h4>
          <p className="text-ao-text-secondary text-sm mt-1">{score.comment}</p>
        </div>
        <div
          className="font-bold text-xl w-12 h-12 flex items-center justify-center shrink-0 font-mono"
          style={{ background: badge.bg, color: badge.text }}
        >
          {score.grade}
        </div>
      </div>

      <div className="inline-block px-2 py-0.5 bg-ao-label-yellow font-mono text-xs font-medium tracking-widest uppercase text-ao-near-black mb-3">
        {metadata.label}
      </div>

      {showGuidance && (
        <div className="space-y-2 pt-2 border-t border-ao-stroke">
          <p className="text-xs text-ao-text-secondary leading-relaxed">{metadata.reasoning}</p>
          <p className="text-xs text-ao-mid-green font-medium leading-relaxed">→ {metadata.suggestion}</p>
        </div>
      )}
    </div>
  );
}
