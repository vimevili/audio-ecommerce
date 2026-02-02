import { Route } from '@/routes/index';
import { DropdownMenu } from 'radix-ui';
import { Menu, ShoppingCart, Headphones, Gamepad2 } from 'lucide-react';

export default function MobileMenu() {
  const navigate = Route.useNavigate();

  const handleNavigate = (category?: 'HEADPHONES' | 'HEADSETS') => {
    navigate({
      to: '.',
      search: category ? { category } : {},
      replace: true,
    });
  };

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
            onClick={() => handleNavigate('HEADPHONES')}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 outline-none cursor-pointer hover:bg-gray-50 rounded-sm"
          >
            <Headphones className="w-4 h-4 text-audio-green" />
            Headphones
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => handleNavigate('HEADSETS')}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 outline-none cursor-pointer hover:bg-gray-50 rounded-sm"
          >
            <Gamepad2 className="w-4 h-4 text-audio-green" />
            Headsets
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

          <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 outline-none cursor-pointer hover:bg-gray-50 rounded-sm">
            <ShoppingCart className="w-4 h-4 text-audio-green" />
            Cart
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
