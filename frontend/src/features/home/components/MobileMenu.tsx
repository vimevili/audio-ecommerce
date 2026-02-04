import { useCartStore } from '@/store';
import { useNavigate } from '@tanstack/react-router';
import { Menu, ShoppingCart } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';

export default function MobileMenu() {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="outline-none p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-48 bg-white rounded-md p-1 shadow-xl border border-gray-200 z-50 animate-in fade-in zoom-in-95"
          align="start"
          sideOffset={8}
        >
          <DropdownMenu.Item
            onClick={() => navigate({ to: '/cart' })}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 outline-none cursor-pointer hover:bg-gray-50 rounded-sm"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-audio-green" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-audio-green text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </div>
            Cart
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
