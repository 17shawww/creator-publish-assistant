import type { PlatformAdapter, PlatformMetadata } from './types';
import {
  calculateRuleFitScore,
  extractKeywords,
  extractTopic,
  getTextMetrics,
  splitIntoSentences,
  truncateText,
} from '../utils/textMetrics';

function buildVideoTags(input: string): string[] {
  return extractKeywords(input, ['知识分享', '创作', '效率工具', '学习']).slice(0, 5);
}

export const bilibiliAdapter: PlatformAdapter = {
  id: 'bilibili',
  name: 'B站',
  description: '适合视频感标题、简介、开头 hook 和推荐标签。',
  icon: '🎬',
  rules: {
    tone: '直接、有画面感',
    structure: '视频标题、开头 hook、视频简介',
    tagStyle: '投稿标签',
    bestFor: '知识视频、经验复盘、教程内容',
  },
  generateTitle(input) {
    const topic = extractTopic(input);
    return `把“${topic}”讲明白：创作者多平台发布实战`;
  },
  transformContent(input) {
    const sentences = splitIntoSentences(input);
    const hook = sentences[0] ? truncateText(sentences[0], 48) : '同一篇内容，为什么发到不同平台效果完全不同？';
    const highlights = sentences.slice(1, 5).map((sentence, index) => `${index + 1}. ${truncateText(sentence, 58)}`);

    return [
      `开头 hook：${hook}`,
      '视频简介：本期视频会把原始内容拆成适合不同平台传播的版本，重点展示标题、正文结构、标签和发布前检查思路。',
      highlights.length ? `本期看点：\n${highlights.join('\n')}` : '本期看点：适合内容创作者快速理解多平台发布的基本流程。',
      `推荐标签：${buildVideoTags(input).join(' / ')}`,
    ].join('\n\n');
  },
  generateMetadata(input): PlatformMetadata {
    const metrics = getTextMetrics(input);
    const tags = buildVideoTags(input);

    return {
      summary: '已转换为适合视频投稿的简介、看点和标签。',
      tags,
      details: [
        { label: '视频分区建议', value: input.includes('产品') ? '科技 / 软件应用' : '知识 / 职业职场' },
        { label: '简介长度', value: `${metrics.characterCount} 字原始素材，可剪成 ${Math.max(1, metrics.readingTimeMinutes)} 段讲解` },
        { label: '封面建议', value: '标题关键词加对比式副标题' },
      ],
    };
  },
  calculateFitScore(input) {
    return calculateRuleFitScore(input, {
      idealMin: 220,
      idealMax: 1600,
      keywordHints: ['教程', '经验', '实战', '方法', '工具'],
    });
  },
};
