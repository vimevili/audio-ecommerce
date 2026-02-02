import api from '@/api';
import type IProduct from '@/interfaces/IProduct';
import type IProductDetails from '@/interfaces/IProductDetails';

export type ProductCategory = 'HEADPHONES' | 'HEADSETS';
export type ProductSortField = 'NAME' | 'PRICE' | 'RATING' | 'REVIEWS';
export type SortDirection = 'asc' | 'desc';

export interface ProductsQueryParams {
  category?: ProductCategory;
  search?: string;
  sortBy?: ProductSortField;
  sortDir?: SortDirection;
}

export const homeService = {
  getProducts: async (params: ProductsQueryParams = {}) => {
    const { data } = await api.get<IProduct[]>('/products', { params });
    return data;
  },

  getProduct: async (productId: string) => {
    const { data } = await api.get<IProductDetails>(
      `/products/id/${productId}`,
    );
    return data;
  },
};
