interface WorkflowStepsProps {
  currentStep: number;
}

const steps = ['输入原始内容', '选择发布平台', '预览适配结果', '模拟发布'];

export function WorkflowSteps({ currentStep }: WorkflowStepsProps) {
  return (
    <section className="animate-fade-in-up rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isComplete = currentStep > stepNumber;

          return (
            <div className="flex items-center gap-2" key={step}>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                  isActive
                    ? 'bg-cyan-700 text-white'
                    : isComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isComplete ? '✓' : stepNumber}
              </span>
              <span
                className={`text-sm font-medium transition ${
                  isActive
                    ? 'text-cyan-800'
                    : isComplete
                      ? 'text-slate-700'
                      : 'text-slate-500'
                }`}
              >
                {step}
              </span>
              {stepNumber < steps.length ? <span className="hidden h-px w-8 bg-slate-200 sm:block" /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
