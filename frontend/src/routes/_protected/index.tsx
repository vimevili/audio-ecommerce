import HomePage from '@/features/home/layouts/HomePage';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

const productSearchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute('/_protected/')({
  validateSearch: (search) => productSearchSchema.parse(search),
  component: HomePage,
});
