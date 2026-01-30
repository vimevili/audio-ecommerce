import { RouterProvider } from '@tanstack/react-router';
import { useAuth } from './hooks';
import { router } from './router.ts';
import SplashScreen from './components/SplashScreen.tsx';
import { Toaster } from 'sonner';

export function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <RouterProvider router={router} context={{ auth }} />

      <Toaster richColors position="top-center" closeButton />
    </>
  );
}
