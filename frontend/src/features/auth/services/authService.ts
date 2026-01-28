import api from '@/api';
import type { LoginRequest, RegisterRequest } from '../models';
import type IUserResponse from '@/interfaces/auth/IUserResponse';

export const authService = {
  login: async (credentials: LoginRequest) => {
    const { data } = await api.post<string>('/auth/login', credentials);
    return data;
  },

  logout: async () => {
    await api.post<string>('/auth/logout');
  },

  register: async (userData: RegisterRequest) => {
    const { data } = await api.post<string>('/auth/register', userData);
    return data;
  },

  forgotPassword: async (email: string) => {
    const { data } = await api.post<string>('/auth/forgot-password', { email });
    return data;
  },

  resetPassword: async (email: string) => {
    const { data } = await api.post<string>('/auth/reset-password', { email });
    return data;
  },

  verifyUsername: async (username: string) => {
    const { data } = await api.get<boolean>('/user/check-username', {
      params: username,
    });
    return data;
  },

  verifyEmail: async (email: string) => {
    const { data } = await api.get<boolean>('/user/check-email', {
      params: email,
    });
    return data;
  },

  validateUser: async (): Promise<IUserResponse> => {
    const { data } = await api.get<IUserResponse>('/auth/me');
    return data;
  },
};
