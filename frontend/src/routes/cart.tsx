import { createFileRoute, redirect } from '@tanstack/react-router';
import CartPage from '@/features/cart/layouts/CartPage';

export const Route = createFileRoute('/cart')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/sign-in' });
    }
  },
  component: CartPage,
});
