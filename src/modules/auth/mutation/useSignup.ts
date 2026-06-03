import type { SignupDto } from '../dto/signupDto';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../utils/apiClient';
import { MUTATION_REGISTER_USER } from '../constants/cacheKeys';
import {AuthRoutes} from '../constants';


export const useSignup = () => {
    return useMutation({
        mutationKey: [MUTATION_REGISTER_USER],
        mutationFn: async (payload: SignupDto) => {
            const response = await apiClient.post(AuthRoutes.REGISTER_USER, payload);
            return response.data;
        }
    });
}