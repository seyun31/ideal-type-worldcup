import { useMemo } from 'react';
import { Candidate } from '../types';

const COLORS = ['#FF69B4', '#FFB6D9', '#E6B3FF', '#D4A5FF'];

interface CandidateCardProps {
  candidate: Candidate;
  onClick: () => void;
}

function CandidateCard({ candidate, onClick }: CandidateCardProps) {
  const randomColor = useMemo(() => {
    const hash = candidate.name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return COLORS[Math.abs(hash) % COLORS.length];
  }, [candidate.name]);

  return (
    <div
      className="bg-white rounded-3xl border-4 w-full max-w-xs cursor-pointer transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(255,105,180,0.4)] shadow-[0_8px_32px_rgba(255,105,180,0.2)] overflow-hidden"
      style={{
        cursor: 'pointer',
        borderColor: randomColor
      }}
      onClick={onClick}
    >
      <div className="w-full h-64 md:h-80 overflow-hidden relative">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 text-3xl animate-[float_2s_ease-in-out_infinite]">
          💗
        </div>
      </div>
      <div className="p-5" style={{
        background: `linear-gradient(135deg, ${randomColor}20 0%, ${randomColor}40 100%)`
      }}>
        <h3 className="text-xl md:text-2xl font-bold text-center mb-1" style={{ color: randomColor }}>
          {candidate.name}
        </h3>
        <p className="text-base md:text-lg text-center" style={{ color: '#666' }}>
          {candidate.group}
        </p>
      </div>
    </div>
  );
}

export default CandidateCard;
