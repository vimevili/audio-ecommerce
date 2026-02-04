import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductLink from './ProductLink';
import { renderWithRouter } from '@/test/utils';

describe('ProductLink', () => {
  it('should render children', async () => {
    await renderWithRouter(
      <ProductLink productId="123">
        <span>Product Name</span>
      </ProductLink>,
    );

    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });

  it('should have cursor-pointer class', async () => {
    await renderWithRouter(
      <ProductLink productId="123">
        <span>Click me</span>
      </ProductLink>,
    );

    const link = screen.getByText('Click me').closest('a');
    expect(link).toHaveClass('cursor-pointer');
  });

  it('should apply custom className', async () => {
    await renderWithRouter(
      <ProductLink productId="123" className="custom-class">
        <span>Link Text</span>
      </ProductLink>,
    );

    const link = screen.getByText('Link Text').closest('a');
    expect(link).toHaveClass('custom-class');
  });

  it('should render as a link element', async () => {
    await renderWithRouter(
      <ProductLink productId="456">
        <span>Product</span>
      </ProductLink>,
    );

    const link = screen.getByText('Product').closest('a');
    expect(link).toBeInTheDocument();
    expect(link?.tagName.toLowerCase()).toBe('a');
  });
});
