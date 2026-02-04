import { screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import EmptyCart from './EmptyCart';
import { renderWithRouter } from '@/test/utils';

describe('EmptyCart', () => {
  beforeEach(async () => {
    await renderWithRouter(<EmptyCart />);
  });

  it('should render "Your cart is empty" title', () => {
    expect(screen.getByText(/your cart is/i)).toBeInTheDocument();
  });

  it('should render description text', () => {
    expect(
      screen.getByText(/you haven't added anything to your cart/i),
    ).toBeInTheDocument();
  });

  it('should render "See all products" button', () => {
    expect(screen.getByText('See all products')).toBeInTheDocument();
  });

  it('should have link to home page', () => {
    const link = screen.getByRole('link', { name: /see all products/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
