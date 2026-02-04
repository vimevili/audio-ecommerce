import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CartFooter from './CartFooter';
import { render } from '@/test/utils';

describe('CartFooter', () => {
  const defaultProps = {
    totalItems: 3,
    totalPrice: 899.97,
  };

  it('should render total items count', () => {
    render(<CartFooter {...defaultProps} />);

    expect(screen.getByText(/total 3 items/i)).toBeInTheDocument();
  });

  it('should use singular "item" when there is only one item', () => {
    render(<CartFooter totalItems={1} totalPrice={299.99} />);

    expect(screen.getByText(/total 1 item$/i)).toBeInTheDocument();
  });

  it('should render total price with USD prefix', () => {
    render(<CartFooter {...defaultProps} />);

    expect(screen.getByText('USD 899.97')).toBeInTheDocument();
  });

  it('should render Proceed to Checkout button', () => {
    render(<CartFooter {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /proceed to checkout/i }),
    ).toBeInTheDocument();
  });

  it('should format price with two decimal places', () => {
    render(<CartFooter totalItems={1} totalPrice={100} />);

    expect(screen.getByText('USD 100.00')).toBeInTheDocument();
  });
});
