import { TypeHistory } from '../Types';
import getMean from './getMean';

export default (history: TypeHistory) =>
  getMean(history.map(([, { length }]) => length));
