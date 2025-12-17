import { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import RoundStartModal from './components/RoundStartModal';
import { candidates } from './data/candidates';
import { Candidate, GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentRound, setCurrentRound] = useState<Candidate[]>([]);
  const [nextRound, setNextRound] = useState<Candidate[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
  const [winner, setWinner] = useState<Candidate | null>(null);
  const [pendingRoundSize, setPendingRoundSize] = useState<number | null>(null);

  // 배열 섞기 함수
  const shuffleArray = (array: Candidate[]): Candidate[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 게임 시작 (라운드 알림 표시)
  const startGame = (rounds: number): void => {
    setPendingRoundSize(rounds);
    setGameState('roundStart');
  };

  // 실제 게임 시작
  const beginRound = (): void => {
    const shuffled = shuffleArray(candidates).slice(0, pendingRoundSize!);
    setCurrentRound(shuffled);
    setNextRound([]);
    setCurrentMatchIndex(0);
    setGameState('playing');
  };

  // 라운드 이름 가져오기
  const getRoundName = (size: number | null): string => {
    if (size === 2) return '결승';
    if (size === 4) return '4강';
    if (size === 8) return '8강';
    if (size === 16) return '16강';
    return `${size}강`;
  };

  // 선택 처리
  const selectCandidate = (selectedCandidate: Candidate): void => {
    const updatedNextRound = [...nextRound, selectedCandidate];
    const nextMatchIndex = currentMatchIndex + 2;

    if (nextMatchIndex >= currentRound.length) {
      // 현재 라운드 종료
      if (updatedNextRound.length === 1) {
        // 우승자 결정
        setWinner(updatedNextRound[0]);
        setGameState('result');
      } else {
        // 다음 라운드로 (라운드 시작 알림 표시)
        setPendingRoundSize(updatedNextRound.length);
        setNextRound(updatedNextRound);
        setGameState('roundStart');
      }
    } else {
      // 같은 라운드 내 다음 매치
      setNextRound(updatedNextRound);
      setCurrentMatchIndex(nextMatchIndex);
    }
  };

  // 다음 라운드 시작
  const startNextRound = (): void => {
    setCurrentRound(nextRound);
    setNextRound([]);
    setCurrentMatchIndex(0);
    setGameState('playing');
  };

  // 게임 재시작
  const restartGame = (): void => {
    setGameState('start');
    setWinner(null);
    setCurrentRound([]);
    setNextRound([]);
    setCurrentMatchIndex(0);
    setPendingRoundSize(null);
  };

  // 시작 화면
  if (gameState === 'start') {
    return <StartScreen onStartGame={startGame} />;
  }

  // 라운드 시작 알림
  if (gameState === 'roundStart') {
    return (
      <RoundStartModal
        roundName={getRoundName(pendingRoundSize)}
        onStart={currentRound.length === 0 ? beginRound : startNextRound}
      />
    );
  }

  // 게임 화면
  if (gameState === 'playing') {
    return (
      <GameScreen
        currentRound={currentRound}
        currentMatchIndex={currentMatchIndex}
        onSelectCandidate={selectCandidate}
      />
    );
  }

  // 결과 화면
  if (gameState === 'result') {
    return <ResultScreen winner={winner!} onRestartGame={restartGame} />;
  }
}

export default App;
