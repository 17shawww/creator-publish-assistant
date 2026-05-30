import type { PlatformAdapter, PlatformMetadata } from './types';
import {
  calculateRuleFitScore,
  extractKeywords,
  extractTopic,
  splitIntoSentences,
  truncateText,
} from '../utils/textMetrics';

function buildHashtags(input: string): string[] {
  return extractKeywords(input, ['经验分享', '干货', '生活方式', '创作者']).map((tag) => `#${tag}`);
}

export const xiaohongshuAdapter: PlatformAdapter = {
  id: 'xiaohongshu',
  name: '小红书',
  description: '适合轻松亲切、短句明显的经验分享和种草内容。',
  icon: '📌',
  rules: {
    tone: '轻松亲切',
    structure: '抓人标题、短句正文、收藏提示',
    tagStyle: 'hashtags',
    bestFor: '经验分享、生活方式、实用清单',
  },
  generateTitle(input) {
    const topic = extractTopic(input);
    return `${topic}，原来可以这样发！`;
  },
  transformContent(input) {
    const sentences = splitIntoSentences(input).slice(0, 6);
    const shortLines = sentences.length
      ? sentences.map((sentence) => `✨ ${truncateText(sentence, 42)}`).join('\n')
      : `✨ ${truncateText(input, 42)}`;

    return [
      '今天想分享一个很实用的内容整理思路～',
      shortLines,
      '如果你也在做内容发布，可以先收藏起来，之后发不同平台会轻松很多。',
      buildHashtags(input).join(' '),
    ].join('\n\n');
  },
  generateMetadata(input): PlatformMetadata {
    const hashtags = buildHashtags(input);

    return {
      summary: '已转换为更轻量、更生活化的小红书笔记表达。',
      tags: hashtags,
      details: [
        { label: '内容风格', value: '经验分享 / 种草笔记' },
        { label: '互动建议', value: '结尾引导收藏或评论' },
        { label: '标签格式', value: '话题标签前置 # 符号' },
      ],
    };
  },
  calculateFitScore(input) {
    return calculateRuleFitScore(input, {
      idealMin: 120,
      idealMax: 900,
      keywordHints: ['经验', '分享', '生活', '方法', '工具'],
      minScore: 66,
    });
  },
};
