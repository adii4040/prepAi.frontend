import { useState, useEffect } from 'react';

const ANALYSIS_STEPS = [
  'Extracting resume content...',
  'Analyzing job description...',
  'Fetching live market intelligence...',
  'Synthesizing market insights...',
  'Running full profile analysis...',
  'Finalizing your report...',
];

const DEEP_SCAN_MESSAGES = [
  'Our semantic analysis engine is currently mapping your "Action Verbs" to the "Core Competencies" required for Senior Executive positions.',
  'Cross-referencing your technical skills against 2,400+ active job postings in your target market.',
  'Evaluating keyword density and contextual relevance across your professional narrative.',
  'Comparing your career trajectory against top-performing candidates in similar roles.',
  'Analyzing industry-specific language patterns to optimize your market positioning.',
  'Generating personalized interview preparation based on identified skill gaps.',
];

// Each step takes roughly this many ms to "complete" visually
const STEP_INTERVAL = 8000;

interface AnalysisLoaderProps {
  elapsedMs?: number;
}

export default function AnalysisLoader({ elapsedMs }: AnalysisLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [deepScanIndex, setDeepScanIndex] = useState(0);

  // Auto-advance steps based on elapsed time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, STEP_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Rotate deep scan messages every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDeepScanIndex((prev) => (prev + 1) % DEEP_SCAN_MESSAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-fadeIn">
      {/* Header */}
      <h1 className="font-headline text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-tight text-[#111827] mb-3 text-center">
        Unmasking your profile...
      </h1>
      <p className="text-[#6b7280] text-center max-w-lg mb-12 text-base">
        Our AI is dissecting your professional narrative against current market demands.
      </p>

      {/* Steps Timeline */}
      <div className="w-full max-w-md mb-10">
        <div className="space-y-0">
          {ANALYSIS_STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex items-center gap-4 py-3">
                {/* Icon */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <div className="w-7 h-7 rounded-full bg-[#3f4b63] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : isActive ? (
                    <div className="w-7 h-7 rounded-full border-2 border-[#3f4b63] flex items-center justify-center relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3f4b63] animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border-2 border-[#d1d5db]" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[15px] transition-colors duration-300 ${
                    isCompleted
                      ? 'text-[#111827] font-medium'
                      : isActive
                        ? 'text-[#111827] font-semibold'
                        : 'text-[#9ca3af]'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time estimate */}
      <p className="text-[#9ca3af] italic text-sm mb-8">
        This usually takes 45–60 seconds. Good things take time.
      </p>

      {/* Deep Scan Card */}
      <div className="w-full max-w-lg rounded-xl border border-[#d8dbe1] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 rounded-full border-2 border-[#3f4b63] border-t-transparent animate-spin" />
          <span className="font-[family-name:var(--font-label)] text-[10px] font-bold tracking-widest text-[#3f4b63] uppercase">
            Deep Scan Active
          </span>
        </div>
        <p
          className="text-[13px] text-[#4b5563] leading-relaxed transition-opacity duration-500"
          key={deepScanIndex}
          style={{ animation: 'fadeInUp 0.5s ease-out' }}
        >
          {DEEP_SCAN_MESSAGES[deepScanIndex]}
        </p>
      </div>

      {/* Inline keyframe for fade-in of messages */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
