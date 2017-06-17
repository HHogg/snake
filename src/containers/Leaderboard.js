import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { applicationShowGame } from '../store/application';
import AppContainer from '../components/App/AppContainer';
import AppPane from '../components/App/AppPane';
import AppSection from '../components/App/AppSection';
import Link from '../components/Link/Link';

class Leaderboard extends Component {
  static propTypes = {
    applicationShowGame: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
  };

  render() {
    const { applicationShowGame, isVisible } = this.props;

    return (
      <AppContainer isVisible={ isVisible }>
        <AppPane>
          <AppSection>
            Leaderboard
          </AppSection>

          <AppSection shrink={ true }>
            <Link onClick={ () => applicationShowGame() }>
              {'<'} Back to Game
            </Link>
          </AppSection>
        </AppPane>
      </AppContainer>
    );
  }
}

export default connect((state) => ({

}), {
  applicationShowGame,
})(Leaderboard);
