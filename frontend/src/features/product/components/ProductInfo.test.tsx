import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductInfo from './ProductInfo';
import { render } from '@/test/utils';
import type IProduct from '@/interfaces/IProduct';

describe('ProductInfo', () => {
  const mockProduct: IProduct = {
    id: '1',
    name: 'Premium Wireless Headphone',
    price: 299.99,
    category: 'HEADPHONES',
    picture: 'https://example.com/headphone.jpg',
    description:
      'High quality wireless headphone with noise cancellation and premium sound.',
    averageRating: 4.5,
    totalReviews: 120,
  };

  it('should render product name', () => {
    render(<ProductInfo product={mockProduct} />);

    expect(screen.getByText('Premium Wireless Headphone')).toBeInTheDocument();
  });

  it('should render product description', () => {
    render(<ProductInfo product={mockProduct} />);

    expect(
      screen.getByText(
        'High quality wireless headphone with noise cancellation and premium sound.',
      ),
    ).toBeInTheDocument();
  });

  it('should render category badge', () => {
    render(<ProductInfo product={mockProduct} />);

    expect(screen.getByText('HEADPHONES')).toBeInTheDocument();
  });

  it('should format category with underscore correctly', () => {
    const productWithUnderscore: IProduct = {
      ...mockProduct,
      category: 'WIRELESS_EARBUDS',
    };
    render(<ProductInfo product={productWithUnderscore} />);

    expect(screen.getByText('WIRELESS EARBUDS')).toBeInTheDocument();
  });

  it('should have category badge with proper styling', () => {
    render(<ProductInfo product={mockProduct} />);

    const categoryBadge = screen.getByText('HEADPHONES');
    expect(categoryBadge).toHaveClass('uppercase');
  });
});
