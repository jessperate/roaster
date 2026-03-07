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

export interface ExtendedScore {
  grade: string;
  comment: string;
}

export interface SEOAEOScores {
  keywordDensity: ExtendedScore;
  keywordInH2: ExtendedScore;
  keywordInFirst100Words: ExtendedScore;
  altText: ExtendedScore;
  internalLinks: ExtendedScore;
}

export interface InformationGainScores {
  firstPartyInsights: ExtendedScore;
}

export interface StructureReadabilityScores {
  paragraphSentenceLength: ExtendedScore;
  headingHierarchy: ExtendedScore;
  lists: ExtendedScore;
}

export interface Callout {
  quote: string;
  issue: string;
}

export interface RoastResult {
  verdict: string;
  overallScore: string;
  scores: EEATScores;
  seoAeoScores: SEOAEOScores;
  informationGainScores: InformationGainScores;
  structureReadabilityScores: StructureReadabilityScores;
  roast: string;
  callouts: Callout[];
  improvements: string[];
  originalContent?: string;
  sourceUrl?: string;
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
