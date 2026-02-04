import api from '@/api';

export interface CartItemResponse {
  productId: string;
  productName: string;
  productPicture: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface CartResponse {
  id: string;
  totalCartValue: number;
  products: CartItemResponse[];
}

export interface AddToCartRequest {
  cart_id: string;
  product_id: string;
  quantity: number;
}

export interface CreateCartRequest {
  user_id: string;
}

export const cartService = {
  getCartByUserId: async (userId: string): Promise<CartResponse> => {
    const { data } = await api.get<CartResponse>(`/cart/user/${userId}`);
    return data;
  },

  createCart: async (userId: string): Promise<CartResponse> => {
    const { data } = await api.post<CartResponse>('/cart/create', {
      user_id: userId,
    });
    return data;
  },

  addToCart: async (request: AddToCartRequest): Promise<void> => {
    await api.post('/cart/add', request);
  },

  decrementFromCart: async (request: AddToCartRequest): Promise<void> => {
    await api.post('/cart/decrement', request);
  },

  removeFromCart: async (request: AddToCartRequest): Promise<void> => {
    await api.delete('/cart/delete', { data: request });
  },

  clearCart: async (cartId: string): Promise<void> => {
    await api.delete(`/cart/clear/${cartId}`);
  },

  getOrCreateCart: async (userId: string): Promise<CartResponse> => {
    const { data } = await api.post<CartResponse>(
      `/cart/get-or-create/${userId}`,
    );
    return data;
  },
};
