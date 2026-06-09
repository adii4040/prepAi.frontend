const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    label: 'Match Score',
    description: 'A quantitative look at how you align with current market expectations for your specific seniority.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    label: 'Skill Gap Analysis',
    description: 'We identify the "Silent Killers" — the small missing skills that cause immediate rejections during technical screening.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: 'Live Market Intelligence',
    description: 'Compare your profile against data from thousands of successful hires in similar roles last month.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    label: 'Day-by-Day Prep Plan',
    description: 'A customized calendar of exactly what to study, review, and rehearse before your big day.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    label: 'Tech Questions',
    description: 'AI-generated technical probes based specifically on your experience vs. JD requirements.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: 'Behavioral Questions',
    description: 'Master the "STAR" method with questions designed to stress-test your specific leadership and culture-fit claims.',
  },
]

const FeatureCard = ({ icon, label, description }: typeof features[0]) => (
  <div className="bg-card border border-border rounded-2xl p-7 hover:border-primary/20 hover:shadow-sm transition-all h-full">
    <div className="text-secondary opacity-50 mb-5">{icon}</div>
    <p className="font-label text-xs text-neutral tracking-widest uppercase mb-3">
      {label}
    </p>
    <p className="text-sm text-neutral leading-relaxed">
      {description}
    </p>
  </div>
)

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-app">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-secondary">
            The Intelligence You've Been Missing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 md:col-span-1">
            <FeatureCard {...features[0]} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FeatureCard {...features[1]} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-1 md:col-span-2">
            <FeatureCard {...features[2]} />
          </div>
          <div className="col-span-1 md:col-span-1">
            <FeatureCard {...features[3]} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1">
            <FeatureCard {...features[4]} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <FeatureCard {...features[5]} />
          </div>
        </div>

      </div>
    </section>
  )
}