import { createFileRoute } from '@tanstack/react-router';
import { SignPage } from '../features/auth/layouts';

const SignInPage = () => <SignPage type="sign-in" />;

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
});
