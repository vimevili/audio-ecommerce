import { useAuth } from '@/hooks';
import { useCartStore } from '@/store';
import { useNavigate } from '@tanstack/react-router';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface AddToCartBarProps {
  productId: string;
  productName: string;
  productPicture: string;
  price: number;
  isDesktop?: boolean;
}

export default function AddToCartBar({
  productId,
  productName,
  productPicture,
  price,
  isDesktop = false,
}: AddToCartBarProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate({ to: '/sign-in' });
      return;
    }

    setIsAdding(true);
    addItem(
      {
        id: productId,
        name: productName,
        picture: productPicture,
        price,
      },
      quantity,
    );

    toast.success(
      `${quantity > 1 ? `${quantity}x ` : ''}${productName} added to cart`,
    );

    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  const totalPrice = price * quantity;

  if (isDesktop) {
    return (
      <div className="flex items-center gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="cursor-pointer  flex size-8 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center text-lg font-medium text-neutral-900">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="cursor-pointer flex size-8 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-900"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="cursor-pointer flex items-center justify-center gap-2 rounded-lg bg-audio-green px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>{isAdding ? 'Adding...' : 'Add To Cart'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-neutral-200 bg-white responsive-padding-x py-4">
      <div className="flex items-center gap-4">
        <div className="h-full flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="flex size-8 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-8 text-center text-lg font-semibold text-neutral-900">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="flex size-8 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 transition-colors hover:bg-neutral-100"
              aria-label="Increase quantity"
            >
              <Plus className="size-3" />
            </button>
          </div>
          USD ${totalPrice.toFixed(2)}
        </div>
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-audio-green px-4 py-2 font-semibold text-white transition-all hover:bg-audio-green active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <ShoppingCart className="size-5" />
          <span>{isAdding ? 'Adding...' : `Add to Cart `}</span>
        </button>
      </div>
    </div>
  );
}
