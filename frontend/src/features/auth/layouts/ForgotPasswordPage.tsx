import { bgForgot, logoSvg } from '@/assets';
import { Button, TextInput } from '@/components';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Mail, FileQuestionMark } from 'lucide-react';

const gradientBg = 'bg-linear-to-tr from-green-200 to-purple-200';
const styledQuestionIcon = 'text-audio-green text-8xl mb-4';
const footer = () => (
  <footer className="flex items-center justify-center gap-2 pb-4">
    <img src={logoSvg} alt="Logo" className="h-8 md:h-12" />
    <span className="audio-title text-3xl! md:text-4xl! text-gray-600!">
      Audio
    </span>
  </footer>
);

const MobileLayout = () => {
  const { register } = useForm();

  return (
    <main
      className={`min-h-screen w-full flex flex-col p-8 ${gradientBg} relative`}
    >
      <Link
        to="/sign-in"
        className="absolute top-8 left-8 text-gray-600 text-lg"
      >
        <ArrowLeft />
      </Link>

      <div className="flex-1 flex flex-col justify-center items-center">
        <header className="text-center mb-12 flex flex-col items-center">
          <FileQuestionMark className={styledQuestionIcon} />
          <h1 className="audio-title text-xl! text-audio-green!">
            Forgot your password?
          </h1>
          <p className="text-gray-600 font-light">We can help you out</p>
        </header>

        <form className="w-full max-w-sm flex flex-col gap-4">
          <TextInput
            error={undefined}
            name="email"
            placeholder="Email"
            register={register}
            required
            Icon={Mail}
          />
          <Button text="Send Email" styles="font-bold justify-center!" />
        </form>
      </div>

      {footer()}
    </main>
  );
};

function DesktopLayout() {
  const { register } = useForm();

  return (
    <main className="min-h-screen w-full flex">
      <section className={`w-[60%] flex flex-col ${gradientBg} p-16 relative`}>
        <Link
          to="/sign-in"
          className="absolute top-12 left-12 text-white text-3xl hover:scale-110 transition-transform"
        >
          <ArrowLeft />
        </Link>

        <div className="flex-1 flex flex-col justify-center items-center">
          <header className="text-center mb-12 flex flex-col items-center">
            <FileQuestionMark className={styledQuestionIcon} />
            <h1 className="audio-title text-4xl! text-audio-green!">
              Forgot your password?
            </h1>
            <p className="text-gray-600! font-light">We can help you out</p>
          </header>

          <form className="w-full max-w-md flex flex-col gap-4">
            <TextInput
              name="email"
              placeholder="Email"
              register={register}
              Icon={Mail}
              error={undefined}
            />
            <Button
              text="Send Email"
              styles="font-bold justify-center! cursor-pointer"
            />
          </form>
        </div>

        {footer()}
      </section>

      <section
        className="w-[40%] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgForgot})` }}
      />
    </main>
  );
}

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="md:hidden">
        <MobileLayout />
      </div>
      <div className="hidden md:block">
        <DesktopLayout />
      </div>
    </>
  );
}
