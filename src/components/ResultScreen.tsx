import { Candidate } from '../types';

interface ResultScreenProps {
  winner: Candidate;
  onRestartGame: () => void;
}

function ResultScreen({ winner, onRestartGame }: ResultScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <div className="bg-white border-4 border-[#FF69B4] rounded-3xl p-8 mb-8 shadow-[0_8px_32px_rgba(255,105,180,0.3)]">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-[heartbeat_1s_ease-in-out_infinite]" style={{
            color: '#FF69B4',
            textShadow: '2px 2px 0px #FFB6D9'
          }}>
            💖 내 이상형은 바로! 💖
          </h1>
        </div>
        <div className="bg-white rounded-3xl border-4 border-[#FF69B4] mx-auto mb-8 max-w-md shadow-[0_12px_48px_rgba(255,105,180,0.3)] overflow-hidden">
          <div className="w-full h-80 md:h-96 overflow-hidden relative">
            <img
              src={winner.image}
              alt={winner.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 text-5xl animate-[float_2s_ease-in-out_infinite]">
              ✨
            </div>
            <div className="absolute bottom-4 left-4 text-5xl animate-[float_2s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>
              💕
            </div>
          </div>
          <div className="p-8" style={{
            background: 'linear-gradient(135deg, #FF69B420 0%, #FFB6D940 100%)'
          }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#FF69B4' }}>
              {winner.name}
            </h2>
            <p className="text-xl md:text-2xl" style={{ color: '#D4A5FF' }}>
              {winner.group}
            </p>
          </div>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            className="px-8 py-4 text-lg font-bold rounded-full border-4 border-[#E6B3FF] shadow-[0_4px_16px_rgba(230,179,255,0.3)] hover:shadow-[0_6px_24px_rgba(230,179,255,0.5)] hover:scale-105 transition-all cursor-pointer"
            style={{ backgroundColor: '#E6B3FF', color: '#FFF', cursor: 'pointer' }}
            onClick={onRestartGame}
          >
            💜 다시 하기
          </button>
          <a
            href={winner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg font-bold rounded-full border-4 border-[#FF69B4] shadow-[0_4px_16px_rgba(255,105,180,0.3)] hover:shadow-[0_6px_24px_rgba(255,105,180,0.5)] hover:scale-105 transition-all inline-block cursor-pointer"
            style={{ backgroundColor: '#FF69B4', color: '#FFF', cursor: 'pointer' }}
          >
            💗 자세히 알아보기
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;
