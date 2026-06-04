import { Link } from 'react-router-dom'

export const HeroSection = () => {
    const examples = [
        {
            role: 'Senior Data Scientist',
            score: 72,
            gaps: [
                { label: 'PyTorch Deployment', severity: 'high' },
                { label: 'CI/CD Pipelines', severity: 'medium' },
                { label: 'Stakeholder Management', severity: 'medium' },
            ],
            day1: {
                focus: 'Day 1 Focus: Technical Core',
                task: 'Review 5 key architectural tradeoffs for distributed ML systems mentioned in the JD.',
            },
        },
        {
            role: 'Frontend Developer',
            score: 88,
            gaps: [
                { label: 'React Testing Library', severity: 'medium' },
                { label: 'Web Accessibility', severity: 'low' },
            ],
            day1: {
                focus: 'Day 1 Focus: Testing Fundamentals',
                task: 'Write unit and integration tests for 2 components using React Testing Library.',
            },
        },
    ]

    const severityStyles: Record<string, string> = {
        high: 'bg-danger/8 text-danger border-danger/20',
        medium: 'bg-primary-50 text-primary border-primary/20',
        low: 'bg-success/8 text-success border-success/20',
    }

    const severityIcon: Record<string, string> = {
        high: '▲ ',
        medium: '',
        low: '',
    }
    return (
        <section id="home" className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                <div>
                    <span className="inline-flex items-center gap-2 font-label text-xs text-neutral border border-border rounded-full px-4 py-1.5 mb-8">
                        AI-Powered Job Readiness Analysis
                    </span>

                    <h1 className="font-headline text-5xl lg:text-6xl font-bold text-secondary leading-[1.05] mb-6">
                        Stop guessing.<br />
                        <em className="not-italic text-primary">Know exactly</em> where<br />
                        you stand.
                    </h1>

                    <p className="text-neutral text-lg leading-relaxed mb-10 max-w-md">
                        PrepAI analyzes your resume, your self-description, and the
                        real job market — then tells you precisely what's missing
                        and how to fix it before your interview.
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 transition-colors text-white font-semibold px-6 py-3.5 rounded-lg text-sm"
                        >
                            Analyze My Resume →
                        </Link>
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 border border-border hover:border-primary/40 transition-colors text-secondary font-semibold px-6 py-3.5 rounded-lg text-sm">

                            See How It Works
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 mt-8 flex-wrap">
                        {['No fluff. Real gaps.', 'Live market data.', 'Day-by-day prep plan.'].map((item) => (
                            <span key={item} className="font-label text-xs text-neutral flex items-center gap-1.5">
                                <span className="text-primary">✦</span>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:block">
                    <div className="flex flex-col gap-4 max-w-sm ml-auto">
                        {examples.map((example) => (
                            <div
                                key={example.role}
                                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
                            >
                                {/* Match score row */}
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <p className="font-label text-xs text-neutral tracking-widest uppercase mb-1">
                                            Match Strength
                                        </p>
                                        <p className="font-headline text-base font-semibold text-secondary">
                                            {example.role}
                                        </p>
                                    </div>
                                    <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
                                            <circle cx="28" cy="28" r="24" fill="none" stroke="#E5E5E3" strokeWidth="4" />
                                            <circle
                                                cx="28" cy="28" r="24" fill="none"
                                                stroke="#334155" strokeWidth="4"
                                                strokeDasharray={`${(example.score / 100) * 150.8} 150.8`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="font-label text-xs font-bold text-secondary">
                                            {example.score}%
                                        </span>
                                    </div>
                                </div>

                                <div className="h-px bg-border mb-4" />

                                {/* Gaps */}
                                <p className="font-label text-xs text-neutral tracking-widest uppercase mb-3">
                                    Critical Gaps Identified
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {example.gaps.map((gap) => (
                                        <span
                                            key={gap.label}
                                            className={`font-label text-xs border rounded-full px-3 py-1 ${severityStyles[gap.severity]}`}
                                        >
                                            {severityIcon[gap.severity]}{gap.label}
                                        </span>
                                    ))}
                                </div>

                                <div className="h-px bg-border mb-4" />

                                <div className="bg-tertiary rounded-xl p-4 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-label text-xs font-semibold text-secondary mb-1">
                                            {example.day1.focus}
                                        </p>
                                        <p className="text-xs text-neutral leading-relaxed">
                                            {example.day1.task}
                                        </p>
                                    </div>
                                    <span className="text-primary text-base flex-shrink-0 mt-0.5">✦</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section >
    )
}