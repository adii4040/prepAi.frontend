import { useNavigate } from 'react-router-dom';
import { AnalysisCard } from '../components/AnalysisCard';
import { useGetAllAnalyticReports } from '../../../modules/analytics/query/useGetAllAnalyticReports';

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: analyses, isLoading, isError } = useGetAllAnalyticReports();

  return (
    <div className="min-h-screen bg-app flex justify-center">
      <div className="w-full mx-[18%] pt-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="font-headline text-[2.75rem] font-bold text-primary mb-2 tracking-tight">Your Analyses</h1>
            <p className="font-body text-muted text-base">Track your progress across every role you've applied for.</p>
          </div>
          <button
            onClick={() => navigate('/analyze')}
            className="bg-primary hover:bg-primary-600 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors flex items-center gap-2">
            New Analysis <span className="text-xl leading-none mb-[2px]">&rarr;</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-border/80 mb-8">
          <button className="pb-3 border-b-[3px] border-secondary font-label text-[11px] font-bold tracking-widest text-secondary uppercase">
            All Analyses
          </button>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-danger">
            Failed to load analyses. Please try again.
          </div>
        ) : analyses?.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border">
            <h3 className="text-xl font-headline font-semibold text-secondary mb-2">No analyses yet</h3>
            <p className="text-muted mb-6">Create your first resume analysis to get started.</p>
            <button
              onClick={() => navigate('/analyze')}
              className="bg-primary hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Analyze a Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {analyses?.map((analysis) => (
              <AnalysisCard 
                key={analysis._id} 
                id={analysis._id}
                title={analysis.analysisTitle}
                score={analysis.matchScore}
                status={analysis.needsImprovement}
                description={analysis.marketSnapshot?.summary || "No description available"}
                date={new Date(analysis.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}