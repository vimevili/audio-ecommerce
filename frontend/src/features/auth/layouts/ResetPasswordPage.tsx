import { bgForgot, logoSvg } from '@/assets';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, CircleQuestionMark } from 'lucide-react';
import type { ReactNode } from 'react';
import { ResetPasswordForm } from '../components';
import { Route } from '@/routes/reset-password';

const gradientBg = 'bg-linear-to-tr from-green-200 to-purple-200';

interface IProps {
  children: ReactNode;
}

const Footer = () => (
  <footer className="flex items-center justify-center gap-2 pb-4">
    <img src={logoSvg} alt="Logo" className="h-8 md:h-12" />
    <span className="audio-title text-3xl! md:text-4xl! text-gray-600!">
      Audio
    </span>
  </footer>
);

function MobileLayout({ children }: IProps) {
  return (
    <main
      className={`min-h-screen w-full flex flex-col p-8 ${gradientBg} relative`}
    >
      <Link
        to="/sign-in"
        className="absolute top-8 left-8 text-audio-green text-lg"
      >
        <ArrowLeft />
      </Link>

      <div className="flex-1 flex flex-col justify-center items-center gap-4 md:gap-7">
        <header className="text-center flex flex-col items-center">
          <h1 className="audio-title text-2xl! text-audio-green!">
            Reset your password
          </h1>
        </header>

        {children}
      </div>

      <Footer />
    </main>
  );
}

function DesktopLayout({ children }: IProps) {
  return (
    <main className="min-h-screen w-full flex">
      <section className={`w-[60%] flex flex-col ${gradientBg} p-16 relative`}>
        <Link
          to="/sign-in"
          className="absolute top-12 left-12 text-audio-green text-3xl hover:scale-110 transition-transform"
        >
          <ArrowLeft />
        </Link>

        <div className="flex-1 flex flex-col justify-center items-center">
          <header className="text-center mb-12 flex flex-col items-center">
            <CircleQuestionMark
              className="text-audio-green"
              size={70}
              strokeWidth={1}
            />
            <h1 className="audio-title text-4xl! text-audio-green!">
              Forgot your password?
            </h1>
            <p className="text-gray-600! font-light">We can help you out</p>
          </header>

          {children}
        </div>

        <Footer />
      </section>

      <section
        className="w-[40%] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgForgot})` }}
      />
    </main>
  );
}
export default function ResetPasswordPage() {
  const { token } = Route.useSearch();
  return (
    <>
      <div className="md:hidden">
        <MobileLayout children={<ResetPasswordForm token={token} />} />
      </div>
      <div className="hidden md:block">
        <DesktopLayout children={<ResetPasswordForm token={token} />} />
      </div>
    </>
  );
}
