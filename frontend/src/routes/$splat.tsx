import NotFoundPage from '@/features/not-found/layouts/NotFoundPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$splat')({
  component: NotFoundPage,
});
