import * as React from 'react';
import { Flex } from 'preshape';
import { CANVAS_SIZE } from '../config';
import { Cell, History } from '../Types';
import ScoreTile from './ScoreTile';

const calculateAverage = (snake: Cell[][]) =>
  snake.length && snake.reduce((acc, { length }) => acc + length, 0) / snake.length;

const calculateScore = (averageMoves: number, points: number) =>
  Math.max(1, points * (
    Math.pow(
      Math.max(0, Math.min(1, 1 - (averageMoves / (CANVAS_SIZE * CANVAS_SIZE)))),
      Math.log(points || 1)
    )
  ));

interface Props {
  history: History;
}

export default (props: Props) => {
  const { history } = props;
  const points = history.length - 1;
  const paths = history.slice(0, -1).map(([, p]) => p);
  const average = calculateAverage(paths);
  const score = paths.reduce((score) => score + calculateScore(average, points), 0);

  return (
    <Flex direction="horizontal" gap="x2">
      <ScoreTile label="Points" value={ points } />
      <ScoreTile label="Average" value={ Math.floor(average) } />
      <ScoreTile label="Score" value={ Math.floor(score) } />
    </Flex>
  );
};
