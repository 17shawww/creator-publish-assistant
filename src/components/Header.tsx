export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
        <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          面向内容创作者的多平台内容适配与模拟发布工具
        </div>
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">创作者多平台发布助手</h1>
          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
            将一篇原始内容快速适配为微信公众号、小红书、B站和知乎的发布版本。
          </p>
        </div>
      </div>
    </header>
  );
}
