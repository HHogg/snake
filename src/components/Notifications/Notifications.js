import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Notification from './Notification';

export default class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    onRemoveNotification: PropTypes.func.isRequired,
  };

  render() {
    const { notifications, onRemoveNotification } = this.props;

    return notifications.map(({ id, notification, type }) => (
      <Notification
          id={ id }
          key={ id }
          margin="x1"
          onRemove={ onRemoveNotification }
          type={ type }>
        { notification }
      </Notification>
    ));
  }
}
