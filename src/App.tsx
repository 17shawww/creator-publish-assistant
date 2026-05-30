import { useEffect, useMemo, useState } from 'react';
import { generateAdaptedContent, platformAdapters } from './adapters';
import type { PlatformId, PublishRecord } from './adapters/types';
import { ContentInput } from './components/ContentInput';
import { Header } from './components/Header';
import { MetricsCard } from './components/MetricsCard';
import { PlatformSelector } from './components/PlatformSelector';
import { PreviewSection } from './components/PreviewSection';
import { PublishHistory } from './components/PublishHistory';
import { WorkflowSteps } from './components/WorkflowSteps';
import { clearPublishHistory, loadPublishHistory, savePublishRecord } from './utils/storage';
import { getTextMetrics } from './utils/textMetrics';

function createRecordId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `record-${Date.now()}`;
}

function App() {
  const [sourceContent, setSourceContent] = useState('');
  const [selectedPlatformIds, setSelectedPlatformIds] = useState<PlatformId[]>([]);
  const [history, setHistory] = useState<PublishRecord[]>([]);
  const [contentError, setContentError] = useState('');
  const [platformError, setPlatformError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [publishedOnce, setPublishedOnce] = useState(false);

  const trimmedContent = sourceContent.trim();
  const sourceMetrics = useMemo(() => getTextMetrics(sourceContent), [sourceContent]);

  const selectedAdapters = useMemo(
    () => platformAdapters.filter((adapter) => selectedPlatformIds.includes(adapter.id)),
    [selectedPlatformIds],
  );

  const previews = useMemo(() => {
    if (!trimmedContent || selectedAdapters.length === 0) {
      return [];
    }

    return selectedAdapters.map((adapter) => generateAdaptedContent(trimmedContent, adapter));
  }, [selectedAdapters, trimmedContent]);

  const canPublish = Boolean(trimmedContent) && selectedPlatformIds.length > 0;
  const currentStep = publishedOnce ? 4 : trimmedContent ? (selectedPlatformIds.length > 0 ? 3 : 2) : 1;

  useEffect(() => {
    setHistory(loadPublishHistory());
  }, []);

  useEffect(() => {
    if (trimmedContent) {
      setContentError('');
    }
  }, [trimmedContent]);

  useEffect(() => {
    if (selectedPlatformIds.length > 0) {
      setPlatformError('');
    }
  }, [selectedPlatformIds]);

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timer = window.setTimeout(() => setSuccessMessage(''), 3200);
    return () => window.clearTimeout(timer);
  }, [successMessage]);

  function handlePlatformToggle(id: PlatformId) {
    setPublishedOnce(false);
    setSelectedPlatformIds((current) =>
      current.includes(id) ? current.filter((platformId) => platformId !== id) : [...current, id],
    );
  }

  function handleContentChange(value: string) {
    setPublishedOnce(false);
    setSourceContent(value);
  }

  function handleClearContent() {
    setPublishedOnce(false);
    setSourceContent('');
    setContentError('');
  }

  function handlePublish() {
    if (!trimmedContent) {
      setContentError('请输入原始内容后再模拟发布。');
      return;
    }

    if (selectedPlatformIds.length === 0) {
      setPlatformError('请至少选择一个目标发布平台。');
      return;
    }

    const record: PublishRecord = {
      id: createRecordId(),
      sourceContent: trimmedContent,
      results: previews,
      createdAt: new Date().toISOString(),
    };

    setHistory(savePublishRecord(record));
    setSuccessMessage('发布成功，已保存到历史记录');
    setPublishedOnce(true);
  }

  function handleClearHistory() {
    clearPublishHistory();
    setHistory([]);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <WorkflowSteps currentStep={currentStep} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <ContentInput
              error={contentError}
              metrics={sourceMetrics}
              onChange={handleContentChange}
              onClear={handleClearContent}
              value={sourceContent}
            />

            <PlatformSelector
              adapters={platformAdapters}
              error={platformError}
              onToggle={handlePlatformToggle}
              selectedPlatformIds={selectedPlatformIds}
            />

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid grid-cols-3 gap-3">
                <MetricsCard helper="原始内容" label="字符数" value={sourceMetrics.characterCount} />
                <MetricsCard helper="已选择" label="平台数" tone="sky" value={selectedPlatformIds.length} />
                <MetricsCard helper="本地保存" label="历史数" tone="emerald" value={history.length} />
              </div>

              {successMessage ? (
                <p className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                  {successMessage}
                </p>
              ) : null}

              {!canPublish ? (
                <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  请输入内容并至少选择一个平台后，即可进行模拟发布。
                </p>
              ) : null}

              <button
                className="mt-4 w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={!canPublish}
                onClick={handlePublish}
                type="button"
              >
                模拟发布
              </button>
            </section>
          </div>

          <div className="space-y-6">
            <section>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">预览适配结果</h2>
                  <p className="mt-1 text-sm text-slate-500">所有内容均由本地规则生成，适合课堂演示和 Demo 视频展示。</p>
                </div>
                <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                  当前生成 {previews.length} 个版本
                </span>
              </div>

              <PreviewSection
                hasContent={Boolean(trimmedContent)}
                hasSelectedPlatforms={selectedPlatformIds.length > 0}
                previews={previews}
              />
            </section>

            <PublishHistory onClear={handleClearHistory} records={history} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
