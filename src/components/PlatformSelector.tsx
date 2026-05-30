import type { PlatformAdapter, PlatformId } from '../adapters/types';

interface PlatformSelectorProps {
  adapters: PlatformAdapter[];
  selectedPlatformIds: PlatformId[];
  error?: string;
  onToggle: (id: PlatformId) => void;
}

export function PlatformSelector({ adapters, selectedPlatformIds, error, onToggle }: PlatformSelectorProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-950">选择发布平台</h2>
        <p className="mt-1 text-sm text-slate-500">可以同时选择多个平台生成不同版本。</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {adapters.map((adapter) => {
          const selected = selectedPlatformIds.includes(adapter.id);

          return (
            <button
              className={`rounded-lg border p-4 text-left transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-sky-100 ${
                selected ? 'border-sky-400 bg-sky-50' : 'border-slate-200 bg-white'
              }`}
              key={adapter.id}
              onClick={() => onToggle(adapter.id)}
              type="button"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xl">
                  {adapter.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-900">{adapter.name}</h3>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${
                        selected ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-5 text-slate-500">{adapter.description}</p>
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
