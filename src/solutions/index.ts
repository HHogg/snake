import { SolutionWithScore } from '../Types';
import alternatingHamiltonianCycle from './alternatingHamiltonianCycle';
import blank from './blank';
import hypotenuse from './hypotenuse';
import manhattanDistance from './manhattanDistance';
import random from './random';
import tailEscape from './tailEscape';

export {
  alternatingHamiltonianCycle,
  blank,
  hypotenuse,
  manhattanDistance,
  random,
  tailEscape,
};

const solutions: SolutionWithScore[] = [
  alternatingHamiltonianCycle,
  hypotenuse,
  manhattanDistance,
  random,
  tailEscape,
].sort((a, b) => b.score - a.score);

export default solutions;
