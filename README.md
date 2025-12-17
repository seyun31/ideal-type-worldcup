# 이상형 월드컵 (Ideal Type World Cup)

React + Vite를 사용하여 만든 이상형 월드컵 웹 애플리케이션입니다.

## 프로젝트 개요

사용자가 16개의 음식 중에서 자신이 선호하는 것을 선택하며 토너먼트 방식으로 최종 우승자를 결정하는 게임입니다.

## 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구 및 개발 서버
- **CSS3** - 스타일링 (애니메이션 포함)

## 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

서버가 실행되면 브라우저에서 `http://localhost:5173`로 접속합니다.

### 3. 빌드
```bash
npm run build
```

## 주요 기능

### 1. 라운드 선택
- 16강, 8강, 4강 중 선택 가능
- 선택한 라운드에 맞춰 후보 개수가 자동 조정

### 2. 토너먼트 게임
- 2개의 후보 중 하나를 선택
- 매 라운드마다 승자가 다음 라운드로 진출
- 현재 라운드와 매치 진행 상황 표시

### 3. 결과 화면
- 최종 우승자 표시
- 다시 하기 버튼으로 게임 재시작

### 4. 반응형 디자인
- 데스크톱과 모바일 모두 지원
- 화면 크기에 따라 레이아웃 자동 조정

## 코드 구조 설명

### App.jsx

#### 1. 데이터 구조
```javascript
const candidates = [
  { id: 1, name: '피자', emoji: '🍕' },
  // ... 16개의 음식 데이터
];
```
- 각 후보는 고유 ID, 이름, 이모지를 가짐

#### 2. 상태 관리 (useState)
```javascript
const [gameState, setGameState] = useState('start');
```
- `gameState`: 'start' | 'playing' | 'result' - 게임의 현재 상태
- `currentRound`: 현재 라운드에 참여 중인 후보 배열
- `nextRound`: 현재 라운드에서 승리한 후보들을 저장
- `currentMatchIndex`: 현재 매치의 인덱스 (0, 2, 4, ... 짝수로 증가)
- `winner`: 최종 우승자

#### 3. 핵심 함수

**shuffleArray(array)**
```javascript
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
```
- Fisher-Yates 셔플 알고리즘 사용
- 배열을 랜덤하게 섞어 매번 다른 순서로 게임 진행

**startGame(rounds)**
```javascript
const startGame = (rounds) => {
  const shuffled = shuffleArray(candidates).slice(0, rounds);
  setCurrentRound(shuffled);
  setNextRound([]);
  setCurrentMatchIndex(0);
  setGameState('playing');
};
```
- 게임 시작 시 호출
- 후보를 섞고 선택한 라운드 수만큼 슬라이스
- 상태 초기화

**selectCandidate(selectedCandidate)**
```javascript
const selectCandidate = (selectedCandidate) => {
  const updatedNextRound = [...nextRound, selectedCandidate];
  const nextMatchIndex = currentMatchIndex + 2;

  if (nextMatchIndex >= currentRound.length) {
    // 현재 라운드 종료
    if (updatedNextRound.length === 1) {
      // 우승자 결정
      setWinner(updatedNextRound[0]);
      setGameState('result');
    } else {
      // 다음 라운드로
      setCurrentRound(updatedNextRound);
      setNextRound([]);
      setCurrentMatchIndex(0);
    }
  } else {
    // 같은 라운드 내 다음 매치
    setNextRound(updatedNextRound);
    setCurrentMatchIndex(nextMatchIndex);
  }
};
```
- 토너먼트 로직의 핵심
- 선택된 후보를 nextRound에 추가
- 매치 인덱스를 2씩 증가 (한 매치는 2명)
- 현재 라운드 종료 여부 확인:
  - 다음 라운드 참가자가 1명이면 → 우승자 결정
  - 2명 이상이면 → 다음 라운드 시작
  - 현재 라운드가 아직 남았으면 → 다음 매치로 이동

**getRoundName()**
```javascript
const getRoundName = () => {
  const remaining = currentRound.length - currentMatchIndex;
  if (remaining === 2) return '결승';
  if (remaining === 4) return '준결승';
  return \`\${currentRound.length}강\`;
};
```
- 남은 후보 수를 계산하여 라운드 이름 반환

#### 4. 화면 구성

**시작 화면 (gameState === 'start')**
- 타이틀과 라운드 선택 버튼 표시

**게임 화면 (gameState === 'playing')**
- 현재 라운드 정보 표시
- 두 후보를 카드 형태로 표시
- 클릭 시 selectCandidate 호출

**결과 화면 (gameState === 'result')**
- 우승자 표시
- 다시 하기 버튼

### App.css

#### 1. 레이아웃
- Flexbox를 활용한 중앙 정렬
- 그라디언트 배경 (보라색 계열)

#### 2. 애니메이션
- `fadeIn`: 페이드 인 효과
- `fadeInDown`: 위에서 아래로 페이드 인
- `slideIn`: 좌측에서 슬라이드 인
- `scaleIn`: 크기 확대 효과
- `bounce`: 위아래 움직임
- `spin`: 회전 효과
- `rotate`: 좌우 흔들림

#### 3. 호버 효과
- 카드에 마우스를 올리면 확대 및 그림자 증가
- 버튼 호버 시 위로 올라가는 효과

#### 4. 반응형 디자인
```css
@media (max-width: 768px) {
  /* 모바일 스타일 */
}
```
- 768px 이하에서 폰트 크기 조정
- VS 텍스트 90도 회전
- 카드를 세로로 배치

## 개발 과정 기록

### 사용한 도구
- **AI 에이전트**: Claude Code (Anthropic)
- **개발 방식**: CLI 기반

### 입력한 프롬프트
1. "이상형 월드컵 페이지를 제작할거야. 이거와 관련된 세팅을 준비해줘"
2. "근데 react로 만드는게 좋지 않을까? 아니면 next.js?"
3. "넌 어떤게 좋아보여" → Claude Code가 React + Vite 제안
4. "ㅇㅇ" (승인)

### 개발 순서
1. **프로젝트 초기화** (5분)
   - `npm create vite@latest` 실행
   - React 템플릿 선택
   - 의존성 설치

2. **컴포넌트 구조 설계 및 구현** (30분)
   - App.jsx 작성
   - useState를 활용한 상태 관리
   - 토너먼트 로직 구현
   - 세 가지 화면 구성 (시작/게임/결과)

3. **스타일링** (20분)
   - App.css 전면 재작성
   - 애니메이션 추가
   - 반응형 디자인 적용
   - 그라디언트 배경

4. **테스트 및 버그 수정** (10분)
   - 개발 서버 실행
   - 사용하지 않는 변수 제거
   - 진단 오류 해결

5. **문서화** (15분)
   - README.md 작성
   - 코드 설명 추가

## 특징

### 1. 깔끔한 토너먼트 로직
- 인덱스를 2씩 증가시켜 매치 관리
- nextRound 배열로 다음 라운드 참가자 관리
- 조건문으로 라운드 전환 및 우승자 결정

### 2. 시각적 피드백
- 카드 호버 시 애니메이션
- 이모지가 bounce 애니메이션으로 생동감
- 부드러운 화면 전환

### 3. 사용자 경험
- 직관적인 UI
- 현재 진행 상황 표시
- 모바일 최적화

## 향후 개선 가능 사항

1. 사용자 정의 후보 추가 기능
2. 이미지 업로드 지원
3. 토너먼트 히스토리 기록
4. 소셜 미디어 공유 기능
5. 다양한 테마 (음식 외 다른 주제)
6. LocalStorage를 활용한 진행 상황 저장

## 라이선스

MIT License
