export type TypeCell = [number, number];

export type TypePath = TypeCell[];
export type TypePoint = TypeCell;
export type TypeSnake = TypeCell[];
export type TypeValues = number[][];

export interface IEnvironment {
  path: TypePath;
  point: undefined | TypePoint;
  snake: TypeSnake;
}

export type TypeHistory = IEnvironment[];
