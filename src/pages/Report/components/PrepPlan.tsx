import type { PreparationPlan } from '../../../modules/analytics/dto/analysisReport';

interface PrepPlanProps {
  plan: PreparationPlan;
}

export function PrepPlan({ plan }: PrepPlanProps) {
  if (!plan) return null;

  return (
    <div className="bg-card rounded-xl border border-border p-8 mb-12 shadow-sm">
      <div className="mb-8">
        <h2 className="font-headline text-[1.65rem] font-bold text-primary mb-3">Your Prep Plan</h2>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-[9px] font-label font-bold bg-blue-50 text-blue-700 rounded uppercase">
            {plan.timelineType === 'custom_date' ? 'Custom Date Plan' : plan.timelineType}
          </span>
          <span className="px-2 py-1 text-[9px] font-label font-bold bg-blue-50 text-blue-700 rounded uppercase">
            {plan.daysRemaining} {plan.daysRemaining === 1 ? 'Day' : 'Days'} &middot; Starts Today
          </span>
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-border z-0">
        {plan.dailySchedule.map((day, index) => (
          <div key={day._id} className="relative flex items-start gap-6 z-10">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-headline font-bold shrink-0 ${
              index === 0 ? 'bg-primary text-white' : 'bg-primary-50 text-primary-600'
            }`}>
              {day.dayNumber}
            </div>
            <div className="pt-1">
              <h3 className="font-headline font-bold text-primary mb-1">{day.focusTopic}</h3>
              <div className="space-y-2 mt-3">
                {day.actionItems.map((action, actionIndex) => (
                  <label key={actionIndex} className="flex items-start gap-3 text-sm font-body text-primary-700 cursor-pointer">
                    <input type="checkbox" className="mt-[2px] w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                    {action}
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
