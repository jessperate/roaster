export interface EEATScore {
  grade: string;
  comment: string;
}

export interface EEATScores {
  experience: EEATScore;
  expertise: EEATScore;
  authoritativeness: EEATScore;
  trustworthiness: EEATScore;
}

export interface Callout {
  quote: string;
  issue: string;
}

export interface RoastResult {
  verdict: string;
  overallScore: string;
  scores: EEATScores;
  roast: string;
  callouts: Callout[];
  improvements: string[];
}

export interface FetchUrlResponse {
  content: string | null;
  title: string | null;
  error: string | null;
}

export interface RoastRequest {
  content: string;
  url?: string;
}
