import { ISolutionWithScore } from '../Types';
import hamiltonianCycle from './hamiltonianCycle';
import blank from './blank';
import euclideanDistance from './euclideanDistance';
import manhattanDistance from './manhattanDistance';
import random from './random';
import tailEscape from './tailEscape';

export {
  hamiltonianCycle,
  blank,
  euclideanDistance,
  manhattanDistance,
  random,
  tailEscape,
};

const solutions: ISolutionWithScore[] = [
  hamiltonianCycle,
  euclideanDistance,
  manhattanDistance,
  random,
  tailEscape,
].sort((a, b) => b.score - a.score);

export default solutions;
