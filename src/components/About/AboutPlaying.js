import React, { Component } from 'react';
import AboutStep from './AboutStep';
import AbsoluteChild from '../Layout/AbsoluteChild';
import Heading from '../Heading/Heading';
import HeuristicValueSVG from './HeuristicValueSVG';
import Paragraph from '../Paragraph/Paragraph';

export default class AboutPlaying extends Component {
  render() {
    return (
      <AbsoluteChild type="center">
        <AboutStep pathFrom="/about" pathTo="/about/scoring">
          <HeuristicValueSVG />
          <Heading>Playing Snake Heuristics</Heading>
          <Paragraph>
            The goal is to move the snake across the cells to the point by returning a number
            from the <code>heuristic()</code> function. The function is called for every cell
            every time the snake needs to move, and is provided with information of the
            environment.
          </Paragraph>

          <Paragraph>
            The lowest number given for the 3 cells around the snakes head will be the next
            position the snake will take. If two cells have the same value, the first cell c
            lockwise from the top cell will be selected. Cells that are out of bounds and
            contain the snake are already excluded from selection.
          </Paragraph>
        </AboutStep>
      </AbsoluteChild>
    );
  }
}
