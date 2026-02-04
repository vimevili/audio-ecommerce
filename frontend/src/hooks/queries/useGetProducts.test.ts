import { homeService } from '@/features/home/services/homeService';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useGetProducts from './useGetProducts';
import { createWrapper } from '@/test/utils';
import type IProduct from '@/interfaces/IProduct';

vi.mock('@/features/home/services/homeService');

const mockHomeService = vi.mocked(homeService);

describe('useGetProducts', () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch products with default params', async () => {
    mockHomeService.getProducts.mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useGetProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockHomeService.getProducts).toHaveBeenCalledWith({});
    expect(result.current.data).toEqual(mockProducts);
  });

  it('should fetch products with category filter', async () => {
    const filteredProducts = [mockProducts[0]];
    mockHomeService.getProducts.mockResolvedValueOnce(filteredProducts);

    const { result } = renderHook(
      () => useGetProducts({ category: 'HEADPHONES' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockHomeService.getProducts).toHaveBeenCalledWith({
      category: 'HEADPHONES',
    });
    expect(result.current.data).toEqual(filteredProducts);
  });

  it('should fetch products with sorting params', async () => {
    mockHomeService.getProducts.mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(
      () => useGetProducts({ sortBy: 'PRICE', sortDir: 'desc' }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockHomeService.getProducts).toHaveBeenCalledWith({
      sortBy: 'PRICE',
      sortDir: 'desc',
    });
  });

  it('should have correct query key for caching', async () => {
    mockHomeService.getProducts.mockResolvedValueOnce(mockProducts);

    const params = { category: 'HEADSETS' as const, search: 'gaming' };
    const { result } = renderHook(() => useGetProducts(params), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockHomeService.getProducts).toHaveBeenCalledWith(params);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to fetch products');
    mockHomeService.getProducts.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useGetProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
