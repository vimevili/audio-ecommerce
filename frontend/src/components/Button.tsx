import type { LucideProps } from 'lucide-react';

interface IProps {
  text: string;
  styles?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  type?: 'button' | 'reset' | 'submit';
}

function Button({ text, styles, Icon, type }: IProps) {
  return (
    <button
      type={type ?? 'button'}
      className={`input-container cursor-pointer bg-audio-green text-white focus:outline-none ${styles}`}
    >
      {text}
      {Icon && <Icon className="text-white" size={20} />}
    </button>
  );
}

export default Button;
