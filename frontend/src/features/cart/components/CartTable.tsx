import { ConfirmDialog } from '@/components';
import { useCartStore, type CartItem } from '@/store';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { CheckoutButton, ProductLink, QuantitySelector } from './';

interface CartTableProps {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export default function CartTable({
  items,
  totalItems,
  totalPrice,
}: CartTableProps) {
  const { incrementQuantity, decrementQuantity, removeItem } = useCartStore();
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  const handleRemove = () => {
    if (itemToRemove) {
      removeItem(itemToRemove.id);
      toast.success(`${itemToRemove.name} removed from cart`);
      setItemToRemove(null);
    }
  };

  return (
    <>
      <ConfirmDialog
        open={!!itemToRemove}
        onOpenChange={(open) => !open && setItemToRemove(null)}
        title="Remove Item"
        description={`Are you sure you want to remove "${itemToRemove?.name}" from your cart?`}
        confirmLabel="Yes, remove"
        cancelLabel="Keep it"
        onConfirm={handleRemove}
      />
      <div className="p-8">
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-neutral-200 text-sm font-medium text-neutral-500">
          <div className="col-span-5">Product</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>

        <div className="divide-y divide-neutral-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 py-6 items-center"
            >
              <div className="col-span-5 flex items-center gap-4">
                <ProductLink
                  productId={item.id}
                  className="size-16 shrink-0 rounded-xl bg-neutral-100 overflow-hidden"
                >
                  <img
                    src={item.picture}
                    alt={item.name}
                    className="size-full object-cover object-center"
                  />
                </ProductLink>
                <div className="min-w-0">
                  <ProductLink
                    productId={item.id}
                    className="font-medium text-neutral-900 truncate block hover:underline"
                  >
                    {item.name}
                  </ProductLink>
                  <button
                    onClick={() => setItemToRemove(item)}
                    className="mt-1 flex items-center gap-1 text-xs text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="size-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              <div className="col-span-3 flex items-center justify-center">
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrement={() => incrementQuantity(item.id)}
                  onDecrement={() => decrementQuantity(item.id)}
                  size="md"
                />
              </div>

              <div className="col-span-2 text-center text-neutral-600">
                USD {item.price.toFixed(2)}
              </div>

              <div className="col-span-2 text-right font-semibold text-audio-green">
                USD {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-8 pt-6 border-t border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500">
              Total ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
            </span>
            <span className="text-xl font-bold text-neutral-900">
              USD {totalPrice.toFixed(2)}
            </span>
          </div>
          <CheckoutButton />
        </div>
      </div>
    </>
  );
}
