import { AvatarMenu } from '@/components';
import { logoSvg } from '@/assets';
import { ShoppingCart } from 'lucide-react';
import { MobileMenu, SearchBar } from './';

interface NavbarProps {
  layout: 'mobile' | 'desktop';
}

export default function Navbar({ layout }: NavbarProps) {
  if (layout === 'mobile') {
    return (
      <nav className="w-full flex justify-between items-center p-6 pb-0 sm:p-12 sm:pb-0">
        <MobileMenu />
        <AvatarMenu />
      </nav>
    );
  }

  // Desktop layout
  return (
    <nav className="w-full bg-white shadow-sm shrink-0">
      <div className="max-w-375 mx-auto px-6 py-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 shrink-0">
          <img src={logoSvg} alt="Audio" className="w-10 h-10" />
          <span className="audio-title text-3xl! text-black!">Audio</span>
        </div>

        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <button className="flex items-center gap-2 hover:text-audio-green transition-colors">
            <ShoppingCart size={22} className="text-gray-700" />
            <span className="text-gray-700 text-sm font-medium">Cart</span>
          </button>
          <AvatarMenu />
        </div>
      </div>
    </nav>
  );
}
