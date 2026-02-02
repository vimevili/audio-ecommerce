import ProductPage from '@/features/product/layouts/ProductPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/product/$id')({
  component: ProductPage,
});
