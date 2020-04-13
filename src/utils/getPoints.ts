import { TypeHistory } from '../Types';
import getCompletedHistory from './getCompletedHistory';

export default (history: TypeHistory) => {
  return getCompletedHistory(history).length;
};
