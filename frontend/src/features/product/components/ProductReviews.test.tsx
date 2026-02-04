import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductReviews from './ProductReviews';
import { render } from '@/test/utils';
import type IReview from '@/interfaces/IReview';

describe('ProductReviews', () => {
  const mockReviews: IReview[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      userPicture: 'https://example.com/john.jpg',
      rate: 5,
      content: 'Amazing headphones! Best purchase ever.',
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Jane Smith',
      userPicture: null,
      rate: 4,
      content: 'Great sound quality, comfortable to wear.',
    },
  ];

  const defaultProps = {
    averageRating: 4.5,
    totalReviews: 2,
    reviews: mockReviews,
  };

  it('should render the Reviews title', () => {
    render(<ProductReviews {...defaultProps} />);

    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  it('should display the average rating', () => {
    render(<ProductReviews {...defaultProps} />);

    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should display the total number of reviews', () => {
    render(<ProductReviews {...defaultProps} />);

    expect(screen.getByText('(2 reviews)')).toBeInTheDocument();
  });

  it('should use singular "review" when there is only one review', () => {
    render(<ProductReviews {...defaultProps} totalReviews={1} />);

    expect(screen.getByText('(1 review)')).toBeInTheDocument();
  });

  it('should render all reviews', () => {
    render(<ProductReviews {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render review content', () => {
    render(<ProductReviews {...defaultProps} />);

    expect(
      screen.getByText('Amazing headphones! Best purchase ever.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Great sound quality, comfortable to wear.'),
    ).toBeInTheDocument();
  });

  it('should render user picture when available', () => {
    render(<ProductReviews {...defaultProps} />);

    const userImage = screen.getByAltText('John Doe');
    expect(userImage).toBeInTheDocument();
    expect(userImage).toHaveAttribute('src', 'https://example.com/john.jpg');
  });

  it('should render initial when user picture is not available', () => {
    render(<ProductReviews {...defaultProps} />);

    // Jane Smith has no picture, should show "J" as initial
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('should show empty state when there are no reviews', () => {
    render(<ProductReviews averageRating={0} totalReviews={0} reviews={[]} />);

    expect(
      screen.getByText('No reviews yet. Be the first to review this product!'),
    ).toBeInTheDocument();
  });

  it('should handle review without content', () => {
    const reviewWithoutContent: IReview[] = [
      {
        id: '3',
        userId: 'user3',
        userName: 'Bob Wilson',
        userPicture: null,
        rate: 3,
        content: '',
      },
    ];

    render(
      <ProductReviews
        averageRating={3}
        totalReviews={1}
        reviews={reviewWithoutContent}
      />,
    );

    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
    // Content should not be rendered when empty
  });
});
