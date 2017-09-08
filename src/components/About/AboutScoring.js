import React, { Component } from 'react';
import AboutStep from './AboutStep';
import AbsoluteChild from '../Layout/AbsoluteChild';
import ScoringSVG from './ScoringSVG';
import Text from '../Text/Text';

export default class AboutScoring extends Component {
  render() {
    return (
      <AbsoluteChild type="center">
        <AboutStep pathFrom="/about/playing" pathTo="/about/leaderboard">
          <ScoringSVG />
          <Text size="medium" space="x4" strong>Scoring</Text>
          <Text>
            To encourage minimizing costs, metrics for each point collection and the overall
            averages are fed into a rudementary scoring system. This will give an indication
            to how good your solution is.
          </Text>
        </AboutStep>
      </AbsoluteChild>
    );
  }
}
