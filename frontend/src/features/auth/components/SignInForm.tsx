import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, PasswordInput, TextInput } from '../../../components';
import type { LoginRequest } from '../models';
import { authService } from '../services/authService';

interface IProps {
  showTitle?: boolean;
}

function SignInForm({ showTitle }: IProps) {
  const schema = z.object({
    login: z.email('Please, insert a valid email address.'),
    password: z.string().min(1, 'Password is required'),
  });
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  const { checkAuth } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: async () => {
      await checkAuth();
      navigate({ to: search.redirect || '/' });
    },
    onError: () => {
      const errorMessage = 'Incorrect e-mail or password!';

      setError('login', { type: 'manual', message: errorMessage });
      setError('password', { type: 'manual', message: errorMessage });
    },
  });

  async function onSubmit(data: LoginRequest) {
    loginMutation.mutate(data);
  }

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {showTitle && (
        <h2 className="audio-title text-5xl! text-black! text-left!">
          Sign In
        </h2>
      )}
      <TextInput
        error={errors.login}
        name="login"
        placeholder="Email"
        register={register}
        Icon={Mail}
      />
      <PasswordInput
        register={register}
        watch={watch}
        page="sign-in"
        error={errors.password}
      />
      <div className="flex flex-col gap-4">
        <Link
          to="/forgot-my-password"
          className={`audio-subtitle ${showTitle && 'text-black!'}`}
        >
          Forgot My Password
        </Link>

        <Button
          text="Sign In"
          styles="justify-center font-bold text-xl"
          type="submit"
        />

        <p className={`audio-subtitle ${showTitle && 'text-black!'}`}>
          Don't have an account?
          <Link
            to="/sign-up"
            className="text-audio-green underline underline-offset-1 ml-1"
          >
            Sign Up here
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignInForm;
