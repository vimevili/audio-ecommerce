import HomePage from '@/features/home/layouts/HomePage';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

const productSearchSchema = z.object({
  search: z.string().optional().catch(undefined),
  category: z.enum(['HEADPHONES', 'HEADSETS']).optional().catch(undefined),
  sortBy: z
    .enum(['NAME', 'PRICE', 'RATING', 'REVIEWS'])
    .optional()
    .catch(undefined),
  sortDir: z.enum(['asc', 'desc']).optional().catch(undefined),
});

export type ProductSearchParams = z.infer<typeof productSearchSchema>;

export const Route = createFileRoute('/')({
  validateSearch: (search) => productSearchSchema.parse(search),
  component: HomePage,
});
