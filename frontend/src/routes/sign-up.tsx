import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';
import { SignPage } from '../features/auth/layouts';
const SignUpPage = () => <SignPage type="sign-up" />;

export const Route = createFileRoute('/sign-up')({
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
  component: SignUpPage,
});
