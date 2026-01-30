import { homeService } from '@/features/home/services/homeService';
import { useQuery } from '@tanstack/react-query';

export default function useGetProduct(id: string) {
  return useQuery({
    queryKey: ['product_by_id', id],
    queryFn: () => homeService.getProduct(id),
  });
}
