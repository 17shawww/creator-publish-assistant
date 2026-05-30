import type { PlatformAdapter, PlatformMetadata } from './types';
import {
  calculateRuleFitScore,
  extractKeywords,
  extractTopic,
  getTextMetrics,
  splitIntoParagraphs,
  truncateText,
} from '../utils/textMetrics';

function buildSummary(input: string): string {
  const topic = extractTopic(input);
  return `本文围绕“${topic}”进行梳理，提炼核心观点、关键做法和适合进一步传播的表达重点。`;
}

export const wechatAdapter: PlatformAdapter = {
  id: 'wechat',
  name: '微信公众号',
  description: '适合正式、清晰、结构化的长文发布。',
  icon: '📰',
  rules: {
    tone: '正式清晰',
    structure: '摘要、正文分段、结尾总结',
    tagStyle: '文章类型与阅读场景元数据',
    bestFor: '深度文章、课程笔记、品牌观点',
  },
  generateTitle(input) {
    const topic = extractTopic(input);
    return `${topic}：一篇适合收藏的结构化整理`;
  },
  transformContent(input) {
    const paragraphs = splitIntoParagraphs(input);
    const body = paragraphs.length
      ? paragraphs.map((paragraph) => `　　${paragraph}`).join('\n\n')
      : `　　${truncateText(input, 160)}`;

    return [
      `摘要：${buildSummary(input)}`,
      '一、内容背景',
      body,
      '二、核心要点',
      '这部分内容可以进一步提炼为清晰的观点、可执行的方法和面向读者的价值说明，帮助读者在较短时间内抓住重点。',
      '三、发布建议',
      '建议在正式发布前补充封面图、作者简介和一段明确的结尾行动提示，提升公众号阅读场景下的完整度。',
    ].join('\n\n');
  },
  generateMetadata(input): PlatformMetadata {
    const metrics = getTextMetrics(input);
    const keywords = extractKeywords(input, ['深度阅读', '结构化表达', '内容创作']);

    return {
      summary: buildSummary(input),
      tags: keywords,
      details: [
        { label: '文章类型', value: metrics.characterCount > 800 ? '深度长文' : '观点短文' },
        { label: '建议封面方向', value: '横版封面，突出标题关键词' },
        { label: '预计阅读时间', value: `${metrics.readingTimeMinutes} 分钟` },
      ],
    };
  },
  calculateFitScore(input) {
    return calculateRuleFitScore(input, {
      idealMin: 600,
      idealMax: 2600,
      keywordHints: ['观点', '方法', '复盘', '案例', '总结'],
    });
  },
};
