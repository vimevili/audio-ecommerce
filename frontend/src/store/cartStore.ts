import {
  cartService,
  type CartResponse,
} from '@/features/cart/services/cartService';
import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  picture: string;
  quantity: number;
}

interface CartState {
  cartId: string | null;
  items: CartItem[];
  isLoading: boolean;
  error: string | null;

  initializeCart: (userId: string) => Promise<void>;
  addItem: (
    item: Omit<CartItem, 'quantity'>,
    quantity?: number,
  ) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => Promise<void>;
  syncWithBackend: (userId: string) => Promise<void>;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const mapCartResponseToItems = (cart: CartResponse): CartItem[] => {
  return cart.products.map((item) => ({
    id: item.productId,
    name: item.productName,
    picture: item.productPicture,
    price: item.unitPrice,
    quantity: item.quantity,
  }));
};

export const useCartStore = create<CartState>()((set, get) => ({
  cartId: null,
  items: [],
  isLoading: false,
  error: null,

  initializeCart: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.getOrCreateCart(userId);
      set({
        cartId: cart.id,
        items: mapCartResponseToItems(cart),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load cart',
        isLoading: false,
      });
    }
  },

  addItem: async (item, quantity = 1) => {
    const { cartId, items } = get();
    if (!cartId) {
      console.error('Cart not initialized');
      return;
    }

    const existingItem = items.find((i) => i.id === item.id);
    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        ),
      });
    } else {
      set({
        items: [...items, { ...item, quantity }],
      });
    }

    try {
      await cartService.addToCart({
        cart_id: cartId,
        product_id: item.id,
        quantity,
      });
    } catch (error) {
      console.error('Failed to add item:', error);
      set({ items });
    }
  },

  removeItem: async (id: string) => {
    const { cartId, items } = get();
    if (!cartId) return;

    const itemToRemove = items.find((item) => item.id === id);
    if (!itemToRemove) return;

    set({
      items: items.filter((item) => item.id !== id),
    });

    try {
      await cartService.removeFromCart({
        cart_id: cartId,
        product_id: id,
        quantity: itemToRemove.quantity,
      });
    } catch (error) {
      console.error('Failed to remove item:', error);
      set({ items });
    }
  },

  updateQuantity: (id, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    }));
  },

  incrementQuantity: (id) => {
    const { cartId, items } = get();
    if (!cartId) return;

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }));

    cartService
      .addToCart({
        cart_id: cartId,
        product_id: id,
        quantity: 1,
      })
      .catch((error) => {
        console.error('Failed to increment quantity:', error);
        set({ items });
      });
  },

  decrementQuantity: (id) => {
    const { cartId, items } = get();
    if (!cartId) return;

    const item = items.find((i) => i.id === id);
    if (!item || item.quantity <= 1) return;

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    }));

    cartService
      .decrementFromCart({
        cart_id: cartId,
        product_id: id,
        quantity: 1,
      })
      .catch((error) => {
        console.error('Failed to decrement quantity:', error);
        set({ items });
      });
  },

  clearCart: async () => {
    const { cartId, items } = get();
    set({ items: [] });

    if (cartId) {
      try {
        await cartService.clearCart(cartId);
      } catch (error) {
        console.error('Failed to clear cart:', error);
        set({ items });
      }
    }
  },

  syncWithBackend: async (userId: string) => {
    try {
      const cart = await cartService.getOrCreateCart(userId);
      set({
        cartId: cart.id,
        items: mapCartResponseToItems(cart),
      });
    } catch (error) {
      console.error('Failed to sync cart:', error);
    }
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },
}));
