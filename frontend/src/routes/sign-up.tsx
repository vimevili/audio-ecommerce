import { createFileRoute } from '@tanstack/react-router';
import { SignPage } from '../features/auth/layouts';

const SignUpPage = () => <SignPage type="sign-up" />;

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
});
