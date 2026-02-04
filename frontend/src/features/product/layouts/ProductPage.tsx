import { LoadingOverlay } from '@/components';
import { Navbar } from '@/features/home/components';
import useGetProduct from '@/hooks/queries/useGetProduct';
import { useCartStore } from '@/store';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { AddToCartBar } from '../components';
import ProductImage from '../components/ProductImage';
import ProductInfo from '../components/ProductInfo';
import ProductReviews from '../components/ProductReviews';

export default function ProductPage() {
  const { id } = useParams({ from: '/product/$id' });
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useGetProduct(id);
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-xl text-neutral-500">Product not found</p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="mt-4 text-audio-fill-audio-yellow hover:underline"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="size-4 fill-audio-yellow text-audio-yellow"
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="size-4 text-neutral-300" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: '50%' }}
            >
              <Star className="size-4 fill-audio-yellow text-audio-yellow" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} className="size-4 text-neutral-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="min-h-screen bg-white pb-28 lg:hidden">
        {/* Mobile Header */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-4 responsive-padding-x py-4">
            <button
              onClick={() => window.history.back()}
              className="rounded-full p-2 transition-colors hover:bg-neutral-100"
              aria-label="Go back"
            >
              <ArrowLeft className="size-6 text-neutral-900" />
            </button>
            <div className="flex-1 overflow-hidden">
              <h1 className="truncate text-lg font-semibold text-neutral-900">
                {product.name}
              </h1>
              <p className="text-xl font-bold text-audio-yellow">
                USD {product.price.toFixed(2)}
              </p>
            </div>
            <Link
              to="/cart"
              className="relative rounded-full p-2 transition-colors hover:bg-neutral-100"
              aria-label="Go to cart"
            >
              <ShoppingCart className="size-6 text-neutral-900" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex size-5 items-center justify-center rounded-full bg-audio-green text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Mobile Content */}
        <main className="responsive-padding pt-0">
          <ProductImage src={product.picture} alt={product.name} />
          <ProductInfo product={product} />
          <ProductReviews
            averageRating={product.averageRating}
            totalReviews={product.totalReviews}
            reviews={product.reviews}
          />
        </main>

        {/* Fixed Bottom Bar */}
        <AddToCartBar
          productId={product.id}
          productName={product.name}
          productPicture={product.picture}
          price={product.price}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:min-h-screen lg:flex-col lg:bg-[#F6F6F6]">
        <Navbar layout="desktop" />

        <div className="flex-1 max-w-375 w-full mx-auto px-6 py-8">
          {/* Main Container */}
          <div className="relative bg-white rounded-3xl shadow-sm overflow-hidden">
            {/* Content */}
            <div className="p-8">
              {/* Product Section - Image + Info */}
              <div className="flex gap-12">
                {/* Left Column - Image */}
                <div className="w-1/2">
                  <ProductImage src={product.picture} alt={product.name} />
                </div>

                {/* Right Column - Product Info */}
                <div className="w-1/2 flex flex-col justify-between gap-8">
                  <div className="flex flex-col gap-1 items-start">
                    <h1 className="text-3xl font-bold text-neutral-900">
                      {product.name}
                    </h1>
                    <p className="text-sm font-medium text-neutral-500">
                      USD {product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1">
                      {renderStars(product.averageRating)}
                      <p className="bold ml-2">{product.averageRating}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col flex-1 items-start gap-3">
                    <h3 className="text-lg  font-semibold text-neutral-900">
                      Highly Detailed Audio
                    </h3>
                    <p className="leading-relaxed text-neutral-600 text-start">
                      {product.description}
                    </p>
                  </div>

                  {/* Add to Cart */}
                  <div className="mt-8">
                    <AddToCartBar
                      productId={product.id}
                      productName={product.name}
                      productPicture={product.picture}
                      price={product.price}
                      isDesktop
                    />
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <ProductReviews
                averageRating={product.averageRating}
                totalReviews={product.totalReviews}
                reviews={product.reviews}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
