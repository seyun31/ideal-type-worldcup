import CandidateCard from './CandidateCard';

function GameScreen({ currentRound, currentMatchIndex, onSelectCandidate }) {
  const candidate1 = currentRound[currentMatchIndex];
  const candidate2 = currentRound[currentMatchIndex + 1];
  const matchNumber = Math.floor(currentMatchIndex / 2) + 1;
  const totalMatches = Math.floor(currentRound.length / 2);

  const getRoundName = () => {
    const roundSize = currentRound.length;
    if (roundSize === 2) return '결승';
    if (roundSize === 4) return '4강';
    if (roundSize === 8) return '8강';
    if (roundSize === 16) return '16강';
    return `${roundSize}강`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="bg-white border-4 border-[#FF69B4] rounded-3xl p-6 mb-10 shadow-[0_8px_32px_rgba(255,105,180,0.3)] text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 animate-[heartbeat_1.5s_ease-in-out_infinite]" style={{
            color: '#FF69B4',
            textShadow: '2px 2px 0px #FFB6D9'
          }}>
            {getRoundName()}
          </h2>
          <p className="text-xl md:text-2xl" style={{ color: '#D4A5FF' }}>
            {matchNumber} / {totalMatches}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <CandidateCard
            candidate={candidate1}
            onClick={() => onSelectCandidate(candidate1)}
          />

          <div className="text-4xl md:text-6xl font-bold animate-[heartbeat_1s_ease-in-out_infinite]" style={{
            color: '#FF69B4',
            textShadow: '2px 2px 0px #FFB6D9'
          }}>
            VS
          </div>

          <CandidateCard
            candidate={candidate2}
            onClick={() => onSelectCandidate(candidate2)}
          />
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
