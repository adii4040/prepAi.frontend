import type { SkillGap } from '../../../modules/analytics/dto/analysisReport';

interface SkillGapsProps {
  gaps: SkillGap[];
}

const severityConfig = {
  high: { label: 'High Severity', className: 'bg-red-50 text-danger' },
  medium: { label: 'Medium Severity', className: 'bg-orange-50 text-orange-600' },
  low: { label: 'Low Severity', className: 'bg-blue-50 text-blue-700' },
};

export function SkillGaps({ gaps }: SkillGapsProps) {
  if (!gaps || gaps.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="font-label text-[11px] font-bold tracking-widest text-muted uppercase mb-4 ml-1">Skill Gaps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gaps.map((gap) => {
          const severity = severityConfig[gap.severity as keyof typeof severityConfig] ?? severityConfig.low;
          return (
            <div key={gap._id} className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <h3 className="font-headline text-lg font-bold text-primary">{gap.skillName}</h3>
                <span className={`px-2 py-0.5 text-[9px] font-label font-bold rounded-full uppercase ${severity.className}`}>
                  {severity.label}
                </span>
              </div>
              <p className="font-serif text-[13px] text-muted italic">{gap.context}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
