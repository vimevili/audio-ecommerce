import { authService } from '@/features/auth/services/authService';
import { useCartStore } from '@/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type ReactNode, useEffect } from 'react';
import { AuthContext } from '../hooks/useAuth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const initializeCart = useCartStore((state) => state.initializeCart);
  const resetLocalCart = useCartStore((state) => state.resetLocalCart);

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['authUser'],
    queryFn: authService.validateUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user?.id) {
      initializeCart(user.id);
    }
  }, [user?.id, initializeCart]);

  const logout = async () => {
    await authService.logout();
    resetLocalCart();
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
