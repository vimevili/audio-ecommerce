import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Carousel from './Carousel';
import { render } from '@/test/utils';

vi.mock('embla-carousel-react', () => ({
  default: () => [vi.fn(), undefined],
}));

describe('Carousel', () => {
  it('should render children', () => {
    render(
      <Carousel>
        <div data-testid="slide-1">Slide 1</div>
      </Carousel>,
    );

    expect(screen.getByTestId('slide-1')).toBeInTheDocument();
  });

  it('should render multiple children correctly', () => {
    render(
      <Carousel>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Carousel>,
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should have correct container classes', () => {
    const { container } = render(
      <Carousel>
        <div>Content</div>
      </Carousel>,
    );

    const outerContainer = container.firstChild as HTMLElement;
    expect(outerContainer).toHaveClass('overflow-x-clip');
    expect(outerContainer).toHaveClass('w-full');
    expect(outerContainer).toHaveClass('h-full');
  });

  it('should have flex container for children', () => {
    const { container } = render(
      <Carousel>
        <div>Content</div>
      </Carousel>,
    );

    const flexContainer = container.querySelector('.flex');
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass('gap-4');
    expect(flexContainer).toHaveClass('touch-pan-y');
    expect(flexContainer).toHaveClass('h-full');
  });

  it('should accept options prop', () => {
    render(
      <Carousel
        options={{
          align: 'start',
          dragFree: true,
        }}
      >
        <div>Content</div>
      </Carousel>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
