export default interface IProduct {
  id: string;
  name: string;
  picture: string;
  description: string;
  category: 'HEADPHONES' | 'HEADSETS';
  price: number;
  averageRating: number;
  totalReviews: number;
}
