import type { AnalysisRecord } from '../../../modules/analytics/dto/analysisReport';

interface ReportHeaderProps {
  report: AnalysisRecord;
}

export function ReportHeader({ report }: ReportHeaderProps) {
  const dateStr = new Date(report.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const timeStr = new Date(report.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="relative bg-card rounded-xl border border-border p-8 mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6 shadow-sm">
      <div className="max-w-2xl">
        <h1 className="font-headline text-3xl font-bold text-primary mb-4">
          {report.analysisTitle}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 text-xs font-bold font-label bg-primary-700 text-white rounded-full">
            Match Score {report.matchScore}%
          </span>
          {report.needsImprovement && (
            <span className="px-3 py-1 text-xs font-bold font-label bg-blue-50 text-blue-700 rounded-full">
              Needs Improvement: {report.needsImprovement}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between gap-2 shrink-0 h-full">
        {report.resumeFileUrl && (
          <a href={report.resumeFileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-base text-secondary hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            View Resume &rarr;
          </a>
        )}
        <span className="text-xs font-body text-muted mt-16">Analyzed: {dateStr} &middot; {timeStr}</span>
      </div>
    </div>
  );
}
