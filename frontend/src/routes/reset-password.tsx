import { ResetPasswordPage } from '@/features/auth/layouts';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

const resetPasswordSearchSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export const Route = createFileRoute('/reset-password')({
  validateSearch: (search: Record<string, unknown>) => {
    return resetPasswordSearchSchema.parse(search);
  },

  beforeLoad: ({ search }) => {
    if (!search.token) {
      throw redirect({ to: '/sign-in' });
    }
  },

  component: ResetPasswordPage,
});
