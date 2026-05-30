interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm sm:right-6">
      <div
        className="animate-toast-in pointer-events-auto flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-soft"
        role="status"
      >
        <div>
          <p className="font-semibold text-emerald-700">操作成功</p>
          <p className="mt-1 leading-5">{message}</p>
        </div>
        <button
          aria-label="关闭提示"
          className="rounded-md px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      </div>
    </div>
  );
}
