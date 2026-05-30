import { useEffect, useMemo, useState } from 'react';
import { generateAdaptedContent, platformAdapters } from './adapters';
import type { PlatformId, PublishRecord } from './adapters/types';
import { ContentInput } from './components/ContentInput';
import { Header } from './components/Header';
import { MetricsCard } from './components/MetricsCard';
import { PlatformSelector } from './components/PlatformSelector';
import { PreviewSection } from './components/PreviewSection';
import { PublishHistory } from './components/PublishHistory';
import { Toast } from './components/Toast';
import { WorkflowSteps } from './components/WorkflowSteps';
import { clearPublishHistory, loadPublishHistory, savePublishRecord } from './utils/storage';
import { getTextMetrics } from './utils/textMetrics';

const EXAMPLE_CONTENT = `我们最近完成了一次关于个人知识管理的课程复盘。

这门课的核心不是教大家收集更多资料，而是帮助创作者建立一个可以持续输出的内容系统：先把灵感记录下来，再按主题沉淀成素材库，最后根据不同平台的用户习惯重新组织表达。

对我来说，最大的收获有三点：
1. 内容创作不能只靠临时灵感，更需要稳定的输入、整理和复盘流程。
2. 同一篇内容发到不同平台时，标题、结构和语气都要做适配。
3. 如果提前准备好标签、摘要和发布记录，后续复用内容会轻松很多。

接下来我会把这套方法用在课程笔记、产品更新和活动复盘中，也希望它能帮助更多创作者减少重复劳动，把时间留给真正有价值的表达。`;

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
  const [toastMessage, setToastMessage] = useState('');
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
  const publishDisabledReason = !trimmedContent
    ? '请先输入内容'
    : selectedPlatformIds.length === 0
      ? '请至少选择一个发布平台'
      : '';
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
    if (!toastMessage) {
      return;
    }

    const timer = window.setTimeout(() => setToastMessage(''), 3000);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

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

  function handleFillExample() {
    setPublishedOnce(false);
    setSourceContent(EXAMPLE_CONTENT);
    setContentError('');
  }

  function handleClearContent() {
    setPublishedOnce(false);
    setSourceContent('');
    setContentError('');
  }

  function handleSelectAllPlatforms() {
    setPublishedOnce(false);
    setSelectedPlatformIds(platformAdapters.map((adapter) => adapter.id));
    setPlatformError('');
  }

  function handleClearPlatformSelection() {
    setPublishedOnce(false);
    setSelectedPlatformIds([]);
  }

  function handlePublish() {
    if (!trimmedContent) {
      setContentError('请先输入内容，再进行模拟发布。');
      return;
    }

    if (selectedPlatformIds.length === 0) {
      setPlatformError('请至少选择一个发布平台。');
      return;
    }

    const record: PublishRecord = {
      id: createRecordId(),
      sourceContent: trimmedContent,
      results: previews,
      createdAt: new Date().toISOString(),
    };

    setHistory(savePublishRecord(record));
    setToastMessage('发布成功，已保存到历史记录');
    setPublishedOnce(true);
  }

  function handleClearHistory() {
    const confirmed = window.confirm('确认清空全部发布历史吗？此操作不会影响当前输入内容。');
    if (!confirmed) {
      return;
    }

    clearPublishHistory();
    setHistory([]);
  }

  return (
    <div className="min-h-screen text-slate-900">
      <Header />
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <WorkflowSteps currentStep={currentStep} />

        <div className="mt-5 grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <ContentInput
              error={contentError}
              metrics={sourceMetrics}
              onChange={handleContentChange}
              onClear={handleClearContent}
              onFillExample={handleFillExample}
              value={sourceContent}
            />

            <PlatformSelector
              adapters={platformAdapters}
              error={platformError}
              onClearSelection={handleClearPlatformSelection}
              onSelectAll={handleSelectAllPlatforms}
              onToggle={handlePlatformToggle}
              selectedPlatformIds={selectedPlatformIds}
            />

            <section className="animate-fade-in-up rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">发布操作</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">确认预览后进行本地模拟发布。</p>
                </div>
                <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                  模拟发布
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <MetricsCard helper="已选择" label="平台数" tone="sky" value={selectedPlatformIds.length} />
                <MetricsCard helper="实时生成" label="版本数" tone="emerald" value={previews.length} />
              </div>

              {!canPublish ? (
                <p
                  className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
                  id="publish-disabled-reason"
                >
                  {publishDisabledReason}
                </p>
              ) : null}

              <button
                aria-describedby={!canPublish ? 'publish-disabled-reason' : undefined}
                className="mt-4 w-full rounded-lg bg-cyan-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                disabled={!canPublish}
                onClick={handlePublish}
                type="button"
              >
                模拟发布并保存历史
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
