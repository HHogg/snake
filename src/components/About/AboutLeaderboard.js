import React, { Component } from 'react';
import AboutStep from './AboutStep';
import AbsoluteChild from '../Layout/AbsoluteChild';
import Heading from '../Heading/Heading';
import Link from '../Link/Link';
import Paragraph from '../Paragraph/Paragraph';

export default class AboutLeaderboard extends Component {
  render() {
    return (
      <AbsoluteChild type="center">
        <AboutStep pathFrom="/about/scoring">
          <Heading>The Leaderboard</Heading>
          <Paragraph>
            Solutions are temporary stored into local storage, but when authenticated
            with <Link href="https://github.com">GitHub</Link> they can be stored more
            perminantly. Once a valid solution has been saved, it can be submitted to the
            Leaderboard where it will be run against a similar environment.
          </Paragraph>
        </AboutStep>
      </AbsoluteChild>
    );
  }
}
