import ForgotPasswordPage from '@/features/auth/layouts/ForgotPasswordPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/forgot-my-password')({
  component: ForgotPasswordPage,
});
