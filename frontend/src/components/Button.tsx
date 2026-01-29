import type { LucideIcon } from 'lucide-react';

interface IProps {
  text: string;
  styles?: string;
  Icon?: LucideIcon;
  type?: 'button' | 'reset' | 'submit';
  disabled?: boolean;
}

function Button({ text, styles, Icon, type, disabled }: IProps) {
  return (
    <button
      type={type ?? 'button'}
      className={`input-container cursor-pointer bg-audio-green text-white focus:outline-none ${styles} disabled:bg-[#899993] disabled:cursor-auto`}
      disabled={disabled}
    >
      {text}
      {Icon && <Icon className="text-white " size={20} />}
    </button>
  );
}

export default Button;
