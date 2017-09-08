import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { USER_AVATAR_SIZE } from '../UserAvatar/UserAvatar';
import Notification from './Notification';
import './Notifications.css';

export default class NotificationBar extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    notifications: PropTypes.array.isRequired,
    onRemoveNotification: PropTypes.func.isRequired,
  };

  render() {
    const { children, notifications, onRemoveNotification } = this.props;
    const notification = notifications.length > 0 && notifications[0];
    const type = notification && notification.type;
    const classes = classnames('sh-notifications-bar', {
      'sh-notifications-bar--visible': notification,
      [`sh-notifications-bar--${type}`]: type,
    });

    return (
      <div className={ classes }>
        <div
            className="sh-notifications-bar__notifications"
            onClick={ () => onRemoveNotification({ id: notification.id }) }>
          { notification && (
            <Notification
                message={ notification.notification }
                onRemove={ () => onRemoveNotification({ id: notification.id }) } />
          ) }
        </div>

        <div
            className="sh-notifications-bar__content"
            style={ { minHeight: USER_AVATAR_SIZE } }>
          { children }
        </div>
      </div>
    );
  }
}

