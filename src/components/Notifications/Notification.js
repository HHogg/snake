import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const NOTIFICATION_DURATION = 5000;

export default class Notification extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onRemove: PropTypes.func.isRequired,
    type: PropTypes.oneOf([
      'error',
      'success',
    ]).isRequired ,
  };

  componentDidMount() {
    const { onRemove } = this.props;

    window.setTimeout(() => {
      onRemove();
    }, NOTIFICATION_DURATION);
  }

  render() {
    const { children, type } = this.props;
    const classes = classnames('sh-notifications__notification',
      `sh-notifications__notification--${type}`);

    return (
      <div className={ classes }>
        { children }
      </div>
    );
  }
}

