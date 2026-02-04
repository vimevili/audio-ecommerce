import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  size = 'sm',
}: QuantitySelectorProps) {
  const isSmall = size === 'sm';
  const buttonSize = isSmall ? 'size-7' : 'size-8';
  const iconSize = isSmall ? 'size-3' : 'size-4';
  const buttonStyle = isSmall
    ? 'rounded-full border-neutral-300'
    : 'rounded-lg border-neutral-200';

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        disabled={quantity <= 1}
        className={`flex ${buttonSize} items-center justify-center border text-neutral-500 transition-colors hover:bg-neutral-100 disabled:opacity-40 ${buttonStyle}`}
        aria-label="Decrease quantity"
      >
        <Minus className={iconSize} />
      </button>
      <span
        className={`${isSmall ? 'w-6 text-sm' : 'w-8'} text-center font-medium text-neutral-900`}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className={`flex ${buttonSize} items-center justify-center border text-neutral-500 transition-colors hover:bg-neutral-100 ${buttonStyle}`}
        aria-label="Increase quantity"
      >
        <Plus className={iconSize} />
      </button>
    </div>
  );
}
