import { TypeCell } from '../Types';

export default (set: TypeCell[], [x, y]: TypeCell) =>
  set.some(([sx, sy]) => x === sx && y === sy);
