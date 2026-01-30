import api from '@/api';
import type IProduct from '@/interfaces/IProduct';

export const homeService = {
  search: async (name: string) => {
    const { data } = await api.get<IProduct[]>('/products/search', {
      params: { name },
    });
    return data;
  },

  getProduct: async (productId: string) => {
    const { data } = await api.get<IProduct>(`/products/id/${productId}`);
    return data;
  },

  getProductsByCategory: async (category: 'HEADPHONES' | 'HEADSETS') => {
    const parsedCategory = category.toLocaleUpperCase();
    const { data } = await api.get<IProduct[]>(
      `/products/category/${parsedCategory}`,
    );
    return data;
  },
};
