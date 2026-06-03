import { useNavigate } from 'react-router-dom';

interface AnalysisCardProps {
  id: string;
  title: string;
  status?: string;
  score: number;
  description: string;
  date: string;
}

export function AnalysisCard({ id, title, status, score, description, date }: AnalysisCardProps) {
  const navigate = useNavigate();
  // Using match score for coloring logic if status isn't clear
  const isOptimized = score >= 85 || status === 'less' || status === 'optimized';

  return (
    <div className="bg-card rounded-xl border border-border p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <h3 className="font-headline text-[1.35rem] font-medium text-secondary flex-1 line-clamp-2" title={title}>{title}</h3>
        <span className={`px-2 py-1 text-[10px] font-label font-bold tracking-wider rounded uppercase shrink-0 ${
          isOptimized 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-red-100 text-danger'
        }`}>
          {isOptimized ? 'Optimized' : 'Needs Improvement'}
        </span>
      </div>

      <div className="flex items-baseline gap-2 mt-1">
        <span className="font-headline text-5xl font-bold text-secondary">{score}%</span>
        <span className="font-label text-[10px] font-bold tracking-widest text-muted uppercase">Match Score</span>
      </div>

      <p className="text-[13px] text-muted font-serif leading-relaxed mt-2 flex-grow line-clamp-3" title={description}>
        {description}
      </p>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/50">
        <span className="text-xs text-muted font-body">Generated {date}</span>
        <button 
          onClick={() => navigate(`/report/${id}`)}
          className="text-sm font-semibold text-secondary flex items-center gap-1 hover:text-primary transition-colors"
        >
          View Full Report <span className="text-lg leading-none mb-[2px]">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
