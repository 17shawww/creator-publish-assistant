interface WorkflowStepsProps {
  currentStep: number;
}

const steps = ['输入原始内容', '选择发布平台', '预览适配结果', '模拟发布'];

export function WorkflowSteps({ currentStep }: WorkflowStepsProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isComplete = currentStep > stepNumber;

          return (
            <div
              className={`rounded-lg border p-3 transition ${
                isActive
                  ? 'border-sky-300 bg-sky-50'
                  : isComplete
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-slate-200 bg-slate-50'
              }`}
              key={step}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  isActive
                    ? 'bg-sky-600 text-white'
                    : isComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-slate-500'
                }`}
              >
                {stepNumber}
              </div>
              <p className="mt-3 text-sm font-medium text-slate-800">{step}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
