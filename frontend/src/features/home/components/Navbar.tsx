import { CircleUser, Menu } from 'lucide-react';

export default function Navbar() {
  const layout = {
    mobile: {
      menuIcon: <Menu />,
      avatarIcon: <CircleUser />,
    },
  };
  return (
    <nav className="w-full flex justify-between p-6 pb-0">
      {layout.mobile.menuIcon}
      {layout.mobile.avatarIcon}
    </nav>
  );
}
