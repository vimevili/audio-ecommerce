import { homeService } from '@/features/home/services/homeService';
import { useQuery } from '@tanstack/react-query';

export default function useGetProductsByCategory(
  category: 'HEADPHONES' | 'HEADSETS',
) {
  return useQuery({
    queryKey: ['products_by_category', category],
    queryFn: () => homeService.getProductsByCategory(category),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}
