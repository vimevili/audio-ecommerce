import {
  homeService,
  type ProductsQueryParams,
} from '@/features/home/services/homeService';
import { useQuery } from '@tanstack/react-query';

export default function useGetProducts(params: ProductsQueryParams = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => homeService.getProducts(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}
