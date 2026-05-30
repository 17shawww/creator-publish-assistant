interface MetricsCardProps {
  label: string;
  value: string | number;
  helper?: string;
  tone?: 'slate' | 'sky' | 'emerald' | 'amber';
}

const toneClassNames = {
  slate: 'border-slate-200 bg-slate-50 text-slate-900',
  sky: 'border-cyan-200 bg-cyan-50 text-cyan-900',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  amber: 'border-amber-200 bg-amber-50 text-amber-900',
};

export function MetricsCard({ label, value, helper, tone = 'slate' }: MetricsCardProps) {
  return (
    <div className={`rounded-lg border p-4 shadow-sm ${toneClassNames[tone]}`}>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      {helper ? <p className="mt-1 text-xs leading-5 text-slate-500">{helper}</p> : null}
    </div>
  );
}
