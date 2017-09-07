import React, { Component } from 'react';
import AboutStep from './AboutStep';
import AbsoluteChild from '../Layout/AbsoluteChild';
import Heading from '../Heading/Heading';
import Paragraph from '../Paragraph/Paragraph';
import ScoringSVG from './ScoringSVG';

export default class AboutScoring extends Component {
  render() {
    return (
      <AbsoluteChild type="center">
        <AboutStep pathFrom="/about/playing" pathTo="/about/leaderboard">
          <ScoringSVG />
          <Heading>Scoring</Heading>
          <Paragraph>
            To encourage minimizing costs, metrics for each point collection and the overall
            averages are fed into a rudementary scoring system. This will give an indication
            to how good your solution is.
          </Paragraph>
        </AboutStep>
      </AbsoluteChild>
    );
  }
}
