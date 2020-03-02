export type Cell = [number, number];

export type Path = Cell[];
export type Point = Cell
export type Snake = Cell[];
export type Values = [number |  '_S_'][]

export type Environment = { point: null | Point; snake: Snake };

export type HistoryBlock = [Environment, Path];
export type History = HistoryBlock[];

export type Solution = {
  name: string;
  content: string;
};

export type SolutionWithScore = Solution & {
  average: number;
  points: number;
  score: number;
};
