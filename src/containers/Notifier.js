import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Notifications from '../components/Notifications/Notifications';
import Notification from '../components/Notifications/Notification';
import { notifierRemoveNotification } from '../store/notifier';

class Notifier extends Component {
  static propTypes = {
    onRemoveNotification: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
  };

  render() {
    const { notifications, onRemoveNotification } = this.props;

    return (
      <Notifications>
        { notifications.slice(0, 1).map(({ id, notification, type }) =>
          <Notification
              key={ id }
              onRemove={ () => onRemoveNotification({ id }) }
              type={ type }>
            { notification }
          </Notification>
        ) }
      </Notifications>
    );
  }
}

export default connect((state) => ({
  isGameVisible: state.application.game,
  isLeaderboardVisible: state.application.leaderboard,
  isLoggedIn: !!state.user.id,
  isSavedSolutionsVisible: state.application.savedSolutions,
  notifications: state.notifier.notifications,
}), {
  onRemoveNotification: notifierRemoveNotification,
})(Notifier);
