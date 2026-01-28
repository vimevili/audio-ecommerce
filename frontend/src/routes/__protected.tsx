import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { authService } from '@/features/auth/services/authService';

export const Route = createFileRoute('/__protected')({
  beforeLoad: async ({ location }) => {
    try {
      await authService.validateUser();
    } catch {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Outlet,
});
