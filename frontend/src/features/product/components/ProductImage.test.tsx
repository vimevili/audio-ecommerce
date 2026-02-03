import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductImage from './ProductImage';
import { render } from '@/test/utils';

describe('ProductImage', () => {
  const defaultProps = {
    src: 'https://example.com/headphone.jpg',
    alt: 'Premium Wireless Headphone',
  };

  it('should render image with correct src', () => {
    render(<ProductImage {...defaultProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', defaultProps.src);
  });

  it('should render image with correct alt text', () => {
    render(<ProductImage {...defaultProps} />);

    const image = screen.getByAltText('Premium Wireless Headphone');
    expect(image).toBeInTheDocument();
  });

  it('should have eager loading attribute', () => {
    render(<ProductImage {...defaultProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('should have rounded container', () => {
    const { container } = render(<ProductImage {...defaultProps} />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('rounded-2xl');
  });

  it('should have aspect-square class for consistent sizing', () => {
    const { container } = render(<ProductImage {...defaultProps} />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('aspect-square');
  });
});
