import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';
import type IProduct from '@/interfaces/IProduct';

describe('ProductCard', () => {
  const mockProduct: IProduct = {
    id: '1',
    name: 'Premium Wireless Headphone',
    price: 299.99,
    category: 'HEADPHONES',
    picture: 'https://example.com/headphone.jpg',
    description: 'High quality wireless headphone',
    averageRating: 4.5,
    totalReviews: 120,
  };

  it('should render product name', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Premium Wireless Headphone')).toBeInTheDocument();
  });

  it('should render product price with USD prefix', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('USD 299.99')).toBeInTheDocument();
  });

  it('should render product rating with one decimal', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should render product image with correct alt text', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Premium Wireless Headphone');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/headphone.jpg');
  });

  it('should handle product with zero rating', () => {
    const zeroRatingProduct = { ...mockProduct, averageRating: 0 };
    render(<ProductCard product={zeroRatingProduct} />);

    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('should handle product with long name (line clamp)', () => {
    const longNameProduct = {
      ...mockProduct,
      name: 'This is a very long product name that should be clamped to two lines',
    };
    render(<ProductCard product={longNameProduct} />);

    const nameElement = screen.getByText(longNameProduct.name);
    expect(nameElement).toHaveClass('line-clamp-2');
  });
});
