import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-9999 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
      <Loader2 className="w-14 h-14 text-audio-green animate-spin" />
    </div>
  );
};

export default LoadingOverlay;
