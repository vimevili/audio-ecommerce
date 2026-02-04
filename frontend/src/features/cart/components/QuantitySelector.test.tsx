import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import QuantitySelector from './QuantitySelector';
import { render } from '@/test/utils';

describe('QuantitySelector', () => {
  const defaultProps = {
    quantity: 2,
    onIncrement: vi.fn(),
    onDecrement: vi.fn(),
  };

  it('should render quantity value', () => {
    render(<QuantitySelector {...defaultProps} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render increment and decrement buttons', () => {
    render(<QuantitySelector {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /increase quantity/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /decrease quantity/i }),
    ).toBeInTheDocument();
  });

  it('should call onIncrement when plus button is clicked', () => {
    const onIncrement = vi.fn();
    render(<QuantitySelector {...defaultProps} onIncrement={onIncrement} />);

    const incrementButton = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    fireEvent.click(incrementButton);

    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it('should call onDecrement when minus button is clicked', () => {
    const onDecrement = vi.fn();
    render(<QuantitySelector {...defaultProps} onDecrement={onDecrement} />);

    const decrementButton = screen.getByRole('button', {
      name: /decrease quantity/i,
    });
    fireEvent.click(decrementButton);

    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it('should disable decrement button when quantity is 1', () => {
    render(<QuantitySelector {...defaultProps} quantity={1} />);

    const decrementButton = screen.getByRole('button', {
      name: /decrease quantity/i,
    });
    expect(decrementButton).toBeDisabled();
  });

  it('should not disable decrement button when quantity is greater than 1', () => {
    render(<QuantitySelector {...defaultProps} quantity={2} />);

    const decrementButton = screen.getByRole('button', {
      name: /decrease quantity/i,
    });
    expect(decrementButton).not.toBeDisabled();
  });

  it('should render small size by default', () => {
    render(<QuantitySelector {...defaultProps} />);

    const incrementButton = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    expect(incrementButton).toHaveClass('size-7');
  });

  it('should render medium size when size prop is md', () => {
    render(<QuantitySelector {...defaultProps} size="md" />);

    const incrementButton = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    expect(incrementButton).toHaveClass('size-8');
  });
});
