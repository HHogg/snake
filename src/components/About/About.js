import React, { Component, PropTypes } from 'react';
import { Route } from 'react-router-dom';
import AboutPathfinding from './AboutPathfinding';
import AboutPlaying from './AboutPlaying';
import AboutScoring from './AboutScoring';
import AboutLeaderboard from './AboutLeaderboard';
import Flex from '../Flex/Flex';
import RoutingAnimation from '../RoutingAnimation/RoutingAnimation';

export default class About extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { location, match } = this.props;
    const { pathname } = location;
    const { url } = match;
    const key = pathname.split('/')[2] || '/';

    return (
      <Flex parent>
        <RoutingAnimation
            component={ Flex }
            container
            location={ location }
            parent
            space="x0"
            transitionKey={ key }>
          <Route path={ url } exact component={ AboutPathfinding } />
          <Route path={ `${url}/playing` } component={ AboutPlaying } />
          <Route path={ `${url}/scoring` } component={ AboutScoring } />
          <Route path={ `${url}/leaderboard` } component={ AboutLeaderboard } />
        </RoutingAnimation>
      </Flex>
    );
  }
}
