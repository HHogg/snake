import * as React from 'react';
import { Box } from 'preshape';
import { SnakeContext, getAverage, getPoints, getScore } from '@hhogg/snake';
import ScoreTile from './ScoreTile';

export default () => {
  const { history, xLength, yLength } = React.useContext(SnakeContext);

  return (
    <Box flex="horizontal" gap="x2">
      <ScoreTile label="Points" value={ getPoints(history) } />
      <ScoreTile label="Average" value={ Math.floor(getAverage(history)) } />
      <ScoreTile label="Score" value={ Math.floor(getScore(xLength, yLength, history)) } />
    </Box>
  );
};
