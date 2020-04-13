import { TypeHistory } from '../Types';
import getCompletedHistory from './getCompletedHistory';
import getMean from './getMean';

export default (xLength: number, yLength: number, history: TypeHistory) => {
  const nCells = xLength * yLength;
  const moves = getCompletedHistory(history).map(({ path }) => path.length);

  let score = 0;

  for (let point = 1; point < moves.length + 1; point++) {
    const a = getMean(moves.slice(0, point));
    const wA = (1 - a / nCells) + 1;
    const wM = (1 - moves[point - 1] / nCells) + 1;
    const wP = 1 - point / nCells;

    score += Math.max(point, point * wP * (wA * wM));
  }

  return score;
};
