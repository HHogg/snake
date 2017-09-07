import React, { Component } from 'react';
import AboutStep from './AboutStep';
import AbsoluteChild from '../Layout/AbsoluteChild';
import Heading from '../Heading/Heading';
import Link from '../Link/Link';
import Paragraph from '../Paragraph/Paragraph';
import PathfindingSVG from './PathfindingSVG';

export default class AboutPathfinding extends Component {
  render() {
    return (
      <AbsoluteChild type="center">
        <AboutStep pathTo="/about/playing">
          <PathfindingSVG />
          <Heading>Pathfinding and Heuristics</Heading>
          <Paragraph>
            Pathfinding is <Link href="http://theory.stanford.edu/~amitp/GameProgramming/">
            "the problem of finding a good path from the starting point to the goal―avoiding
            obstacles, avoiding enemies, and minimizing costs (fuel, time, distance,
            equipment, money, etc)" (Amit Patel)</Link>. A heurisitic funcition provides an
            estimated value of the cost for a step to the goal. It can be used to control the
            behaviour of the searching algorithm.
          </Paragraph>
        </AboutStep>
      </AbsoluteChild>
    );
  }
}
