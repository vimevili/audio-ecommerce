import type { LucideIcon } from 'lucide-react';
import {
  type FieldError,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';

interface IProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  required?: boolean;
  Icon?: LucideIcon;
  type?: 'text' | 'password' | 'email';
  autoComplete?: string;
  rightElement?: React.ReactNode;
  error: FieldError | undefined;
  styles?: string;
  disabled?: boolean;
}

function TextInput<T extends FieldValues>({
  name,
  placeholder,
  register,
  required,
  Icon,
  type,
  autoComplete,
  rightElement,
  error,
  styles,
  disabled,
}: IProps<T>) {
  const borderClass = error
    ? 'border-red-500 text-red-500'
    : 'border-transparent focus-within:border-audio-green focus-within:text-audio-green';

  return (
    <div className="flex flex-col gap-1 justify-end">
      <div
        className={`input-container bg-white text-gray-400 transition-all border ${borderClass} ${styles}`}
      >
        {Icon && <Icon className="transition-colors shrink-0" size={20} />}

        <input
          placeholder={placeholder}
          type={type || 'text'}
          autoComplete={autoComplete}
          {...register(name, { required })}
          className={`text-md md:text-lg outline-none w-full bg-transparent text-gray-400 ${error ? 'focus:text-red-500' : 'focus:text-audio-green'} transition-colors placeholder:text-gray-400 `}
          disabled={disabled}
        />

        {rightElement && (
          <div className="flex items-center justify-center">{rightElement}</div>
        )}
      </div>
      {error && (
        <p className="w-fit text-xs text-red-300 md:text-red-500 ml-1 animate-in fade-in slide-in-from-top-1 bg-zinc-800/80 md:bg-transparent">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default TextInput;
