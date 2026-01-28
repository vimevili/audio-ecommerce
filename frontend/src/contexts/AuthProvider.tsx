import { authService } from '@/features/auth/services/authService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { AuthContext } from '../hooks/useAuth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['authUser'],
    queryFn: authService.validateUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const logout = async () => {
    await authService.logout();
    queryClient.setQueryData(['authUser'], null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        checkAuth: () => refetch(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
