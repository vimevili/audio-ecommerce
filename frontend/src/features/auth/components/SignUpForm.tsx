import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User } from 'lucide-react';
import * as z from 'zod';
import { Button, PasswordInput, TextInput } from '../../../components';

interface IProps {
  showTitle?: boolean;
}

function SignUpForm({ showTitle }: IProps) {
  const schema = z.object({
    username: z
      .string()
      .min(5, 'The username must be at least 5 characters long.'),
    email: z.email('Please, insert a valid email address.'),
    password: z
      .string()
      .min(8, 'The password must be at least 8 characters long.')
      .regex(/[A-Z]/, 'Needs an uppercase letter.')
      .regex(/[a-z]/, 'Needs a lowercase letter.')
      .regex(/[0-9]/, 'Needs a number.')
      .regex(/[^A-Za-z0-9]/, 'Needs a special character (!@#$%).'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);
  }

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
        name="username"
        placeholder="Username"
        register={register}
        error={errors.username}
        Icon={User}
      />
      <TextInput
        name="email"
        placeholder="Email"
        register={register}
        error={errors.email}
        Icon={Mail}
      />
      <PasswordInput
        register={register}
        watch={watch}
        page="sign-up"
        error={errors.password}
      />
      <div className="flex flex-col gap-4">
        <Button
          text="Sign Up"
          styles="justify-center font-bold text-xl"
          type="submit"
        />

        <p className={`audio-subtitle ${showTitle && 'text-black!'}`}>
          Already have an account?
          <Link
            to="/sign-in"
            className="text-audio-green underline underline-offset-1 ml-1"
          >
            Sign In here
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignUpForm;
