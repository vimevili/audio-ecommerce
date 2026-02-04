import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { passwordRules } from '@/domain/config';
import { useAvailabilityCheck } from '@/hooks';
import getDynamicIcon from '@/utils/getDynamicIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Mail, User } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';
import z from 'zod';
import { Button, PasswordInput, TextInput } from '../../../components';
import type { IRegisterRequest } from '../models';
import { authService } from '../services/authService';

interface IProps {
  showTitle?: boolean;
}

function SignUpForm({ showTitle }: IProps) {
  const schema = z.object({
    name: z
      .string()
      .min(3, 'The name is too short!')
      .max(100, 'The name is too long!'),
    username: z
      .string()
      .min(5, 'The username must be at least 5 characters long.'),
    email: z.email('Please, insert a valid email address.'),
    password: passwordRules,
  });

  type SignUpSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const usernameValue = watch('username');
  const {
    isLoading: checkingUsername,
    isFetched: usernameFetched,
    isAvailable: isUsernameAvailable,
  } = useAvailabilityCheck({
    value: usernameValue,
    name: 'username',
    checkFn: authService.verifyUsername,
    queryKey: 'check-username',
    setError,
    clearErrors,
    errorMessage: 'This username is already taken.',
    enabled: usernameValue?.length >= 5,
  });

  const emailValue = watch('email');
  const {
    isLoading: checkingEmail,
    isFetched: emailFetched,
    isAvailable: isEmailAvailable,
  } = useAvailabilityCheck({
    value: emailValue,
    name: 'email',
    checkFn: authService.verifyEmail,
    queryKey: 'check-email',
    setError,
    clearErrors,
    errorMessage: 'This e-mail is already registered.',
    enabled: emailValue?.includes('@') && emailValue?.includes('.'),
  });

  const registerMutation = useMutation({
    mutationFn: (data: IRegisterRequest) => authService.register(data),
    onSuccess: () => {
      toast.success('Account created successfully!', {
        description: 'Please check your inbox for a confirmation email.',
        duration: Infinity,
        closeButton: true,
      });
    },
    onError: (error) => {
      toast.error('Error', { description: error.message });
    },
  });

  function onSubmit(data: SignUpSchema) {
    if (checkingUsername || checkingEmail) return;
    registerMutation.mutate(data);
  }

  const buttonText = () => {
    if (registerMutation.isPending) {
      return 'Creating Your Account...';
    } else if (registerMutation.isSuccess) {
      return 'Account Created!';
    } else {
      return 'Sign Up';
    }
  };

  const UsernameIcon = useMemo(
    () =>
      getDynamicIcon(
        User,
        checkingUsername,
        !!usernameFetched,
        isUsernameAvailable,
        errors.username,
      ),
    [checkingUsername, usernameFetched, isUsernameAvailable, errors.username],
  );

  const EmailIcon = useMemo(
    () =>
      getDynamicIcon(
        Mail,
        checkingEmail,
        !!emailFetched,
        isEmailAvailable,
        errors.email,
      ),
    [checkingEmail, emailFetched, isEmailAvailable, errors.email],
  );

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {showTitle && (
        <h2 className="audio-title text-5xl! text-black! text-left!">
          Sign Up
        </h2>
      )}
      <TextInput
        name="name"
        placeholder="Name"
        register={register}
        error={errors.name}
        Icon={User}
        disabled={registerMutation.isPending}
      />
      <TextInput
        name="username"
        placeholder="Username"
        register={register}
        error={errors.username}
        Icon={UsernameIcon}
        disabled={registerMutation.isPending}
      />

      <TextInput
        name="email"
        placeholder="Email"
        register={register}
        error={errors.email}
        Icon={EmailIcon}
        disabled={registerMutation.isPending}
      />

      <PasswordInput
        register={register}
        watch={watch}
        page="sign-up"
        error={errors.password}
        disabled={registerMutation.isPending}
      />
      <div className="flex flex-col gap-4">
        <Button
          text={buttonText()}
          disabled={registerMutation.isSuccess}
          styles="justify-center font-bold text-xl"
          type="submit"
        />

        <p className={`audio-subtitle ${showTitle && 'text-black!'}`}>
          Already have an account?
          <Link
            to="/sign-in"
            className="text-audio-green underline underline-offset-1 ml-1"
            disabled={registerMutation.isPending}
          >
            Sign In here
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignUpForm;
