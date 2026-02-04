import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCartStore, type CartItem } from './cartStore';
import { cartService } from '@/features/cart/services/cartService';

vi.mock('@/features/cart/services/cartService', () => ({
  cartService: {
    getOrCreateCart: vi.fn(),
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    decrementFromCart: vi.fn(),
    clearCart: vi.fn(),
  },
}));

describe('cartStore', () => {
  const mockItem: CartItem = {
    id: 'product-1',
    name: 'Test Product',
    price: 99.99,
    picture: 'https://example.com/image.jpg',
    quantity: 1,
  };

  const mockCartResponse = {
    id: 'cart-123',
    products: [
      {
        productId: 'product-1',
        productName: 'Test Product',
        productPicture: 'https://example.com/image.jpg',
        unitPrice: 99.99,
        quantity: 1,
      },
    ],
  };

  beforeEach(() => {
    useCartStore.setState({
      cartId: null,
      items: [],
      isLoading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  describe('initializeCart', () => {
    it('should initialize cart with items from backend', async () => {
      vi.mocked(cartService.getOrCreateCart).mockResolvedValue(
        mockCartResponse,
      );

      await useCartStore.getState().initializeCart('user-123');

      const state = useCartStore.getState();
      expect(state.cartId).toBe('cart-123');
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe('product-1');
      expect(state.isLoading).toBe(false);
    });

    it('should set loading state while fetching', async () => {
      vi.mocked(cartService.getOrCreateCart).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockCartResponse), 100),
          ),
      );

      const promise = useCartStore.getState().initializeCart('user-123');

      expect(useCartStore.getState().isLoading).toBe(true);

      await promise;

      expect(useCartStore.getState().isLoading).toBe(false);
    });

    it('should set error state on failure', async () => {
      vi.mocked(cartService.getOrCreateCart).mockRejectedValue(
        new Error('Network error'),
      );

      await useCartStore.getState().initializeCart('user-123');

      const state = useCartStore.getState();
      expect(state.error).toBe('Network error');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('addItem', () => {
    beforeEach(() => {
      useCartStore.setState({ cartId: 'cart-123', items: [] });
    });

    it('should add new item to cart', async () => {
      vi.mocked(cartService.addToCart).mockResolvedValue(undefined);

      await useCartStore.getState().addItem(mockItem);

      const state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(1);
    });

    it('should increment quantity if item already exists', async () => {
      useCartStore.setState({ cartId: 'cart-123', items: [mockItem] });
      vi.mocked(cartService.addToCart).mockResolvedValue(undefined);

      await useCartStore.getState().addItem(mockItem, 2);

      const state = useCartStore.getState();
      expect(state.items[0].quantity).toBe(3);
    });

    it('should not add item if cart is not initialized', async () => {
      useCartStore.setState({ cartId: null, items: [] });

      await useCartStore.getState().addItem(mockItem);

      expect(useCartStore.getState().items).toHaveLength(0);
      expect(cartService.addToCart).not.toHaveBeenCalled();
    });
  });

  describe('removeItem', () => {
    beforeEach(() => {
      useCartStore.setState({ cartId: 'cart-123', items: [mockItem] });
    });

    it('should remove item from cart', async () => {
      vi.mocked(cartService.removeFromCart).mockResolvedValue(undefined);

      await useCartStore.getState().removeItem('product-1');

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('should call backend service', async () => {
      vi.mocked(cartService.removeFromCart).mockResolvedValue(undefined);

      await useCartStore.getState().removeItem('product-1');

      expect(cartService.removeFromCart).toHaveBeenCalledWith({
        cart_id: 'cart-123',
        product_id: 'product-1',
        quantity: 1,
      });
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      useCartStore.setState({ items: [mockItem] });

      useCartStore.getState().updateQuantity('product-1', 5);

      expect(useCartStore.getState().items[0].quantity).toBe(5);
    });

    it('should not update if quantity is less than 1', () => {
      useCartStore.setState({ items: [mockItem] });

      useCartStore.getState().updateQuantity('product-1', 0);

      expect(useCartStore.getState().items[0].quantity).toBe(1);
    });
  });

  describe('incrementQuantity', () => {
    it('should increment item quantity by 1', () => {
      useCartStore.setState({ cartId: 'cart-123', items: [mockItem] });
      vi.mocked(cartService.addToCart).mockResolvedValue(undefined);

      useCartStore.getState().incrementQuantity('product-1');

      expect(useCartStore.getState().items[0].quantity).toBe(2);
    });
  });

  describe('decrementQuantity', () => {
    it('should decrement item quantity by 1', () => {
      useCartStore.setState({
        cartId: 'cart-123',
        items: [{ ...mockItem, quantity: 3 }],
      });
      vi.mocked(cartService.decrementFromCart).mockResolvedValue(undefined);

      useCartStore.getState().decrementQuantity('product-1');

      expect(useCartStore.getState().items[0].quantity).toBe(2);
    });

    it('should not decrement below 1', () => {
      useCartStore.setState({
        cartId: 'cart-123',
        items: [{ ...mockItem, quantity: 1 }],
      });

      useCartStore.getState().decrementQuantity('product-1');

      expect(useCartStore.getState().items[0].quantity).toBe(1);
      expect(cartService.decrementFromCart).not.toHaveBeenCalled();
    });
  });

  describe('clearCart', () => {
    it('should clear all items', async () => {
      useCartStore.setState({
        cartId: 'cart-123',
        items: [mockItem, { ...mockItem, id: 'product-2' }],
      });
      vi.mocked(cartService.clearCart).mockResolvedValue(undefined);

      await useCartStore.getState().clearCart();

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('should call backend service', async () => {
      useCartStore.setState({ cartId: 'cart-123', items: [mockItem] });
      vi.mocked(cartService.clearCart).mockResolvedValue(undefined);

      await useCartStore.getState().clearCart();

      expect(cartService.clearCart).toHaveBeenCalledWith('cart-123');
    });
  });

  describe('getTotalItems', () => {
    it('should return sum of all quantities', () => {
      useCartStore.setState({
        items: [
          { ...mockItem, quantity: 2 },
          { ...mockItem, id: 'product-2', quantity: 3 },
        ],
      });

      expect(useCartStore.getState().getTotalItems()).toBe(5);
    });

    it('should return 0 for empty cart', () => {
      useCartStore.setState({ items: [] });

      expect(useCartStore.getState().getTotalItems()).toBe(0);
    });
  });

  describe('getTotalPrice', () => {
    it('should return sum of all item prices times quantities', () => {
      useCartStore.setState({
        items: [
          { ...mockItem, price: 10, quantity: 2 },
          { ...mockItem, id: 'product-2', price: 20, quantity: 3 },
        ],
      });

      expect(useCartStore.getState().getTotalPrice()).toBe(80);
    });

    it('should return 0 for empty cart', () => {
      useCartStore.setState({ items: [] });

      expect(useCartStore.getState().getTotalPrice()).toBe(0);
    });
  });
});
