
import { useState, useCallback } from 'react';
import AnalysisForm from '../components/AnalysisForm';
import AnalysisLoader from '../components/AnalysisLoader';

const AnalysisPage: React.FC = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSubmittingChange = useCallback((submitting: boolean) => {
        setIsAnalyzing(submitting);
    }, []);

    if (isAnalyzing) {
        return (
            <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 mx-[18%]">
                <AnalysisLoader />
            </main>
        );
    }

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 mx-[18%] ">
            <div className="mx-auto flex w-full flex-col items-center">
                <div className="max-w-3xl text-center">
                    <h1 className="text-balance text-[clamp(2.25rem,4vw,4rem)] font-bold tracking-[-0.04em] text-[#111827]">
                        Let&apos;s decode your fit.
                    </h1>
                    <p className="mt-3 text-[clamp(1rem,1.5vw,1.125rem)] text-[#6b7280]">
                        We&apos;ll match your resume against the job market in real time.
                    </p>
                </div>

                <div className="mt-8 w-full">
                    <AnalysisForm onSubmittingChange={handleSubmittingChange} />
                </div>
            </div>
        </main>
    );
};

export default AnalysisPage;
