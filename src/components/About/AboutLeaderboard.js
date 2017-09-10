import React, { Component } from 'react';
import AboutStep from './AboutStep';
import Link from '../Link/Link';
import Text from '../Text/Text';

export default class AboutLeaderboard extends Component {
  render() {
    return (
      <AboutStep pathFrom="/about/scoring">
        <Text size="medium" space="x4" strong>The Leaderboard</Text>
        <Text>
          Solutions are temporary stored into local storage, but when authenticated
          with <Link href="https://github.com">GitHub</Link> they can be stored more
          perminantly. Once a valid solution has been saved, it can be submitted to the
          Leaderboard where it will be run against a similar environment.
        </Text>
      </AboutStep>
    );
  }
}
