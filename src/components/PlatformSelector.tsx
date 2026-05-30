import type { PlatformAdapter, PlatformId } from '../adapters/types';

interface PlatformSelectorProps {
  adapters: PlatformAdapter[];
  selectedPlatformIds: PlatformId[];
  error?: string;
  onToggle: (id: PlatformId) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

export function PlatformSelector({
  adapters,
  selectedPlatformIds,
  error,
  onToggle,
  onSelectAll,
  onClearSelection,
}: PlatformSelectorProps) {
  const selectedCount = selectedPlatformIds.length;
  const allSelected = selectedCount === adapters.length;

  return (
    <section className="animate-fade-in-up rounded-lg border border-slate-200 bg-white p-5 shadow-sm animation-delay-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">选择发布平台</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">可以同时选择多个平台生成不同版本。</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            className="rounded-md border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={allSelected}
            onClick={onSelectAll}
            type="button"
          >
            全选平台
          </button>
          <button
            className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={selectedCount === 0}
            onClick={onClearSelection}
            type="button"
          >
            取消全选
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {adapters.map((adapter) => {
          const selected = selectedPlatformIds.includes(adapter.id);

          return (
            <button
              aria-pressed={selected}
              className={`group rounded-lg border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${
                selected
                  ? 'border-cyan-500 bg-cyan-50 shadow-sm ring-1 ring-cyan-200'
                  : 'border-slate-200 bg-white'
              }`}
              key={adapter.id}
              onClick={() => onToggle(adapter.id)}
              type="button"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl transition ${
                    selected ? 'bg-white shadow-sm' : 'bg-slate-100 group-hover:bg-cyan-50'
                  }`}
                >
                  {adapter.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-900">{adapter.name}</h3>
                    <span
                      className={`flex h-6 min-w-6 items-center justify-center rounded-full border px-1 text-xs font-semibold transition ${
                        selected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-5 text-slate-500">{adapter.description}</p>
                  <p className={`mt-3 text-xs font-medium ${selected ? 'text-cyan-700' : 'text-slate-400'}`}>
                    {selected ? '已选择' : '点击选择'}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {error ? <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">{error}</p> : null}
    </section>
  );
}
