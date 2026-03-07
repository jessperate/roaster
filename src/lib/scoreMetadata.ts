export interface ScoreMetadata {
  title: string;
  label: string;
  reasoning: string;
  suggestion: string;
}

export const SEO_AEO_METADATA: Record<string, ScoreMetadata> = {
  keywordDensity: {
    title: 'Keyword density',
    label: 'Target keywords in your Brand Kit',
    reasoning: "When this score is low, your Brand Kit doesn't have enough keyword and topic signal for AirOps to weight them naturally throughout your content.",
    suggestion: 'Add your primary keywords and topic clusters to your Brand Kit.',
  },
  keywordInH2: {
    title: 'Keyword in H2',
    label: 'Content priorities in your Brand Kit',
    reasoning: "When this score is low, AirOps doesn't have enough topic priority signal to anchor section headings to your target keywords.",
    suggestion: 'Add your core topics and keyword priorities to your Brand Kit.',
  },
  keywordInFirst100Words: {
    title: 'Keyword in first 100 words',
    label: 'Audience and topic context in your knowledge base',
    reasoning: "When this score is low, your brief or knowledge base doesn't have enough context for AirOps to lead with your most important topic signal.",
    suggestion: 'Add your target audience, topic intent, and positioning to your knowledge base.',
  },
  altText: {
    title: 'Alt text',
    label: 'Image guidelines in your Brand Kit',
    reasoning: "When this score is low, your Brand Kit doesn't include enough image description guidance for AirOps to generate optimized alt text.",
    suggestion: 'Add alt text style preferences and image naming conventions to your Brand Kit.',
  },
  internalLinks: {
    title: 'Internal links',
    label: 'Content library in your knowledge base',
    reasoning: "When this score is low, your knowledge base doesn't have enough of your content indexed for AirOps to build relevant internal links.",
    suggestion: 'Add your key URLs and content library to your knowledge base.',
  },
};

export const INFORMATION_GAIN_METADATA: Record<string, ScoreMetadata> = {
  firstPartyInsights: {
    title: 'First-party insights',
    label: 'Proprietary data in your knowledge base',
    reasoning: "When this score is low, your knowledge base doesn't have enough first-party research, stats, or customer outcomes for AirOps to draw from.",
    suggestion: 'Add proprietary data, customer results, and named research to your knowledge base.',
  },
};

export const STRUCTURE_READABILITY_METADATA: Record<string, ScoreMetadata> = {
  paragraphSentenceLength: {
    title: 'Paragraph and sentence length',
    label: 'Voice and format preferences in your Brand Kit',
    reasoning: "When this score is low, your Brand Kit doesn't have enough format guidance for AirOps to calibrate sentence and paragraph length to your style.",
    suggestion: 'Add reading level, sentence style, and paragraph length preferences to your Brand Kit.',
  },
  headingHierarchy: {
    title: 'Heading hierarchy and descriptiveness',
    label: 'Content structure preferences in your Brand Kit',
    reasoning: "When this score is low, your Brand Kit doesn't have enough structural guidance for AirOps to apply consistent heading hierarchy.",
    suggestion: 'Add your preferred content structure and heading style to your Brand Kit.',
  },
  lists: {
    title: 'Lists',
    label: 'Formatting preferences in your Brand Kit',
    reasoning: "When this score is low, your Brand Kit doesn't have enough formatting signal for AirOps to know when to use lists vs. prose for your audience.",
    suggestion: 'Add your list and formatting preferences to your Brand Kit.',
  },
};
