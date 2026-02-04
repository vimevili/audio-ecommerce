import { ArrowRight } from 'lucide-react';

interface CheckoutButtonProps {
  fullWidth?: boolean;
}

export default function CheckoutButton({
  fullWidth = false,
}: CheckoutButtonProps) {
  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
  };

  return (
    <button
      onClick={handleCheckout}
      className={`${fullWidth ? 'w-full' : ''} flex items-center justify-center gap-2 rounded-lg bg-audio-green px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-[0.98]`}
    >
      <span>Proceed to Checkout</span>
      <ArrowRight className="size-5" />
    </button>
  );
}
