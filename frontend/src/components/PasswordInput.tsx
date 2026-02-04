import { Check, Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';
import type {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import TextInput from './TextInput';

interface IProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  page?: 'sign-in' | 'sign-up' | 'reset';
  error: FieldError | undefined;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
}

const requirements = [
  { id: 1, label: '8+ characters', regex: /.{8,}/ },
  { id: 2, label: 'Upper Case', regex: /[A-Z]/ },
  { id: 3, label: 'Number', regex: /[0-9]/ },
  { id: 4, label: 'Special Character (!@#$%...)', regex: /[^A-Za-z0-9]/ },
];

export default function PasswordInput<T extends FieldValues>({
  register,
  watch,
  page,
  error,
  name,
  placeholder,
  disabled,
}: IProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? 'text' : 'password';
  const passwordValue = watch(
    'password' as Path<T>,
    '' as PathValue<T, Path<T>>,
  );

  const toggleIcon = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-gray-400 hover:text-audio-green transition-colors"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );
  return (
    <div className="space-y-3">
      <TextInput
        name={(name ?? 'password') as Path<T>}
        type={inputType}
        register={register}
        error={error}
        Icon={Lock}
        placeholder={placeholder ?? 'Password'}
        rightElement={toggleIcon}
        disabled={disabled}
      />

      {page === 'sign-up' && (
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
          {requirements.map((req) => {
            const isValid = req.regex.test(passwordValue);
            return (
              <div
                key={req.id}
                className={`flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider transition-colors ${
                  isValid ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${
                    isValid
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {isValid && <Check size={8} strokeWidth={4} />}
                </div>
                {req.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
