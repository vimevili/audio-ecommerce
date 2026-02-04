import type IProduct from '@/interfaces/IProduct';

interface ProductInfoProps {
  product: IProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <section className="mt-6">
      <div className="mb-2 inline-block rounded-full bg-neutral-100 px-3 py-1">
        <span className="text-xs font-medium uppercase text-neutral-600">
          {product.category.replace('_', ' ')}
        </span>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-neutral-900">
        {product.name}
      </h2>

      <div className="prose max-w-none">
        <p className="leading-relaxed text-neutral-600">
          {product.description}
        </p>
      </div>
    </section>
  );
}
