import { Link } from '@tanstack/react-router';
import { VolumeX } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center rounded-full bg-neutral-100 size-32 mb-6">
          <VolumeX className="size-14 text-neutral-400" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-neutral-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-center text-neutral-500 max-w-md mb-8">
          Oops! Looks like you hit a silent note. This page doesn't exist.
          <br />
          Try going back to the home page to keep listening!
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-audio-green px-8 py-3 font-semibold text-white transition-all hover:bg-emerald-600 active:scale-[0.98]"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
