import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/__protected/')({
  component: () => <div>Bem-vindo ao Audio App!</div>,
});
