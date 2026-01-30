import { homeService } from '@/features/home/services/homeService';
import { useQuery } from '@tanstack/react-query';

export default function useSearchProducts(param: string) {
  return useQuery({
    queryKey: ['search_products', param],
    queryFn: () => homeService.search(param),
    placeholderData: (previousData) => previousData,
    enabled: !!param,
    staleTime: 1000 * 60 * 5,
  });
}
