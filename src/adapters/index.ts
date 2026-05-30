import type { AdaptedContent, PlatformAdapter, PlatformId } from './types';
import { bilibiliAdapter } from './bilibili';
import { wechatAdapter } from './wechat';
import { xiaohongshuAdapter } from './xiaohongshu';
import { zhihuAdapter } from './zhihu';
import { getTextMetrics } from '../utils/textMetrics';

export const platformAdapters: PlatformAdapter[] = [
  wechatAdapter,
  xiaohongshuAdapter,
  bilibiliAdapter,
  zhihuAdapter,
];

export function getAdapterById(id: PlatformId): PlatformAdapter | undefined {
  return platformAdapters.find((adapter) => adapter.id === id);
}

export function generateAdaptedContent(input: string, adapter: PlatformAdapter): AdaptedContent {
  const content = adapter.transformContent(input);

  return {
    platformId: adapter.id,
    platformName: adapter.name,
    platformIcon: adapter.icon,
    title: adapter.generateTitle(input),
    content,
    metadata: adapter.generateMetadata(input),
    fitScore: adapter.calculateFitScore(input),
    metrics: getTextMetrics(content),
  };
}
