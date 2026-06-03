import type { MarketSnapshot } from '../../../modules/analytics/dto/analysisReport';

interface MarketIntelligenceProps {
  marketSnapshot: MarketSnapshot;
}

export function MarketIntelligence({ marketSnapshot }: MarketIntelligenceProps) {
  if (!marketSnapshot) return null;

  return (
    <div className="relative bg-card rounded-xl border border-border p-8 mb-12 shadow-sm mt-12">
      <div className="flex items-center gap-2 mb-6 text-primary">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h2 className="font-label text-[11px] font-bold tracking-widest text-primary-600 uppercase">Live Market Intelligence</h2>
      </div>

      <p className="text-lg text-primary font-body mb-8 max-w-full leading-relaxed">
        {marketSnapshot.summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border/60 pt-8">
        {marketSnapshot.trendingTechnologies && marketSnapshot.trendingTechnologies.length > 0 && (
          <div>
            <h3 className="text-[11px] font-label font-bold uppercase tracking-widest text-primary mb-4">Trending Tech</h3>
            <div className="flex flex-wrap gap-2">
              {marketSnapshot.trendingTechnologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 text-[11px] font-serif border border-border rounded-sm text-neutral">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {marketSnapshot.industryExpectations && marketSnapshot.industryExpectations.length > 0 && (
          <div>
            <h3 className="text-[11px] font-label font-bold uppercase tracking-widest text-primary mb-4">Industry Specs</h3>
            <ul className="space-y-3">
              {marketSnapshot.industryExpectations.map((spec, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] font-body text-primary-600">
                  <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {marketSnapshot.marketGaps && marketSnapshot.marketGaps.length > 0 && (
          <div>
            <h3 className="text-[11px] font-label font-bold uppercase tracking-widest text-primary mb-4">Market Gaps</h3>
            <ul className="space-y-3">
              {marketSnapshot.marketGaps.map((gap, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] font-body text-danger">
                  <svg className="w-4 h-4 text-danger shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
