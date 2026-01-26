import { useForm } from 'react-hook-form';
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { Button, TextInput } from '../../../components';
import { Link } from '@tanstack/react-router';
import { authService } from '../services/authService';

interface IProps {
  type: 'sign-in' | 'sign-up';
}

function AuthForm({ type }: IProps) {
  const { register } = useForm();
  const config = {
    'sign-in': {
      buttonText: 'Sign In',
      linkText: "Don't have an account?",
      linkTo: '/sign-up',
      linkAction: 'Sign Up here',
      authAction: authService.login,
    },
    'sign-up': {
      buttonText: 'Sign Up',
      linkText: 'Already have an account?',
      linkTo: '/sign-in',
      linkAction: 'Sign In here',
      authAction: authService.register,
    },
  }[type];

  return (
    <form className="w-full flex flex-col gap-4">
      <TextInput
        name="email"
        placeholder="Email"
        register={register}
        Icon={HiOutlineMail}
      />
      <TextInput
        name="password"
        placeholder="Password"
        type="password"
        register={register}
        Icon={HiOutlineLockClosed}
      />
      <div className="flex flex-col gap-4">
        {type === 'sign-in' && (
          <Link to="/forgot-my-password" className="text-sm text-white">
            Forgot My Password
          </Link>
        )}

        <Button
          text={config.buttonText}
          styles="font-bold w-full bg-audio-green"
        />

        <p className="text-white text-sm">
          {config.linkText}
          <Link
            to={config.linkTo}
            className="text-audio-green underline underline-offset-1 ml-1"
          >
            {config.linkAction}
          </Link>
        </p>
      </div>
    </form>
  );
}

export default AuthForm;
