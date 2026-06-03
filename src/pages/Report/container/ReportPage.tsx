import { useParams } from 'react-router-dom';
import { useGetAnalyticReport } from '../../../modules/analytics/query/useGetAnalyticReport';
import { InterviewQuestions, MarketIntelligence, PrepPlan, ReportHeader, SkillGaps } from "../components";

export default function ReportPage() {
  const { analysisId } = useParams();
  const { data: report, isLoading, isError } = useGetAnalyticReport(analysisId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-app flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="min-h-screen bg-app flex justify-center items-center">
        <div className="text-danger text-center font-medium">Failed to load report. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app pb-24">
      <div className="w-full max-w-[1000px] mx-auto pt-14 px-4 sm:px-6 lg:px-8">
        <ReportHeader report={report} />
        <MarketIntelligence marketSnapshot={report.marketSnapshot} />
        <SkillGaps gaps={report.skillGaps || []} />
        {report.preparationPlan && <PrepPlan plan={report.preparationPlan} />}
        <InterviewQuestions 
          technical={report.topTechnicalQuestions || []} 
          behavioral={report.topBehavioralQuestions || []} 
        />
      </div>
    </div>
  );
}