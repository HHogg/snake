import { Cell } from '../Types';

export default (set: Cell[], [x, y]: Cell) =>
  set.some(([sx, sy]) => x === sx && y === sy);
