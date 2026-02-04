import { ConfirmDialog } from '@/components';
import { Navbar } from '@/features/home/components';
import { useAuth } from '@/hooks';
import { useCartStore } from '@/store';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CartFooter, CartItem, CartTable, EmptyCart } from '../components';

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, clearCart, getTotalItems, getTotalPrice } = useCartStore();
  const [showClearDialog, setShowClearDialog] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning('Login Required', {
        description: 'You need to be logged in to proceed with checkout.',
        duration: 5000,
        action: {
          label: 'Sign In',
          onClick: () =>
            navigate({ to: '/sign-in', search: { redirect: '/cart' } }),
        },
        style: {
          flexDirection: 'column',
        },
      });
    }
  }, [isAuthenticated, navigate]);

  const isEmpty = items.length === 0;
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared successfully');
  };

  return (
    <>
      <ConfirmDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
        title="Clear Cart"
        description="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmLabel="Yes, clear cart"
        cancelLabel="Cancel"
        onConfirm={handleClearCart}
      />

      <div className="flex min-h-screen flex-col bg-white lg:hidden">
        <header className="flex items-center justify-between responsive-padding-x pt-6">
          <button
            onClick={() => window.history.back()}
            className="rounded-full p-2 transition-colors hover:bg-neutral-100"
            aria-label="Go back"
          >
            <ArrowLeft className="size-6 text-neutral-900" />
          </button>
          <h1 className="text-lg font-semibold text-neutral-900">
            Shopping Cart
          </h1>
          <button
            onClick={() => setShowClearDialog(true)}
            disabled={isEmpty}
            className="rounded-full p-2 transition-colors hover:bg-neutral-100 disabled:opacity-40"
            aria-label="Clear cart"
          >
            <Trash2 className="size-5 text-neutral-500" />
          </button>
        </header>

        <main className="flex-1 responsive-padding-x">
          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </main>

        {!isEmpty && (
          <CartFooter totalItems={totalItems} totalPrice={totalPrice} />
        )}
      </div>

      <div className="hidden lg:flex lg:min-h-screen lg:flex-col lg:bg-[#F6F6F6]">
        <Navbar layout="desktop" />

        <div className="flex-1 max-w-375 w-full mx-auto px-6 py-8">
          <div className="flex items-center justify-center mb-8 relative">
            <h1 className="text-2xl font-bold text-neutral-900">
              Shopping Cart
            </h1>
            {!isEmpty && (
              <button
                onClick={() => setShowClearDialog(true)}
                className="absolute right-0 rounded-full p-2 transition-colors hover:bg-white/80 text-neutral-500 hover:text-red-500"
                aria-label="Clear cart"
              >
                <Trash2 className="size-5" />
              </button>
            )}
          </div>

          {isEmpty ? (
            <div className="bg-white rounded-3xl shadow-sm p-12 flex items-center justify-center">
              <EmptyCart />
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              <CartTable
                items={items}
                totalItems={totalItems}
                totalPrice={totalPrice}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
