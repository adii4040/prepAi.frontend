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
        <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-28">
            {/* Improved layout transitions across breakpoints */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                {/* Left Column Content Area */}
                <div className="text-center lg:text-left lg:col-span-6 xl:col-span-7 flex flex-col items-center lg:items-start">
                    <span className="inline-flex items-center gap-2 font-label text-xs text-neutral border border-border rounded-full px-4 py-1.5 mb-6 md:mb-8">
                        AI-Powered Job Readiness Analysis
                    </span>

                    {/* Responsive text sizing that scales elegantly from mobile viewports */}
                    <h1 className="font-headline text-4xl sm:text-5xl xl:text-6xl font-bold text-secondary leading-[1.1] mb-6 tracking-tight">
                        Stop guessing.<br />
                        <em className="not-italic text-primary">Know exactly</em> where<br />
                        you stand.
                    </h1>

                    <p className="text-neutral text-base sm:text-lg leading-relaxed mb-8 md:mb-10 max-w-md mx-auto lg:mx-0">
                        PrepAI analyzes your resume, your self-description, and the
                        real job market — then tells you precisely what's missing
                        and how to fix it before your interview.
                    </p>

                    {/* Aligned responsive interactive controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto flex-wrap">
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-600 transition-colors text-white font-semibold px-6 py-3.5 rounded-lg text-sm w-full sm:w-auto shadow-sm"
                        >
                            Analyze My Resume →
                        </Link>
                        <Link
                            to="/signup"
                            className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary/40 transition-colors text-secondary font-semibold px-6 py-3.5 rounded-lg text-sm w-full sm:w-auto"
                        >
                            See How It Works
                        </Link>
                    </div>

                    {/* Feature badge elements */}
                    <div className="flex flex-row items-center justify-center lg:justify-start gap-x-6 gap-y-3 mt-10 md:mt-12 flex-wrap border-t border-border/60 pt-6 w-full max-w-md lg:max-w-none">
                        {['No fluff. Real gaps.', 'Live market data.', 'Day-by-day prep plan.'].map((item) => (
                            <span key={item} className="font-label text-xs text-neutral flex items-center gap-1.5">
                                <span className="text-primary">✦</span>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right Column Visualization Area */}
                <div className="w-full lg:col-span-6 xl:col-span-5 mt-4 lg:mt-0">
                    {/* Replaced fixed width tracking with smooth grid-flex system */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 max-w-2xl lg:max-w-md mx-auto lg:ml-auto lg:mr-0 w-full">
                        {examples.map((example) => (
                            <div
                                key={example.role}
                                className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between"
                            >
                                <div>
                                    {/* Match score row */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="min-w-0 pr-2">
                                            <p className="font-label text-[10px] sm:text-xs text-neutral tracking-widest uppercase mb-1 truncate">
                                                Match Strength
                                            </p>
                                            <p className="font-headline text-base font-semibold text-secondary truncate">
                                                {example.role}
                                            </p>
                                        </div>
                                        <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
                                                <circle cx="28" cy="28" r="24" fill="none" stroke="#E5E5E3" strokeWidth="4" />
                                                <circle
                                                    cx="28" cy="28" r="24" fill="none"
                                                    stroke="#334155" strokeWidth="4"
                                                    strokeDasharray={`${(example.score / 100) * 150.8} 150.8`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <span className="font-label text-[11px] sm:text-xs font-bold text-secondary">
                                                {example.score}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="h-px bg-border mb-4" />

                                    {/* Gaps */}
                                    <p className="font-label text-[10px] sm:text-xs text-neutral tracking-widest uppercase mb-2.5">
                                        Critical Gaps Identified
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {example.gaps.map((gap) => (
                                            <span
                                                key={gap.label}
                                                className={`font-label text-[11px] sm:text-xs border rounded-full px-2.5 py-0.5 sm:py-1 ${severityStyles[gap.severity]}`}
                                            >
                                                {severityIcon[gap.severity]}{gap.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="h-px bg-border mb-4" />

                                    {/* Day 1 Focus Block */}
                                    <div className="bg-tertiary rounded-xl p-3.5 sm:p-4 flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-label text-[11px] sm:text-xs font-semibold text-secondary mb-1 truncate">
                                                {example.day1.focus}
                                            </p>
                                            <p className="text-[11px] sm:text-xs text-neutral leading-relaxed">
                                                {example.day1.task}
                                            </p>
                                        </div>
                                        <span className="text-primary text-sm sm:text-base flex-shrink-0 mt-0.5">✦</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}