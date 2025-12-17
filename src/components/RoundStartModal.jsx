function RoundStartModal({ roundName, onStart }) {
  return (
    <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl border-4 border-[#FF69B4] p-12 md:p-16 max-w-2xl w-full text-center shadow-[0_16px_64px_rgba(255,105,180,0.4)] animate-[scaleIn_0.3s_ease]">
        <div className="mb-6 text-6xl animate-[heartbeat_1s_ease-in-out_infinite]">
          💖
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{
          color: '#FF69B4',
          textShadow: '2px 2px 0px #FFB6D9'
        }}>
          {roundName}을 시작합니다!
        </h2>
        <p className="text-lg md:text-xl mb-8" style={{ color: '#D4A5FF' }}>
          설레는 마음으로 선택해보세요 ✨
        </p>
        <button
          className="px-10 py-5 text-2xl md:text-3xl font-bold rounded-full border-4 border-[#FF69B4] shadow-[0_6px_24px_rgba(255,105,180,0.3)] hover:shadow-[0_8px_32px_rgba(255,105,180,0.5)] hover:scale-105 transition-all w-full cursor-pointer"
          style={{ backgroundColor: '#FF69B4', color: '#FFF', cursor: 'pointer' }}
          onClick={onStart}
        >
          💕 시작하기
        </button>
      </div>
    </div>
  );
}

export default RoundStartModal;
