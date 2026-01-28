import { RouterProvider } from '@tanstack/react-router';
import { useAuth } from './hooks/useAuth';
import { router } from './router.ts';
import SplashScreen from './components/SplashScreen.tsx';

export function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <SplashScreen />;
  }

  return <RouterProvider router={router} context={{ auth }} />;
}
