import api from '@/api';
import type { LoginRequest, RegisterRequest } from '../models';

export const authService = {
  login: async (credentials: LoginRequest) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  register: async (userData: RegisterRequest) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  forgotPassword: async (email: string) => {
    await api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (email: string) => {
    await api.post('/auth/reset-password', { email });
  },
};
