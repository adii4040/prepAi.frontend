
import AnalysisForm from '../components/AnalysisForm';

const AnalysisPage: React.FC = () => {
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
                    <AnalysisForm />
                </div>
            </div>
        </main>
    );
};

export default AnalysisPage;
