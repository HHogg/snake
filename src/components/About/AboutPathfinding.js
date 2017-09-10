import React, { Component } from 'react';
import AboutStep from './AboutStep';
import Link from '../Link/Link';
import PathfindingSVG from './PathfindingSVG';
import Text from '../Text/Text';

export default class AboutPathfinding extends Component {
  render() {
    return (
      <AboutStep pathTo="/about/playing">
        <PathfindingSVG />
        <Text size="medium" space="x4" strong>Pathfinding and Heuristics</Text>
        <Text>
          Pathfinding is <Link href="http://theory.stanford.edu/~amitp/GameProgramming/">
          "the problem of finding a good path from the starting point to the goal―avoiding
          obstacles, avoiding enemies, and minimizing costs (fuel, time, distance,
          equipment, money, etc)" (Amit Patel)</Link>. A heurisitic funcition provides an
          estimated value of the cost for a step to the goal. It can be used to control the
          behaviour of the searching algorithm.
        </Text>
      </AboutStep>
    );
  }
}
