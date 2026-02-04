import { Link } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex size-32 items-center justify-center rounded-full bg-neutral-100">
        <ShoppingCart className="size-12 text-audio-yellow" strokeWidth={1.5} />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-neutral-900">
        Your cart is <span className="text-audio-yellow">empty</span>
      </h2>
      <p className="mt-2 text-center text-sm text-neutral-500 max-w-xs">
        You haven't added anything to your cart. Go ahead and explore our page
      </p>

      <Link
        to="/"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-audio-green px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-[0.98]"
      >
        See all products
      </Link>
    </div>
  );
}
