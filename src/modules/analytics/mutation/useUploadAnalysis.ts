import { useMutation } from "@tanstack/react-query";
import { apiService } from "../../../services/api";
import { AnalysisApiRoutes, MUTATION_ANALYZE_RESUME } from "../contants";
import type { UploadResumeAnalysisReqDto } from "../dto/uploadResume";


export const useUploadAnalysis = () =>
    useMutation({
        mutationKey: [MUTATION_ANALYZE_RESUME],
        mutationFn: async (
            payload: UploadResumeAnalysisReqDto
        ) => {

            console.log('payload', payload)
            const formData = new FormData();

            formData.append(
                "resume",
                payload.resume
            );

            formData.append(
                "selfDescription",
                payload.selfDescription
            );

            formData.append(
                "jobDescription",
                payload.jobDescription
            );

            if (payload.interviewDate) {
                formData.append(
                    "interviewDate",
                    payload.interviewDate.toISOString()
                );
            }

            return apiService.post(
                AnalysisApiRoutes.UPLOAD_RESUME,
                formData
            );
        }
    });