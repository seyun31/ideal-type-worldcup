interface StartScreenProps {
  onStartGame: (rounds: number) => void;
}

function StartScreen({ onStartGame }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <div className="bg-white border-4 border-[#FF69B4] rounded-3xl p-10 mb-10 shadow-[0_8px_32px_rgba(255,105,180,0.3)]">
          <div className="animate-[float_3s_ease-in-out_infinite]">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{
              color: '#FF69B4',
              textShadow: '2px 2px 0px #FFB6D9'
            }}>
              💕 나는 어떤 남자 연예인을 좋아할까? 💕
            </h1>
          </div>
          <p className="text-lg md:text-2xl mb-2" style={{ color: '#D4A5FF' }}>
            내 취향 저격 연예인 찾기 ✨
          </p>
          <p className="text-base md:text-lg" style={{ color: '#999' }}>
            두근두근 설레는 선택의 시간! 💗
          </p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            className="px-8 py-4 text-lg font-bold rounded-full border-4 border-[#FF69B4] shadow-[0_4px_16px_rgba(255,105,180,0.3)] hover:shadow-[0_6px_24px_rgba(255,105,180,0.5)] hover:scale-105 transition-all cursor-pointer"
            style={{ backgroundColor: '#FF69B4', color: '#FFF', cursor: 'pointer' }}
            onClick={() => onStartGame(16)}
          >
            💖 16강 시작
          </button>
          <button
            className="px-8 py-4 text-lg font-bold rounded-full border-4 border-[#FF90C1] shadow-[0_4px_16px_rgba(255,144,193,0.3)] hover:shadow-[0_6px_24px_rgba(255,144,193,0.5)] hover:scale-105 transition-all cursor-pointer"
            style={{ backgroundColor: '#FF90C1', color: '#FFF', cursor: 'pointer' }}
            onClick={() => onStartGame(8)}
          >
            💗 8강 시작
          </button>
          <button
            className="px-8 py-4 text-lg font-bold rounded-full border-4 border-[#FFB6D9] shadow-[0_4px_16px_rgba(255,182,217,0.3)] hover:shadow-[0_6px_24px_rgba(255,182,217,0.5)] hover:scale-105 transition-all cursor-pointer"
            style={{ backgroundColor: '#FFB6D9', color: '#FFF', cursor: 'pointer' }}
            onClick={() => onStartGame(4)}
          >
            💗 4강 시작
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
