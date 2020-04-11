import * as React from 'react';
import { Flex } from 'preshape';
import { SnakeContext, getAverage, getScore } from '@hogg/snake';
import ScoreTile from './ScoreTile';

const mean = (ns: number[]) => ns.length
  ? ns.reduce((acc, n) => acc + n, 0) / ns.length
  : 0;

export default () => {
  const { history, xLength, yLength } = React.useContext(SnakeContext);
  const points = history.length - 1;
  const average = getAverage(history.slice(0, -1));
  const score = getScore(xLength, yLength, history.slice(0, -1));

  return (
    <Flex direction="horizontal" gap="x2">
      <ScoreTile label="Points" value={ points } />
      <ScoreTile label="Average" value={ Math.floor(average) } />
      <ScoreTile label="Score" value={ Math.floor(score) } />
    </Flex>
  );
};
