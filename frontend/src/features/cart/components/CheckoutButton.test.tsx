import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CheckoutButton from './CheckoutButton';
import { render } from '@/test/utils';

describe('CheckoutButton', () => {
  it('should render checkout button with correct text', () => {
    render(<CheckoutButton />);

    expect(screen.getByText('Proceed to Checkout')).toBeInTheDocument();
  });

  it('should render arrow icon', () => {
    render(<CheckoutButton />);

    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('should not have full width by default', () => {
    render(<CheckoutButton />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('w-full');
  });

  it('should have full width when fullWidth prop is true', () => {
    render(<CheckoutButton fullWidth />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('should log message when clicked', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<CheckoutButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith('Proceeding to checkout...');

    consoleSpy.mockRestore();
  });

  it('should have correct styling classes', () => {
    render(<CheckoutButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-audio-green');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('rounded-lg');
  });
});
