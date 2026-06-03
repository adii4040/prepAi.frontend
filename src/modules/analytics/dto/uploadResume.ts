export interface UploadResumeAnalysisReqDto {
    resume: File;
    selfDescription: string;
    jobDescription: string;
    interviewDate?: Date | undefined
}