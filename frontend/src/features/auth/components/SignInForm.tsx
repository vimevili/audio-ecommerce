import { useAuth } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button, PasswordInput, TextInput } from '../../../components';
import type { ILoginRequest } from '../models';
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

  const { checkAuth } = useAuth();

  const resendEmailMutation = useMutation({
    mutationFn: (email: string) => authService.resendConfirmationEmail(email),
    onSuccess: async () => {
      toast.success('Confirmation e-mail sent!', {
        description: 'Please check your inbox.',
        duration: Infinity,
        closeButton: true,
      });
    },
    onError: (error) => {
      toast.error('Error', {
        description: error.message,
        duration: Infinity,
        closeButton: true,
      });
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: ILoginRequest) => authService.login(data),
    onSuccess: async () => {
      await checkAuth();

      setTimeout(() => {
        navigate({ to: '/sign-in' });
      }, 3000);
    },
    onError: (error: Error, variables) => {
      const isInactive = error.message.includes('not activated');

      if (isInactive) {
        toast.warning('Account Is Not Activated', {
          description: 'You need to confirm your e-mail to log in.',
          duration: Infinity,
          closeButton: true,
          style: {
            flexDirection: 'column',
            justifyContent: 'center',
          },
          action: {
            label: 'Resend E-mail',
            onClick: () => resendEmailMutation.mutate(variables.login),
          },
          classNames: {
            actionButton: 'bg-[#0acf83] ml-0',
          },
        });
      } else {
        toast.error('Error', { description: error.message });
        setError('login', { type: 'manual' });
        setError('password', { type: 'manual' });
      }
    },
  });

  async function onSubmit(data: ILoginRequest) {
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
