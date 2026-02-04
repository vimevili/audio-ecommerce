import { ConfirmDialog } from '@/components';
import { useCartStore, type CartItem as CartItemType } from '@/store';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ProductLink, QuantitySelector } from './';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { incrementQuantity, decrementQuantity, removeItem } = useCartStore();
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  const handleRemove = () => {
    removeItem(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  return (
    <>
      <ConfirmDialog
        open={showRemoveDialog}
        onOpenChange={setShowRemoveDialog}
        title="Remove Item"
        description={`Are you sure you want to remove "${item.name}" from your cart?`}
        confirmLabel="Yes, remove"
        cancelLabel="Keep it"
        onConfirm={handleRemove}
      />
      <div className="flex items-center gap-4 py-4">
        <ProductLink
          productId={item.id}
          className="size-20 shrink-0 rounded-xl bg-neutral-100 overflow-hidden"
        >
          <img
            src={item.picture}
            alt={item.name}
            className="size-full object-cover object-center"
          />
        </ProductLink>

        <div className="flex-1 min-w-0">
          <ProductLink
            productId={item.id}
            className="font-medium text-neutral-900 truncate block hover:underline"
          >
            {item.name}
          </ProductLink>
          <p className="text-sm text-audio-green font-semibold">
            USD {item.price.toFixed(2)}
          </p>

          <div className="mt-2">
            <QuantitySelector
              quantity={item.quantity}
              onIncrement={() => incrementQuantity(item.id)}
              onDecrement={() => decrementQuantity(item.id)}
              size="sm"
            />
          </div>
        </div>

        <button
          onClick={() => setShowRemoveDialog(true)}
          className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-500"
          aria-label="Remove item"
        >
          <Trash2 className="size-5" />
        </button>
      </div>
    </>
  );
}
