import type { TextMetrics } from '../adapters/types';

interface ContentInputProps {
  value: string;
  metrics: TextMetrics;
  error?: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onFillExample: () => void;
}

export function ContentInput({ value, metrics, error, onChange, onClear, onFillExample }: ContentInputProps) {
  return (
    <section className="animate-fade-in-up rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">原始内容</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">输入后会自动生成平台预览，无需额外点击。</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            className="rounded-md border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={onFillExample}
            type="button"
          >
            填入示例内容
          </button>
          <button
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!value}
            onClick={onClear}
            type="button"
          >
            清空内容
          </button>
        </div>
      </div>

      <textarea
        aria-label="原始内容输入框"
        className={`mt-4 min-h-64 w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm leading-7 text-slate-800 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 ${
          error ? 'border-rose-300' : 'border-slate-200'
        }`}
        onChange={(event) => onChange(event.target.value)}
        placeholder="请输入你想要发布的内容，例如课程笔记、产品介绍、活动文案或个人经验分享"
        value={value}
      />

      {error ? <p className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-500">字数统计</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{metrics.characterCount}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-500">预计阅读</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{metrics.readingTimeMinutes} 分钟</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs text-slate-500">长度等级</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{metrics.lengthLevel}</p>
        </div>
      </div>
    </section>
  );
}
