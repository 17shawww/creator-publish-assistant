import type { PublishRecord } from '../adapters/types';
import { EmptyState } from './EmptyState';

interface PublishHistoryProps {
  records: PublishRecord[];
  onClear: () => void;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getAverageScore(record: PublishRecord): number {
  if (record.results.length === 0) {
    return 0;
  }

  const totalScore = record.results.reduce((sum, result) => sum + result.fitScore, 0);
  return Math.round(totalScore / record.results.length);
}

export function PublishHistory({ records, onClear }: PublishHistoryProps) {
  return (
    <section className="animate-fade-in-up rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">发布历史</h2>
          <p className="mt-1 text-sm text-slate-500">仅保存模拟发布记录，不会连接真实平台。</p>
        </div>
        <button
          className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={records.length === 0}
          onClick={onClear}
          type="button"
        >
          清空历史
        </button>
      </div>

      <div className="mt-5">
        {records.length === 0 ? (
          <EmptyState description="点击模拟发布后，记录会自动保存在这里。" title="暂无发布历史" />
        ) : (
          <div className="space-y-3">
            {records.map((record) => {
              const averageScore = getAverageScore(record);

              return (
                <article className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={record.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{formatDate(record.createdAt)}</p>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{record.sourceContent}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                        {record.results.length} 个平台
                      </span>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        平均 {averageScore} 分
                      </span>
                    </div>
                  </div>

                  <details className="mt-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                    <summary className="cursor-pointer text-sm font-medium text-cyan-700 outline-none focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
                      查看平台明细
                    </summary>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {record.results.map((result) => (
                        <div
                          className="rounded-md border border-slate-200 bg-slate-50 p-3"
                          key={`${record.id}-${result.platformId}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-slate-900">
                              {result.platformIcon} {result.platformName}
                            </p>
                            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                              {result.fitScore} 分
                            </span>
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{result.title}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
