import { useMutation } from "@tanstack/react-query";
import { apiService } from "../../../services/api";
import { AuthRoutes } from "../constants/routes";
import { MUTATION_LOGOUT_USER } from "../constants/cacheKeys";
import { queryClient } from "../../../services/queryClient";

export const useLogout = () => {
    return useMutation({
        mutationKey: [MUTATION_LOGOUT_USER],
        mutationFn: async () => {
            const response = await apiService.post(AuthRoutes.LOGOUT_USER);
            return response;
        },
        onSuccess: () => {
            queryClient.clear();
        }
    });
}