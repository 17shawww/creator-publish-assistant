import type { PlatformAdapter, PlatformMetadata } from './types';
import {
  calculateRuleFitScore,
  extractKeywords,
  extractTopic,
  splitIntoParagraphs,
  truncateText,
} from '../utils/textMetrics';

function buildQuestionTitle(input: string): string {
  const topic = extractTopic(input);
  return `如何看待“${topic}”？`;
}

export const zhihuAdapter: PlatformAdapter = {
  id: 'zhihu',
  name: '知乎',
  description: '适合理性分析、问题导向和观点讨论。',
  icon: '💡',
  rules: {
    tone: '理性分析',
    structure: '背景、分析、结论',
    tagStyle: '关键词',
    bestFor: '知识分享、观点讨论、方法论沉淀',
  },
  generateTitle(input) {
    return buildQuestionTitle(input);
  },
  transformContent(input) {
    const paragraphs = splitIntoParagraphs(input);
    const source = paragraphs.length ? paragraphs.join('\n\n') : truncateText(input, 180);
    const backgroundSource = truncateText(source, 140).replace(/[。！？!?]+$/g, '');

    return [
      '背景：',
      `这个问题的核心在于，${backgroundSource}。如果直接把同一份内容复制到所有平台，往往会忽略平台语境和读者预期。`,
      '分析：',
      '第一，不同平台对标题、正文结构和互动方式的要求不同。第二，内容适配不是简单改写，而是重新组织信息优先级。第三，适配结果需要保留原始观点，同时让表达更符合目标平台。',
      '结论：',
      '更合理的做法是先保留原始内容的核心价值，再根据平台规则生成不同版本，并在发布前检查标题、标签、阅读节奏和预览效果。',
    ].join('\n\n');
  },
  generateMetadata(input): PlatformMetadata {
    const tags = extractKeywords(input, ['问题分析', '内容策略', '知识分享']);

    return {
      summary: '已转换为知乎问答场景下的理性分析结构。',
      tags,
      details: [
        { label: '问题类型', value: '方法讨论 / 观点分析' },
        { label: '讨论方向', value: '内容适配、平台差异、创作效率' },
        { label: '关键词', value: tags.join('、') },
      ],
    };
  },
  calculateFitScore(input) {
    return calculateRuleFitScore(input, {
      idealMin: 380,
      idealMax: 2200,
      keywordHints: ['为什么', '如何', '分析', '观点', '结论'],
    });
  },
};
