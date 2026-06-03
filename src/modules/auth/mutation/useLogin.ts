import { useMutation } from '@tanstack/react-query';
import { AuthRoutes } from '../constants';
import { MUTATION_LOGIN_USER } from '../constants/cacheKeys';
import type { LoginRequestDto } from '../dto/loginDto';
import { apiService } from '../../../services/api';

export const useLogin = () => {
    return useMutation({
        mutationKey: [MUTATION_LOGIN_USER],
        mutationFn: async (payload: LoginRequestDto) => {
            const response = await apiService.post(AuthRoutes.LOGIN_USER, payload);
            return response;
        }
    });
}