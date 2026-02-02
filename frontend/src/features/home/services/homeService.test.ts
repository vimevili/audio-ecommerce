import type IProduct from '@/interfaces/IProduct';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { homeService } from './homeService';
import api from '@/api';

vi.mock('@/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('homeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProducts', () => {
    const mockProducts: IProduct[] = [
      {
        id: '1',
        name: 'Headphone Pro',
        price: 299.99,
        category: 'HEADPHONES',
        picture: 'headphone.jpg',
        description: 'Premium headphone',
        averageRating: 4.5,
        totalReviews: 120,
      },
      {
        id: '2',
        name: 'Gaming Headset',
        price: 199.99,
        category: 'HEADSETS',
        picture: 'headset.jpg',
        description: 'Gaming headset',
        averageRating: 4.2,
        totalReviews: 85,
      },
    ];

    it('should fetch products without params', async () => {
      (api.get as Mock).mockResolvedValueOnce({ data: mockProducts });

      const result = await homeService.getProducts();

      expect(api.get).toHaveBeenCalledWith('/products', { params: {} });
      expect(result).toEqual(mockProducts);
    });

    it('should fetch products with category filter', async () => {
      (api.get as Mock).mockResolvedValueOnce({ data: [mockProducts[0]] });

      const result = await homeService.getProducts({ category: 'HEADPHONES' });

      expect(api.get).toHaveBeenCalledWith('/products', {
        params: { category: 'HEADPHONES' },
      });
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('HEADPHONES');
    });

    it('should fetch products with search term', async () => {
      (api.get as Mock).mockResolvedValueOnce({ data: [mockProducts[0]] });

      const result = await homeService.getProducts({ search: 'Pro' });

      expect(api.get).toHaveBeenCalledWith('/products', {
        params: { search: 'Pro' },
      });
      expect(result[0].name).toContain('Pro');
    });

    it('should fetch products with sorting params', async () => {
      (api.get as Mock).mockResolvedValueOnce({ data: mockProducts });

      const result = await homeService.getProducts({
        sortBy: 'PRICE',
        sortDir: 'asc',
      });

      expect(api.get).toHaveBeenCalledWith('/products', {
        params: { sortBy: 'PRICE', sortDir: 'asc' },
      });
      expect(result).toEqual(mockProducts);
    });

    it('should fetch products with all params combined', async () => {
      (api.get as Mock).mockResolvedValueOnce({ data: mockProducts });

      const result = await homeService.getProducts({
        category: 'HEADPHONES',
        search: 'Pro',
        sortBy: 'RATING',
        sortDir: 'desc',
      });

      expect(api.get).toHaveBeenCalledWith('/products', {
        params: {
          category: 'HEADPHONES',
          search: 'Pro',
          sortBy: 'RATING',
          sortDir: 'desc',
        },
      });
      expect(result).toEqual(mockProducts);
    });
  });

  describe('getProduct', () => {
    const mockProduct: IProduct = {
      id: '123',
      name: 'Headphone Pro',
      price: 299.99,
      category: 'HEADPHONES',
      picture: 'headphone.jpg',
      description: 'Premium headphone',
      averageRating: 4.5,
      totalReviews: 120,
    };

    it('should fetch a single product by id', async () => {
      (api.get as Mock).mockResolvedValueOnce({ data: mockProduct });

      const result = await homeService.getProduct('123');

      expect(api.get).toHaveBeenCalledWith('/products/id/123');
      expect(result).toEqual(mockProduct);
    });
  });
});
