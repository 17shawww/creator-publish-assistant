export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-700 text-xl text-white shadow-sm">
            发
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">创作者多平台发布助手</h1>
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                MVP / 模拟发布
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              将一篇原始内容快速适配为微信公众号、小红书、B站和知乎的发布版本。
            </p>
          </div>
        </div>
        <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          本地规则生成 · 不连接真实平台 API
        </div>
      </div>
    </header>
  );
}
