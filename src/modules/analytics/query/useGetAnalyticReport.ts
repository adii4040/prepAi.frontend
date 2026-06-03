import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";
import { AnalysisApiRoutes, QUERY_GET_ANALYSIS } from "../contants";
import type { GetAnalyticReportResDto, AnalysisRecord } from "../dto/analysisReport";

export const useGetAnalyticReport = (analysisId: string | undefined) =>
    useQuery<AnalysisRecord, Error>({
        queryKey: [QUERY_GET_ANALYSIS, analysisId],
        queryFn: async () => {
            if (!analysisId) {
                throw new Error("analysisId is required");
            }
            const response = await apiService.get<GetAnalyticReportResDto>(
                AnalysisApiRoutes.GET_ANALYSIS(analysisId)
            );
            return response.data.analysisRecord;
        },
        enabled: !!analysisId,
    });
