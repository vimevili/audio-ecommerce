import api from '@/api';
import type {
  IForgotPasswordRequest,
  ILoginRequest,
  IRegisterRequest,
} from '../models';
import type { IResetPasswordRequest, IUserResponse } from '@/interfaces/auth';

export const authService = {
  login: async (credentials: ILoginRequest) => {
    const { data } = await api.post<string>('/auth/login', credentials);
    return data;
  },

  logout: async () => {
    await api.post<string>('/auth/logout');
  },

  register: async (userData: IRegisterRequest) => {
    const { data } = await api.post<string>('/auth/register', userData);
    return data;
  },

  forgotPassword: async ({ email }: IForgotPasswordRequest) => {
    const { data } = await api.post<string>('/auth/forgot-password', { email });
    return data;
  },

  resetPassword: async (info: IResetPasswordRequest) => {
    const { data } = await api.post<string>('/auth/reset-password', {
      ...info,
    });
    return data;
  },

  verifyUsername: async (username: string) => {
    const { data } = await api.get<boolean>('/users/check-username', {
      params: { username },
    });
    return data;
  },

  verifyEmail: async (email: string) => {
    const { data } = await api.get<boolean>('/users/check-email', {
      params: { email },
    });
    return data;
  },

  validateUser: async (): Promise<IUserResponse> => {
    const { data } = await api.get<IUserResponse>('/auth/me');
    return data;
  },

  resendConfirmationEmail: async (email: string): Promise<string> => {
    const { data } = await api.post<string>('/auth/resend-confirmation', {
      email,
    });
    return data;
  },
};
