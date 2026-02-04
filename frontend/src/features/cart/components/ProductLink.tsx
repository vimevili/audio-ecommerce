import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

interface ProductLinkProps {
  productId: string;
  children: ReactNode;
  className?: string;
}

export default function ProductLink({
  productId,
  children,
  className = '',
}: ProductLinkProps) {
  return (
    <Link
      to="/product/$id"
      params={{ id: productId }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </Link>
  );
}
