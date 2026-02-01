'use client';

import { EEATScore } from '@/lib/types';

interface ScoreCardProps {
  title: string;
  description: string;
  score: EEATScore;
}

function getGradeColor(grade: string): string {
  const letter = grade.charAt(0).toUpperCase();
  switch (letter) {
    case 'A':
      return 'bg-green-500';
    case 'B':
      return 'bg-blue-500';
    case 'C':
      return 'bg-yellow-500';
    case 'D':
      return 'bg-orange-500';
    case 'F':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

function getGradeBorderColor(grade: string): string {
  const letter = grade.charAt(0).toUpperCase();
  switch (letter) {
    case 'A':
      return 'border-green-500';
    case 'B':
      return 'border-blue-500';
    case 'C':
      return 'border-yellow-500';
    case 'D':
      return 'border-orange-500';
    case 'F':
      return 'border-red-500';
    default:
      return 'border-gray-500';
  }
}

export default function ScoreCard({ title, description, score }: ScoreCardProps) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-md border-l-4 ${getGradeBorderColor(score.grade)} hover:shadow-lg transition-shadow`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          <p className="text-xs text-gray-500 mb-2">{description}</p>
          <p className="text-gray-700 text-sm">{score.comment}</p>
        </div>
        <div className={`${getGradeColor(score.grade)} text-white font-bold text-2xl w-14 h-14 rounded-lg flex items-center justify-center shrink-0 shadow-md`}>
          {score.grade}
        </div>
      </div>
    </div>
  );
}
