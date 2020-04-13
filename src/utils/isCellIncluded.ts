import { TypeCell } from '../Types';
import isCellEqual from './isCellEqual';

export default (set: TypeCell[], a: TypeCell) =>
  set.some((b) => isCellEqual(a, b));
