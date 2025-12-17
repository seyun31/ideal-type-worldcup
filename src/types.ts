export interface Candidate {
  id: number;
  name: string;
  group: string;
  year: string;
  url: string;
  image: string;
}

export type GameState = 'start' | 'roundStart' | 'playing' | 'result';
