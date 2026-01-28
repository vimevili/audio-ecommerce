import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { SignPage } from '../features/auth/layouts';

const SignInPage = () => <SignPage type="sign-in" />;

export const Route = createFileRoute('/sign-in')({
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
  component: SignInPage,
});
