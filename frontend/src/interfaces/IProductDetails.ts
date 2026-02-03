import type IReview from './IReview';

export default interface IProductDetails {
  id: string;
  name: string;
  picture: string;
  description: string;
  category: 'HEADPHONES' | 'HEADSETS';
  price: number;
  averageRating: number;
  totalReviews: number;
  reviews: IReview[];
}
