import AuthForm from '../components/AuthForm';
import { authBackground } from '@/assets';

interface IProps {
  type: 'sign-in' | 'sign-up';
}

function SignPage({ type }: IProps) {
  return (
    <main
      className="page-container justify-between py-20!"
      style={{ backgroundImage: `url(${authBackground})` }}
    >
      <header>
        <h1 className="font-[Audiowide] text-5xl text-white">Audio</h1>
        <h3 className="text-md text-white">
          It's modular and designed to last
        </h3>
      </header>
      <AuthForm type={type} />
    </main>
  );
}

export default SignPage;
