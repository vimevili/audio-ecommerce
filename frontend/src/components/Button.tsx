import type { IconType } from 'react-icons';

interface IProps {
  text: string;
  styles?: string;
  Icon?: IconType;
  type?: 'button' | 'reset' | 'submit';
}

function TextInput({ text, styles, Icon, type }: IProps) {
  return (
    <div className="input-container bg-audio-green">
      <button
        type={type ?? 'button'}
        className={`bg-transparent text-white focus:outline-none text-st ${styles}`}
      >
        {text}
      </button>
      {Icon && <Icon className="text-white" size={20} />}
    </div>
  );
}

export default TextInput;
