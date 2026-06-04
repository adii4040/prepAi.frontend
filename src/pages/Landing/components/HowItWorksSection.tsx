const steps = [
  {
    number: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Upload Resume',
    description: 'We parse your experience for hard data, not just keywords.',
  },
  {
    number: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: 'Add JD',
    description: "Tell us what role you're hunting. We'll find the hidden requirements.",
  },
  {
    number: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Describe Yourself',
    description: 'How do you talk about your work? Your narrative matters as much as your CV.',
  },
  {
    number: '04',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: 'Get Your Report',
    description: 'A 6-section breakdown of your gaps and a plan to close them.',
  },
]

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-tertiary py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-secondary mb-4">
            Four inputs. One brutally honest report.
          </h2>
          <p className="text-neutral text-base max-w-lg mx-auto">
            We don't do generic feedback. By combining these four pillars, we build a simulation of
            your real standing in the market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="text-primary">{step.icon}</div>
                <span className="font-label text-4xl font-bold text-border select-none">
                  {step.number}
                </span>
              </div>
              <h3 className="font-headline text-base font-semibold text-secondary mb-2">
                {step.title}
              </h3>
              <p className="text-neutral text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}