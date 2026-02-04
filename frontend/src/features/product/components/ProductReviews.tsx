import type IReview from '@/interfaces/IReview';
import { Star } from 'lucide-react';

interface ProductReviewsProps {
  averageRating: number;
  totalReviews: number;
  reviews: IReview[];
}

export default function ProductReviews({
  averageRating,
  totalReviews,
  reviews,
}: ProductReviewsProps) {
  const renderStars = (rating: number, size: 'sm' | 'md' = 'md') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const starSize = size === 'sm' ? 'size-4' : 'size-5';

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className={`${starSize} fill-audio-yellow text-audio-yellow`}
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className={`${starSize} text-neutral-300`} />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: '50%' }}
            >
              <Star
                className={`${starSize} fill-audio-yellow text-audio-yellow`}
              />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} className={`${starSize} text-neutral-300`} />);
      }
    }
    return stars;
  };

  return (
    <section className="mt-8 border-t border-neutral-200 pt-6">
      <h3 className="mb-4 text-lg font-semibold text-neutral-900">Reviews</h3>

      {/* Average Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {renderStars(averageRating)}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-neutral-900">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-sm text-neutral-500">
            ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="mt-6 space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
            >
              {/* Mini Header: Foto + Nome + Estrelas */}
              <div className="flex items-center gap-3">
                {review.userPicture ? (
                  <img
                    src={review.userPicture}
                    alt={review.userName}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-audio-yellow text-audio-yellow font-semibold">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="font-medium text-neutral-900">
                    {review.userName}
                  </p>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rate, 'sm')}
                  </div>
                </div>
              </div>

              {/* Descrição */}
              {review.content && (
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 text-start">
                  {review.content}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-neutral-500">
          No reviews yet. Be the first to review this product!
        </p>
      )}
    </section>
  );
}
