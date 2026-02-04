import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import CartItem from './CartItem';
import { renderWithRouter } from '@/test/utils';
import { useCartStore, type CartItem as CartItemType } from '@/store';

describe('CartItem', () => {
  const mockItem: CartItemType = {
    id: 'product-1',
    name: 'Premium Wireless Headphone',
    price: 299.99,
    picture: 'https://example.com/headphone.jpg',
    quantity: 2,
  };

  beforeEach(() => {
    useCartStore.setState({
      cartId: 'cart-123',
      items: [mockItem],
      isLoading: false,
      error: null,
    });
  });

  it('should render product image', async () => {
    await renderWithRouter(<CartItem item={mockItem} />);

    const image = screen.getByAltText('Premium Wireless Headphone');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/headphone.jpg');
  });

  it('should render product name', async () => {
    await renderWithRouter(<CartItem item={mockItem} />);

    expect(screen.getByText('Premium Wireless Headphone')).toBeInTheDocument();
  });

  it('should render product price with USD prefix', async () => {
    await renderWithRouter(<CartItem item={mockItem} />);

    expect(screen.getByText('USD 299.99')).toBeInTheDocument();
  });

  it('should render quantity', async () => {
    await renderWithRouter(<CartItem item={mockItem} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should increment quantity when plus button is clicked', async () => {
    await renderWithRouter(<CartItem item={mockItem} />);

    const incrementButton = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    fireEvent.click(incrementButton);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(3);
  });

  it('should decrement quantity when minus button is clicked', async () => {
    await renderWithRouter(<CartItem item={mockItem} />);

    const decrementButton = screen.getByRole('button', {
      name: /decrease quantity/i,
    });
    fireEvent.click(decrementButton);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(1);
  });

  it('should open confirm dialog when delete button is clicked', async () => {
    await renderWithRouter(<CartItem item={mockItem} />);

    const deleteButton = screen.getByRole('button', { name: /remove item/i });
    fireEvent.click(deleteButton);

    expect(screen.getByText('Remove Item')).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure you want to remove/i),
    ).toBeInTheDocument();
  });

  it('should remove item when confirming removal in dialog', async () => {
    await renderWithRouter(<CartItem item={mockItem} />);

    const deleteButton = screen.getByRole('button', { name: /remove item/i });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText('Yes, remove');
    fireEvent.click(confirmButton);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
  });

  it('should disable decrement button when quantity is 1', async () => {
    const singleItem = { ...mockItem, quantity: 1 };
    useCartStore.setState({
      cartId: 'cart-123',
      items: [singleItem],
      isLoading: false,
      error: null,
    });

    await renderWithRouter(<CartItem item={singleItem} />);

    const decrementButton = screen.getByRole('button', {
      name: /decrease quantity/i,
    });
    expect(decrementButton).toBeDisabled();
  });
});
