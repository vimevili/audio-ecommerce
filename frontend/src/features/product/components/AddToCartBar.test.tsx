import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddToCartBar from './AddToCartBar';
import { render } from '@/test/utils';

describe('AddToCartBar', () => {
  const defaultProps = {
    productId: 'product-123',
    price: 299.99,
  };

  describe('Mobile Layout (default)', () => {
    it('should render quantity selector', () => {
      render(<AddToCartBar {...defaultProps} />);

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should render Add to Cart button', () => {
      render(<AddToCartBar {...defaultProps} />);

      expect(
        screen.getByRole('button', { name: /add to cart/i }),
      ).toBeInTheDocument();
    });

    it('should display total price', () => {
      render(<AddToCartBar {...defaultProps} />);

      expect(screen.getByText(/299.99/)).toBeInTheDocument();
    });

    it('should increment quantity when plus button is clicked', () => {
      render(<AddToCartBar {...defaultProps} />);

      const incrementButton = screen.getByRole('button', {
        name: /increase quantity/i,
      });
      fireEvent.click(incrementButton);

      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should decrement quantity when minus button is clicked', () => {
      render(<AddToCartBar {...defaultProps} />);

      // First increment to 2
      const incrementButton = screen.getByRole('button', {
        name: /increase quantity/i,
      });
      fireEvent.click(incrementButton);

      // Then decrement back to 1
      const decrementButton = screen.getByRole('button', {
        name: /decrease quantity/i,
      });
      fireEvent.click(decrementButton);

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should not decrement below 1', () => {
      render(<AddToCartBar {...defaultProps} />);

      const decrementButton = screen.getByRole('button', {
        name: /decrease quantity/i,
      });
      fireEvent.click(decrementButton);

      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should disable decrement button when quantity is 1', () => {
      render(<AddToCartBar {...defaultProps} />);

      const decrementButton = screen.getByRole('button', {
        name: /decrease quantity/i,
      });
      expect(decrementButton).toBeDisabled();
    });

    it('should update total price when quantity changes', () => {
      render(<AddToCartBar {...defaultProps} />);

      const incrementButton = screen.getByRole('button', {
        name: /increase quantity/i,
      });
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      // 3 * 299.99 = 899.97
      expect(screen.getByText(/899.97/)).toBeInTheDocument();
    });
  });

  describe('Desktop Layout', () => {
    it('should render desktop layout when isDesktop is true', () => {
      render(<AddToCartBar {...defaultProps} isDesktop />);

      expect(
        screen.getByRole('button', { name: /add to cart/i }),
      ).toBeInTheDocument();
    });

    it('should render quantity selector in desktop layout', () => {
      render(<AddToCartBar {...defaultProps} isDesktop />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /increase quantity/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /decrease quantity/i }),
      ).toBeInTheDocument();
    });

    it('should increment quantity in desktop layout', () => {
      render(<AddToCartBar {...defaultProps} isDesktop />);

      const incrementButton = screen.getByRole('button', {
        name: /increase quantity/i,
      });
      fireEvent.click(incrementButton);

      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  describe('Add to Cart functionality', () => {
    it('should show Adding... text when add to cart is clicked', async () => {
      vi.useFakeTimers();
      render(<AddToCartBar {...defaultProps} />);

      const addButton = screen.getByRole('button', { name: /add to cart/i });
      fireEvent.click(addButton);

      expect(screen.getByText(/adding/i)).toBeInTheDocument();

      vi.advanceTimersByTime(500);
      vi.useRealTimers();
    });

    it('should log product info when adding to cart', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      render(<AddToCartBar {...defaultProps} />);

      const addButton = screen.getByRole('button', { name: /add to cart/i });
      fireEvent.click(addButton);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Adding product to cart:',
        'product-123',
        'quantity:',
        1,
      );

      consoleSpy.mockRestore();
    });
  });
});
