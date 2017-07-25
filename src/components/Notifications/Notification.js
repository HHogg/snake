import React, { Component, PropTypes } from 'react';

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
      <div className="sh-notifications-bar__notification">
        { message }
      </div>
    );
  }
}

