import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import CartTable from './CartTable';
import { renderWithRouter } from '@/test/utils';
import { useCartStore, type CartItem } from '@/store';

describe('CartTable', () => {
  const mockItems: CartItem[] = [
    {
      id: 'product-1',
      name: 'Premium Wireless Headphone',
      price: 299.99,
      picture: 'https://example.com/headphone.jpg',
      quantity: 2,
    },
    {
      id: 'product-2',
      name: 'Bluetooth Speaker',
      price: 149.99,
      picture: 'https://example.com/speaker.jpg',
      quantity: 1,
    },
  ];

  const totalItems = 3;
  const totalPrice = 749.97;

  beforeEach(() => {
    useCartStore.setState({
      cartId: 'cart-123',
      items: mockItems,
      isLoading: false,
      error: null,
    });
  });

  it('should render table headers', async () => {
    await renderWithRouter(
      <CartTable
        items={mockItems}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />,
    );

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
  });

  it('should render all product names', async () => {
    await renderWithRouter(
      <CartTable
        items={mockItems}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />,
    );

    expect(screen.getByText('Premium Wireless Headphone')).toBeInTheDocument();
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument();
  });

  it('should render product images', async () => {
    await renderWithRouter(
      <CartTable
        items={mockItems}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />,
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  it('should render quantities', async () => {
    await renderWithRouter(
      <CartTable
        items={mockItems}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />,
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should render Proceed to Checkout button', async () => {
    await renderWithRouter(
      <CartTable
        items={mockItems}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />,
    );

    expect(screen.getByText('Proceed to Checkout')).toBeInTheDocument();
  });

  it('should increment quantity when plus button is clicked', async () => {
    await renderWithRouter(
      <CartTable
        items={mockItems}
        totalItems={totalItems}
        totalPrice={totalPrice}
      />,
    );

    const incrementButtons = screen.getAllByRole('button', {
      name: /increase quantity/i,
    });
    fireEvent.click(incrementButtons[0]);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(3);
  });
});
