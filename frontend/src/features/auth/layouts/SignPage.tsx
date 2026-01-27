import { authBackground, bgSignIn, bgSignUp, logoSvg } from '@/assets';
import AuthForm from '../components/AuthForm';

interface SignProps {
  type: 'sign-in' | 'sign-up';
}

const MobileLayout = ({ type }: SignProps) => {
  return (
    <main
      className="auth-page-container"
      style={{ backgroundImage: `url(${authBackground})` }}
    >
      <header>
        <h1 className="audio-title">Audio</h1>
        <h3 className="audio-subtitle">It's modular and designed to last</h3>
      </header>

      <AuthForm type={type} showTitle={false} />
    </main>
  );
};

interface IProps {
  type: 'sign-in' | 'sign-up';
}

function DesktopLayout({ type }: IProps) {
  const isSignIn = type === 'sign-in';

  const bgImage = isSignIn ? bgSignIn : bgSignUp;

  return (
    <main className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
        <div
          className={`
            flex flex-col justify-center items-center p-16 
            ${isSignIn ? 'order-1' : 'order-2'}
          `}
        >
          <div className="w-full h-full max-w-xl justify-between flex flex-col">
            <header>
              <div
                className={`flex gap-4 ${isSignIn ? 'justify-start' : 'justify-end'}`}
              >
                <img src={logoSvg} alt="Audio Logo" className="h-12" />
                <h1 className="audio-title text-5xl! text-black!">Audio</h1>
              </div>
              <p
                className={`text-black font-light ${isSignIn ? 'text-left' : 'text-right'}`}
              >
                It's modular and designed to last
              </p>
            </header>

            <AuthForm type={type} showTitle={true} />

            <p className="mt-6 text-xs text-gray-700">
              © 2026 Audio App. Alguns direitos reservados.
            </p>
          </div>
        </div>

        <div
          className={`
            hidden md:block relative
            ${isSignIn ? 'order-2' : 'order-1'}
          `}
        />
      </div>
    </main>
  );
}

function SignPage({ type }: SignProps) {
  return (
    <>
      <div className="block md:hidden">
        <MobileLayout type={type} />
      </div>

      <div className="hidden md:block">
        <DesktopLayout type={type} />
      </div>
    </>
  );
}

export default SignPage;
