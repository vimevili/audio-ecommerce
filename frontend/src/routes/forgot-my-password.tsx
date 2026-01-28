import ForgotPasswordPage from '@/features/auth/layouts/ForgotPasswordPage';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/forgot-my-password')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),

  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: search.redirect || '/',
      });
    }
  },
  component: ForgotPasswordPage,
});
