import type IProduct from '@/interfaces/IProduct';
import { Link } from '@tanstack/react-router';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="aspect-square bg-white rounded-xl mb-4 overflow-hidden">
        <img
          src={product.picture}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
          {product.name}
        </h4>
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">USD {product.price}</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>⭐</span>
            <span>{product.averageRating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
