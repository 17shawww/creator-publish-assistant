import type { AdaptedContent } from '../adapters/types';
import { EmptyState } from './EmptyState';
import { PreviewCard } from './PreviewCard';

interface PreviewSectionProps {
  previews: AdaptedContent[];
  hasContent: boolean;
  hasSelectedPlatforms: boolean;
}

export function PreviewSection({ previews, hasContent, hasSelectedPlatforms }: PreviewSectionProps) {
  if (!hasContent) {
    return (
      <EmptyState
        description="在左侧输入原始内容后，系统会根据平台规则自动生成对应版本。"
        title="等待输入原始内容"
      />
    );
  }

  if (!hasSelectedPlatforms) {
    return (
      <EmptyState
        description="请选择微信公众号、小红书、B站或知乎中的至少一个平台。"
        title="请选择目标发布平台"
      />
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {previews.map((preview) => (
        <PreviewCard key={preview.platformId} preview={preview} />
      ))}
    </section>
  );
}
