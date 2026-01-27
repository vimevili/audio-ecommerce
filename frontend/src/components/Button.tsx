import type { IconType } from 'react-icons';

interface IProps {
  text: string;
  styles?: string;
  Icon?: IconType;
  type?: 'button' | 'reset' | 'submit';
}

function Button({ text, styles, Icon, type }: IProps) {
  return (
    <button
      type={type ?? 'button'}
      className={`input-container bg-audio-green text-white focus:outline-none text-st ${styles}`}
    >
      {text}
      {Icon && <Icon className="text-white" size={20} />}
    </button>
  );
}

export default Button;
