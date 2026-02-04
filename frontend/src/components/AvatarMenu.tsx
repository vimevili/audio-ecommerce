import { useAuth } from '@/hooks';
import { CircleUser, LogOut } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';

export default function AvatarMenu() {
  const { user, logout, isAuthenticated } = useAuth();

  const profilePicture = user?.picture ? (
    <img
      src={user.picture}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <CircleUser className="w-full h-full text-audio-green" />
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="relative h-10 w-10 rounded-full border-2 border-audio-green overflow-hidden outline-none">
          {profilePicture}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-50 bg-white rounded-md p-1 shadow-xl border border-gray-200 z-50 animate-in fade-in zoom-in-95"
          align="end"
        >
          <DropdownMenu.Item
            onClick={() => logout()}
            className="flex items-center gap-2 px-2 py-2 text-sm text-red-600 outline-none cursor-pointer hover:bg-red-50 rounded-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
