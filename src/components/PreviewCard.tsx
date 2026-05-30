import type { AdaptedContent } from '../adapters/types';

interface PreviewCardProps {
  preview: AdaptedContent;
}

export function PreviewCard({ preview }: PreviewCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-xl">
            {preview.platformIcon}
          </div>
          <div>
            <p className="text-sm text-slate-500">{preview.platformName}</p>
            <h3 className="text-lg font-semibold leading-6 text-slate-950">{preview.title}</h3>
          </div>
        </div>
        <div className="min-w-16 rounded-lg bg-emerald-50 px-3 py-2 text-center">
          <p className="text-xs text-emerald-700">适配评分</p>
          <p className="text-xl font-bold text-emerald-800">{preview.fitScore}</p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${preview.fitScore}%` }} />
      </div>

      {preview.metadata.summary ? (
        <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600">{preview.metadata.summary}</p>
      ) : null}

      <div className="mt-4 flex-1 rounded-lg border border-slate-100 bg-white p-4">
        <p className="mb-2 text-xs font-semibold uppercase text-slate-400">适配正文</p>
        <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{preview.content}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {preview.metadata.tags.map((tag) => (
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-2">
        {preview.metadata.details.map((item) => (
          <div className="rounded-md bg-slate-50 p-3" key={`${preview.platformId}-${item.label}`}>
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="mt-1 text-sm font-medium leading-5 text-slate-800">{item.value}</p>
          </div>
        ))}
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-xs text-slate-500">预览字数</p>
          <p className="mt-1 text-sm font-medium text-slate-800">{preview.metrics.characterCount} 字</p>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-xs text-slate-500">预计阅读时间</p>
          <p className="mt-1 text-sm font-medium text-slate-800">{preview.metrics.readingTimeMinutes} 分钟</p>
        </div>
      </div>
    </article>
  );
}
