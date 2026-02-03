import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductBanner from './ProductBanner';
import { renderWithRouter } from '@/test/utils';

describe('ProductBanner', () => {
  const mockProduct = {
    id: '123',
    name: 'Premium Wireless Headphone',
    picture: 'https://example.com/headphone.jpg',
    price: 299.99,
  };

  describe('Horizontal Layout', () => {
    it('should render product name', () => {
      renderWithRouter(
        <ProductBanner direction="horizontal" {...mockProduct} />,
      );

      expect(
        screen.getByText('Premium Wireless Headphone'),
      ).toBeInTheDocument();
    });

    it('should render product image with correct alt text', () => {
      renderWithRouter(
        <ProductBanner direction="horizontal" {...mockProduct} />,
      );

      const image = screen.getByAltText('Premium Wireless Headphone');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/headphone.jpg');
    });

    it('should render "Shop now" link in horizontal mode', () => {
      renderWithRouter(
        <ProductBanner direction="horizontal" {...mockProduct} />,
      );

      expect(screen.getByText('Shop now')).toBeInTheDocument();
    });

    it('should have link to product page with correct params', () => {
      renderWithRouter(
        <ProductBanner direction="horizontal" {...mockProduct} />,
      );

      const link = screen.getByRole('link', { name: /shop now/i });
      expect(link).toHaveAttribute('href', '/product/123');
    });

    it('should NOT render price in horizontal mode', () => {
      renderWithRouter(
        <ProductBanner direction="horizontal" {...mockProduct} />,
      );

      expect(screen.queryByText('USD 299.99')).not.toBeInTheDocument();
    });
  });

  describe('Vertical Layout', () => {
    it('should render product name', () => {
      renderWithRouter(<ProductBanner direction="vertical" {...mockProduct} />);

      expect(
        screen.getByText('Premium Wireless Headphone'),
      ).toBeInTheDocument();
    });

    it('should render product price in vertical mode', () => {
      renderWithRouter(<ProductBanner direction="vertical" {...mockProduct} />);

      expect(screen.getByText('USD 299.99')).toBeInTheDocument();
    });

    it('should NOT render "Shop now" link in vertical mode', () => {
      renderWithRouter(<ProductBanner direction="vertical" {...mockProduct} />);

      expect(screen.queryByText('Shop now')).not.toBeInTheDocument();
    });

    it('should render product image', () => {
      renderWithRouter(<ProductBanner direction="vertical" {...mockProduct} />);

      const image = screen.getByAltText('Premium Wireless Headphone');
      expect(image).toBeInTheDocument();
    });

    it('should apply line-clamp-2 to product name', () => {
      const longNameProduct = {
        ...mockProduct,
        name: 'This is a very long product name that should be clamped',
      };
      renderWithRouter(
        <ProductBanner direction="vertical" {...longNameProduct} />,
      );

      const nameElement = screen.getByText(longNameProduct.name);
      expect(nameElement).toHaveClass('line-clamp-2');
    });
  });

  describe('Common behavior', () => {
    it('should have cursor-pointer class', () => {
      const { container } = renderWithRouter(
        <ProductBanner direction="horizontal" {...mockProduct} />,
      );

      const banner = container.firstChild;
      expect(banner).toHaveClass('cursor-pointer');
    });

    it('should have hover shadow transition', () => {
      const { container } = renderWithRouter(
        <ProductBanner direction="horizontal" {...mockProduct} />,
      );

      const banner = container.firstChild;
      expect(banner).toHaveClass('hover:shadow-md');
      expect(banner).toHaveClass('transition-all');
    });
  });
});
