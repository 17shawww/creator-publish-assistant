export type PlatformId = 'wechat' | 'xiaohongshu' | 'bilibili' | 'zhihu';

export type ContentLengthLevel = '短内容' | '中等内容' | '长内容';

export interface TextMetrics {
  characterCount: number;
  chineseCharacterCount: number;
  wordLikeCount: number;
  readingTimeMinutes: number;
  lengthLevel: ContentLengthLevel;
}

export interface MetadataItem {
  label: string;
  value: string;
}

export interface PlatformMetadata {
  summary?: string;
  tags: string[];
  details: MetadataItem[];
}

export interface PlatformFormattingRules {
  tone: string;
  structure: string;
  tagStyle: string;
  bestFor: string;
}

export interface AdaptedContent {
  platformId: PlatformId;
  platformName: string;
  platformIcon: string;
  title: string;
  content: string;
  metadata: PlatformMetadata;
  fitScore: number;
  metrics: TextMetrics;
}

export interface PlatformAdapter {
  id: PlatformId;
  name: string;
  description: string;
  icon: string;
  rules: PlatformFormattingRules;
  generateTitle: (input: string) => string;
  transformContent: (input: string) => string;
  generateMetadata: (input: string) => PlatformMetadata;
  calculateFitScore: (input: string) => number;
}

export interface PublishRecord {
  id: string;
  sourceContent: string;
  results: AdaptedContent[];
  createdAt: string;
}
