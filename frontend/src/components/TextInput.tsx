import { useState } from 'react';
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';
import type { IconType } from 'react-icons';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';

interface IProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  required?: boolean;
  Icon: IconType;
  type?: 'text' | 'password' | 'email';
}

function TextInput<T extends FieldValues>({
  name,
  placeholder,
  register,
  required,
  Icon,
  type,
}: IProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="input-container bg-white">
      <Icon className="text-gray-400" size={20} />
      <input
        placeholder={placeholder}
        type={inputType}
        {...register(name, { required })}
        className="bg-transparent w-full text-gray-400 focus:outline-none"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 hover:text-audio-green transition-colors"
        >
          {showPassword ? (
            <MdOutlineVisibilityOff size={20} />
          ) : (
            <MdOutlineVisibility size={20} />
          )}
        </button>
      )}{' '}
    </div>
  );
}

export default TextInput;
