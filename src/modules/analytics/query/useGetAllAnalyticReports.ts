import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../../services/api";
import { AnalysisApiRoutes, QUERY_GET_ALL_ANALYSES } from "../contants";
import type { GetAllAnalyticReportsResDto, AnalysisRecord } from "../dto/analysisReport";

export const useGetAllAnalyticReports = () =>
    useQuery<AnalysisRecord[], Error>({
        queryKey: [QUERY_GET_ALL_ANALYSES],
        queryFn: async () => {
            const response = await apiService.get<GetAllAnalyticReportsResDto>(
                AnalysisApiRoutes.GET_ALL_ANALYSES
            );
            return response.data.analysisRecords;
        },
    });
