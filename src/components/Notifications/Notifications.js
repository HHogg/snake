import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Notifications.css';

export default class Notifications extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    const classes = classnames('sh-notifications', {
      'sh-notifications--visible': children,
    });

    return (
      <div className={ classes }>
        { children }
      </div>
    );
  }
}

