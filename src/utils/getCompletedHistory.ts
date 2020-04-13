import { TypeHistory } from '../Types';
import isCellEqual from './isCellEqual';

export default (history: TypeHistory) => {
  const final = history[history.length - 1];

  if (final && final.point && isCellEqual(final.snake[0], final.point)) {
    return history;
  }

  return history.slice(0, -1);
};
