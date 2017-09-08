import React, { Component } from 'react';
import AboutStep from './AboutStep';
import AbsoluteChild from '../Layout/AbsoluteChild';
import HeuristicValueSVG from './HeuristicValueSVG';
import Text from '../Text/Text';

export default class AboutPlaying extends Component {
  render() {
    return (
      <AbsoluteChild type="center">
        <AboutStep pathFrom="/about" pathTo="/about/scoring">
          <HeuristicValueSVG />
          <Text size="medium" space="x4" strong>Playing Snake Heuristics</Text>
          <Text>
            The goal is to move the snake across the cells to the point by returning a number
            from the <code>heuristic()</code> function. The function is called for every cell
            every time the snake needs to move, and is provided with information of the
            environment.
          </Text>

          <Text>
            The lowest number given for the 3 cells around the snakes head will be the next
            position the snake will take. If two cells have the same value, the first cell c
            lockwise from the top cell will be selected. Cells that are out of bounds and
            contain the snake are already excluded from selection.
          </Text>
        </AboutStep>
      </AbsoluteChild>
    );
  }
}
