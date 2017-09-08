import React, { Component, PropTypes } from 'react';
import Text from '../Text/Text';

const NOTIFICATION_DURATION = 5000;

export default class Notification extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { onRemove } = this.props;

    window.setTimeout(() => {
      onRemove();
    }, NOTIFICATION_DURATION);
  }

  render() {
    const { message } = this.props;

    return (
      <Text className="sh-notifications-bar__notification" strong>
        { message }
      </Text>
    );
  }
}

