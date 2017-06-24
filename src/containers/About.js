import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { applicationShowGame } from '../store/application';
import Flex from '../components/Flex/Flex';
import Link from '../components/Link/Link';

class About extends Component {
  static propTypes = {
    onBackToGame: PropTypes.func.isRequired,
  };

  render() {
    const {
      onBackToGame,
    } = this.props;

    return (
      <Flex container direction="vertical">
        <Flex>

          What's a hueristic value?


          How the game works?



        </Flex>

        <Flex shrink>
          <Link onClick={ () => onBackToGame() }>
            {'<'} Back to Game
          </Link>
        </Flex>
      </Flex>
    );
  }
}

export default connect(() => ({}), {
  onBackToGame: applicationShowGame,
})(About);
