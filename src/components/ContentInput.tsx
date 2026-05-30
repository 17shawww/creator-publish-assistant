import type { TextMetrics } from '../adapters/types';

interface ContentInputProps {
  value: string;
  metrics: TextMetrics;
  error?: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export function ContentInput({ value, metrics, error, onChange, onClear }: ContentInputProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">原始内容</h2>
          <p className="mt-1 text-sm text-slate-500">先粘贴或输入一篇完整内容，再选择目标平台。</p>
        </div>
        <button
          className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!value}
          onClick={onClear}
          type="button"
        >
          清空
        </button>
      </div>

      <textarea
        className={`mt-4 min-h-72 w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 ${
          error ? 'border-rose-300' : 'border-slate-200'
        }`}
        onChange={(event) => onChange(event.target.value)}
        placeholder="请输入你想要发布的内容，例如课程笔记、产品介绍、活动文案或个人经验分享"
        value={value}
      />

      {error ? <p className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">字数统计</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{metrics.characterCount}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">预计阅读</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{metrics.readingTimeMinutes} 分钟</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">长度等级</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{metrics.lengthLevel}</p>
        </div>
      </div>
    </section>
  );
}
