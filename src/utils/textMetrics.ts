import type { ContentLengthLevel, TextMetrics } from '../adapters/types';

const chineseCharacterPattern = /[\u4e00-\u9fff]/g;
const latinWordPattern = /[A-Za-z0-9]+/g;
const sentenceSplitPattern = /[。！？!?；;\n]+/g;

export function normalizeWhitespace(text: string): string {
  return text.replace(/\r/g, '').replace(/[ \t]+/g, ' ').trim();
}

export function splitIntoParagraphs(text: string): string[] {
  return normalizeWhitespace(text)
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function splitIntoSentences(text: string): string[] {
  return normalizeWhitespace(text)
    .split(sentenceSplitPattern)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function truncateText(text: string, maxLength: number): string {
  const normalized = normalizeWhitespace(text);
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).replace(/[，。；、\s]+$/g, '')}...`;
}

export function getLengthLevel(characterCount: number): ContentLengthLevel {
  if (characterCount < 280) {
    return '短内容';
  }

  if (characterCount < 1200) {
    return '中等内容';
  }

  return '长内容';
}

export function getTextMetrics(text: string): TextMetrics {
  const normalized = normalizeWhitespace(text);
  const chineseCharacterCount = normalized.match(chineseCharacterPattern)?.length ?? 0;
  const latinWordCount = normalized.match(latinWordPattern)?.length ?? 0;
  const characterCount = Array.from(normalized.replace(/\s/g, '')).length;
  const wordLikeCount = chineseCharacterCount + latinWordCount;
  const readingTimeMinutes = wordLikeCount === 0 ? 0 : Math.max(1, Math.ceil(wordLikeCount / 450));

  return {
    characterCount,
    chineseCharacterCount,
    wordLikeCount,
    readingTimeMinutes,
    lengthLevel: getLengthLevel(characterCount),
  };
}

export function extractTopic(input: string): string {
  const sentences = splitIntoSentences(input);
  const firstSentence = sentences[0] ?? normalizeWhitespace(input);
  const cleaned = firstSentence.replace(/^[#\s【】「」"'“”]+/g, '').trim();

  if (!cleaned) {
    return '这篇内容';
  }

  return truncateText(cleaned, 26);
}

export function extractKeywords(input: string, fallback: string[] = []): string[] {
  const keywordPool = [
    '创作',
    '内容',
    '效率',
    '学习',
    '课程',
    '产品',
    '活动',
    '经验',
    '复盘',
    '工具',
    '方法',
    '运营',
    '品牌',
    '成长',
    '职场',
    '生活',
    '分享',
    '案例',
  ];

  const matched = keywordPool.filter((keyword) => input.includes(keyword));
  const combined = [...matched, ...fallback];
  return Array.from(new Set(combined)).slice(0, 6);
}

export function calculateRuleFitScore(
  input: string,
  options: {
    idealMin: number;
    idealMax: number;
    keywordHints?: string[];
    minScore?: number;
    maxScore?: number;
  },
): number {
  const metrics = getTextMetrics(input);
  const minScore = options.minScore ?? 62;
  const maxScore = options.maxScore ?? 96;
  let score = 72;

  if (metrics.characterCount >= options.idealMin && metrics.characterCount <= options.idealMax) {
    score += 14;
  } else if (metrics.characterCount < options.idealMin) {
    score += Math.max(-10, Math.round((metrics.characterCount / options.idealMin) * 10) - 8);
  } else {
    score += Math.max(-8, 8 - Math.round((metrics.characterCount - options.idealMax) / 250));
  }

  const paragraphCount = splitIntoParagraphs(input).length;
  if (paragraphCount >= 2) {
    score += 5;
  }

  const sentenceCount = splitIntoSentences(input).length;
  if (sentenceCount >= 3) {
    score += 4;
  }

  const keywordBonus = (options.keywordHints ?? []).filter((keyword) => input.includes(keyword)).length * 2;
  score += Math.min(keywordBonus, 8);

  return Math.min(maxScore, Math.max(minScore, score));
}
