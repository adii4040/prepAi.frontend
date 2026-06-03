import { useEffect, useMemo, useRef } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useUploadAnalysis } from '../../../modules/analytics/mutation/useUploadAnalysis';

type AnalysisFormValues = {
	resume: File | null;
	jobDescription: string;
	selfDescription: string;
	interviewDate: Date | string;
};

const MAX_JOB_DESCRIPTION_LENGTH = 5000;
const MAX_SELF_DESCRIPTION_LENGTH = 5000;

const initialValues: AnalysisFormValues = {
	resume: null,
	jobDescription: '',
	selfDescription: '',
	interviewDate: '',
};

interface AnalysisFormProps {
	onSubmittingChange?: (isSubmitting: boolean) => void;
}

const AnalysisForm = ({ onSubmittingChange }: AnalysisFormProps) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { mutateAsync: uploadResume, isPending: isSubmitting } = useUploadAnalysis();
	const navigate = useNavigate();

	useEffect(() => {
		onSubmittingChange?.(isSubmitting);
	}, [isSubmitting, onSubmittingChange]);

	const formik = useFormik<AnalysisFormValues>({
		initialValues,
		validate: (values) => {
			const errors: Partial<Record<keyof AnalysisFormValues, string>> = {};

			if (!values.resume) {
				errors.resume = 'A PDF resume is required';
			}

			if (!values.jobDescription.trim()) {
				errors.jobDescription = 'Job description is required';
			}

			return errors;
		},
		onSubmit: async (values, { resetForm }) => {

			console.log('Analysis form submitted:', values);
			try {
				const response = await uploadResume({
					resume: values.resume!,
					jobDescription: values.jobDescription,
					selfDescription: values.selfDescription,
					interviewDate: values.interviewDate as Date,
				});
				
				const analysisId = (response as any)?.data?.analysisRecord?._id;
				
				if (analysisId) {
					navigate(`/report/${analysisId}`);
				}
			} catch (error) {
				console.log(error);
			}
			resetForm();
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		}
	});

	const jobDescriptionCount = useMemo(
		() => formik.values.jobDescription.length,
		[formik.values.jobDescription]
	);


	const selfDescriptionCount = useMemo(
		() => formik.values.selfDescription.length,
		[formik.values.selfDescription]
	);

	const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files?.[0] ?? null;
		console.log(file);

		if (!file) {
			formik.setFieldValue('resume', null);
			return;
		}

		if (file.type !== 'application/pdf') {
			formik.setFieldError('resume', 'Only PDF files are supported');
			formik.setFieldValue('resume', null);
			event.currentTarget.value = '';
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			formik.setFieldError('resume', 'Max file size is 5MB');
			formik.setFieldValue('resume', null);
			event.currentTarget.value = '';
			return;
		}

		formik.setFieldValue('resume', file);
		formik.setFieldError('resume', "");

		console.log('filename: ', file.name)
		console.log('filetype: ', file.type)

		setTimeout(() => {
			console.log('resume value:', formik.values.resume);
			console.log('errors:', formik.errors);
		}, 100);

	};

	const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files?.[0] ?? null;

		if (!fileInputRef.current) {
			return;
		}

		const dataTransfer = new DataTransfer();

		if (file) {
			dataTransfer.items.add(file);
			fileInputRef.current.files = dataTransfer.files;
		}

		handleResumeChange({
			currentTarget: fileInputRef.current,
		} as React.ChangeEvent<HTMLInputElement>);
	};

	const preventDefault = (event: React.DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
	};

	return (
		<form onSubmit={formik.handleSubmit} noValidate>
			<div className="rounded-2xl border border-[#d8dbe1] bg-tertiary px-6 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:px-8 sm:py-6">
				<div className="grid gap-7">
					<label className="block">
						<div className="mb-3 flex items-center justify-between gap-4">
							<span className="font-[family-name:var(--font-label)] text-sm uppercase tracking-[0.08em] text-[#111827]">
								Resume Upload
							</span>
						</div>
						{
							formik.values.resume ?
								<div className="flex min-h-[210px] flex-col items-center justify-center rounded-xl border-2 border-solid border-green-200 bg-green-50/50 px-6 text-center transition-colors">
									<div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-green-100 text-green-600">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
											<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<path d="m9 15 2 2 4-4"></path>
										</svg>
									</div>
									<p className="text-[16px] font-medium leading-tight text-[#111827] max-w-full truncate px-4">
										{formik.values.resume.name}
									</p>
									<p className="mt-1 text-sm text-[#4b5563]">
										{Math.round(formik.values.resume.size / 1024)} KB
									</p>
									<button
										onClick={() => formik.setFieldValue('resume', null)}
										type="button"
										className="mt-4 rounded-md bg-white border border-gray-200 px-3 py-1.5 text-sm font-semibold text-red-500 shadow-sm hover:bg-gray-50 hover:text-red-600 transition-colors"
									>
										Remove file
									</button>
								</div>
								:
								<label
									onDragOver={preventDefault}
									onDragEnter={preventDefault}
									onDrop={handleDrop}
									className="flex min-h-[210px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#cfd4de] bg-tertiary px-6 text-center transition-colors hover:border-[#b9c2d2]"
								>
									<input
										ref={fileInputRef}
										type="file"
										accept="application/pdf"
										className="hidden"
										onChange={handleResumeChange}
										onBlur={formik.handleBlur}
										name="resume"
									/>

									<div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-[#334155]">
										<UploadIcon />
									</div>

									<p className="text-[20px] font-medium leading-tight text-[#111827]">
										Drop your resume here
									</p>
									<p className="mt-2 font-[family-name:var(--font-label)] text-[11px] uppercase tracking-[0.08em] text-[#6b7280]">
										PDF only · Max 5MB
									</p>
								</label>}

						{formik.touched.resume && formik.errors.resume ? (
							<p className="mt-2 text-sm text-[#b91c1c]">{formik.errors.resume}</p>
						) : null}
					</label>

					<div className="grid gap-3">
						<div className="flex items-start justify-between gap-4">
							<div>
								<span className="font-[family-name:var(--font-label)] text-sm uppercase tracking-[0.08em] text-[#111827]">
									Job Description
								</span>
							</div>
							<span className="rounded-full bg-[#ffe8e3] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-danger">
								Required
							</span>
						</div>

						<div className="relative">
							<textarea
								name="jobDescription"
								value={formik.values.jobDescription}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Paste the job listing requirements, responsibilities, and qualifications here..."
								rows={8}
								className="auth-input placeholder:font-mono placeholder:text-base  w-full resize-none rounded-xl border border-[#cfd4de] bg-white px-4 py-4 pr-16 text-[14px] leading-6 text-[#111827] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#94a3b8]"
								style={{ fontFamily: 'var(--font-body)' }}
							/>
							<span className="absolute bottom-3 right-3 text-sm text-black font-mono">
								{jobDescriptionCount} / {MAX_JOB_DESCRIPTION_LENGTH}
							</span>
						</div>

						{formik.touched.jobDescription && formik.errors.jobDescription ? (
							<p className="text-sm text-danger">{formik.errors.jobDescription}</p>
						) : null}
					</div>

					<div className="grid gap-3">
						<div className="flex items-start justify-between gap-4">
							<div>
								<span className="font-[family-name:var(--font-label)] text-sm uppercase tracking-[0.08em] text-[#111827]">
									About You
								</span>
								<p className="mt-1 text-sm text-[#6b7280]">
									Write in your own words — your background, strengths, and what you bring to this role.
								</p>
							</div>
							<span className="rounded-full bg-[#ffe8e3] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-danger">
								Required
							</span>
						</div>


						<div className='relative'>
							<textarea
								name="selfDescription"
								value={formik.values.selfDescription}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="e.g., I'm a Senior Product Designer with a focus on fintech systems..."
								rows={8}
								className="w-full auth-input min-h-[128px] resize-none rounded-xl border border-[#cfd4de] bg-white px-4 py-4 text-[14px] leading-6 text-[#111827] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#94a3b8] font-mono"
								style={{ fontFamily: 'var(--font-body)' }}
							/>
							<span className="absolute bottom-3 right-3 text-sm text-black font-mono">
								{selfDescriptionCount} / {MAX_SELF_DESCRIPTION_LENGTH}
							</span>
						</div>
					</div>

					<div className="grid gap-4 lg:grid-cols-[320px_1fr] lg:items-center">
						<div className="grid gap-3">
							<div className="flex items-start justify-between gap-4">
								<span className="font-[family-name:var(--font-label)] text-sm uppercase tracking-[0.08em] text-[#111827]">
									Interview Date
								</span>
								<span className="rounded-full bg-[#f0f0ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
									Optional
								</span>
							</div>

							<input
								name="interviewDate"
								type="date"
								min={new Date().toISOString().split('T')[0]}
								value={formik.values.interviewDate as string}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="auth-input h-12 rounded-xl border border-[#cfd4de] bg-white px-4 text-[14px] text-[#111827] outline-none transition-colors focus:border-[#94a3b8]"
								style={{ fontFamily: 'var(--font-body)' }}
							/>
						</div>

						<div className="hidden h-14 border-l-2 border-[#d1d5db] pl-5 text-[13px] italic leading-5 text-[#1f2937] lg:flex lg:items-center">
							“Providing an interview date allows our AI to prioritize time-sensitive market data for your specific role.”
						</div>
					</div>

					<div className="pt-3 text-center">
						<button
							type="submit"
							disabled={isSubmitting}
							className="inline-flex items-center gap-2 rounded-lg bg-[#3f4b63] px-5 py-3 text-[18px] font-semibold text-white shadow-[0_10px_20px_rgba(63,75,99,0.2)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
						>
							{isSubmitting ? 'Analyzing...' : 'Analyze My Resume'}
							<span aria-hidden="true" className="text-[20px] leading-none">→</span>
						</button>

						<p className="mt-4 font-[family-name:var(--font-label)] text-[11px] uppercase tracking-[0.08em] text-[#475569]">
							⚡ Takes about 45–60 seconds · Powered by Gemini AI + Live Market Data
						</p>
					</div>
				</div>
			</div>
		</form>
	);
};

const UploadIcon = () => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.9"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-6 w-6"
		aria-hidden="true"
	>
		<path d="M12 16V4" />
		<path d="m7 9 5-5 5 5" />
		<path d="M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" />
	</svg>
);

export default AnalysisForm;
