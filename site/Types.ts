export interface ISolution {
  name: string;
  content: string;
}

export interface ISolutionWithScore extends ISolution {
  average: number;
  points: number;
  score: number;
}
