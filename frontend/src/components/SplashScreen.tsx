import { logoSvg } from '@/assets';

const App = () => {
  const primaryColor = '#0acf83';
  const accentColor = '#ffc120';

  return (
    <div className="fixed inset-0 z-9999 bg-[#02140d] overflow-hidden flex flex-col items-center justify-center">
      {' '}
      <style>{`
        @keyframes soundWave {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes barHeight {
          0%, 100% { height: 10px; }
          50% { height: 50px; }
        }
        .animate-wave {
          animation: soundWave 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .equalizer-bar {
          animation: barHeight 1.2s ease-in-out infinite;
        }
        .float {
          animation: floatAnim 3s ease-in-out infinite;
        }
        @keyframes floatAnim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-64 h-64 border-2 rounded-full animate-wave"
          style={{ borderColor: primaryColor }}
        ></div>
        <div
          className="absolute w-64 h-64 border-2 rounded-full animate-wave"
          style={{ borderColor: primaryColor, animationDelay: '0.6s' }}
        ></div>
        <div
          className="absolute w-64 h-64 border-2 rounded-full animate-wave"
          style={{ borderColor: primaryColor, animationDelay: '1.2s' }}
        ></div>
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="float">
          <img src={logoSvg} alt="Audio Logo" className="h-30" />
        </div>

        <div className="text-center mb-12">
          <h2 className="audio-title text-white text-3xl! font-black tracking-tighter uppercase italic flex items-center gap-2">
            AUDIO APP
          </h2>
        </div>

        <div className="flex items-end gap-1.5 h-16 mb-12">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="equalizer-bar w-2 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? primaryColor : accentColor,
                animationDelay: `${i * 0.15}s`,
                height: '20px',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
