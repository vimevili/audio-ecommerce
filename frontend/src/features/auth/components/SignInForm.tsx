import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, PasswordInput, TextInput } from '../../../components';

interface IProps {
  showTitle?: boolean;
}

function SignInForm({ showTitle }: IProps) {
  const schema = z.object({
    email: z.email('Please, insert a valid email address.'),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

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
          Sign In
        </h2>
      )}
      <TextInput
        error={errors.email}
        name="email"
        placeholder="Email"
        register={register}
        Icon={Mail}
      />
      <PasswordInput register={register} watch={watch} page="sign-in" />
      <div className="flex flex-col gap-4">
        <Link
          to="/forgot-my-password"
          className={`audio-subtitle ${showTitle && 'text-black!'}`}
        >
          Forgot My Password
        </Link>

        <Button text="Sign In" styles="justify-center font-bold text-xl" />

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
