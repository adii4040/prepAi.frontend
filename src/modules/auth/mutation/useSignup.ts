import type { SignupDto } from '../dto/signupDto';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_REGISTER_USER } from '../constants/cacheKeys';
import { AuthRoutes } from '../constants';
import { apiService } from '../../../services/api';


export const useSignup = () => {
    return useMutation({
        mutationKey: [MUTATION_REGISTER_USER],
        mutationFn: async (payload: SignupDto) => {
            const response = await apiService.post(AuthRoutes.REGISTER_USER, payload);
            return response;
        }
    });
}