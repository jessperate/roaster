'use client';

import { EEATScore } from '@/lib/types';

interface ScoreCardProps {
  title: string;
  description: string;
  score: EEATScore;
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

export default function ScoreCard({ title, description, score }: ScoreCardProps) {
  const badge = getGradeBadgeStyle(score.grade);
  const borderColor = getGradeBorderColor(score.grade);

  return (
    <div
      className="bg-ao-white p-5 border-l-4"
      style={{ borderColor, borderTop: '1px solid #d4e8da', borderRight: '1px solid #d4e8da', borderBottom: '1px solid #d4e8da' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-ao-near-black text-base">{title}</h3>
          <p className="font-mono text-xs text-ao-text-tertiary uppercase tracking-widest mb-2">{description}</p>
          <p className="text-ao-text-secondary text-sm">{score.comment}</p>
        </div>
        <div
          className="font-bold text-2xl w-14 h-14 flex items-center justify-center shrink-0 font-mono"
          style={{ background: badge.bg, color: badge.text }}
        >
          {score.grade}
        </div>
      </div>
    </div>
  );
}
