import { AvatarMenu } from '@/components';
import { logoSvg } from '@/assets';
import { useCartStore } from '@/store';
import { Link } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import { MobileMenu, SearchBar } from './';

interface NavbarProps {
  layout: 'mobile' | 'desktop';
}

export default function Navbar({ layout }: NavbarProps) {
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (layout === 'mobile') {
    return (
      <nav className="w-full flex justify-between items-center responsive-padding-x pt-6">
        <MobileMenu />
        <AvatarMenu />
      </nav>
    );
  }

  // Desktop layout
  return (
    <nav className="w-full bg-white shadow-sm shrink-0">
      <div className="max-w-375 mx-auto px-6 py-4 flex items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logoSvg} alt="Audio" className="w-10 h-10" />
          <span className="audio-title text-3xl! text-black!">Audio</span>
        </Link>

        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <Link
            to="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ShoppingCart size={22} className="text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex size-5 items-center justify-center rounded-full bg-audio-green text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <AvatarMenu />
        </div>
      </div>
    </nav>
  );
}
