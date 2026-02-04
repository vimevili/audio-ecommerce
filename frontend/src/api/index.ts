import type { IStandardErrorInfo } from '@/interfaces/auth';
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.MODE === 'production'
      ? 'https://audio-ecommerce.onrender.com/api'
      : 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<IStandardErrorInfo>) => {
    let errorMessage = 'There was an unexpected error.';

    if (error.config?.url?.includes('/me')) return Promise.reject(error);

    if (error.response?.data) {
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage = 'No response from server. Check your connection.';
    }
    return Promise.reject(new Error(errorMessage));
  },
);

export default api;
