import type { LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface IProps {
  text: string;
  styles?: string;
  Icon?: LucideIcon;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ text, styles, Icon, type, disabled, onClick }: IProps) {
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      className={twMerge(
        'input-container cursor-pointer bg-audio-green text-white focus:outline-none disabled:bg-[#899993] disabled:cursor-auto',
        styles,
      )}
      disabled={disabled}
    >
      {text}
      {Icon && <Icon className="text-white " size={20} />}
    </button>
  );
}

export default Button;
