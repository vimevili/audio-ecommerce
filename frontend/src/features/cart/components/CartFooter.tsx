import { CheckoutButton } from './';

interface CartFooterProps {
  totalItems: number;
  totalPrice: number;
}

export default function CartFooter({
  totalItems,
  totalPrice,
}: CartFooterProps) {
  return (
    <div className="border-t border-neutral-200 bg-white responsive-padding">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-neutral-500">
          Total {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
        <span className="text-xl font-bold text-neutral-900">
          USD {totalPrice.toFixed(2)}
        </span>
      </div>
      <CheckoutButton fullWidth />
    </div>
  );
}
