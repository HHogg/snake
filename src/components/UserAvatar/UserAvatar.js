import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Avatar from '../Avatar/Avatar';

export default class UserAvatar extends Component {
  static propTypes = {
    size: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  };

  render() {
    const { size, src } = this.props;

    return (
      <Avatar
          size={ size}
          src={ src } />
    );
  }
}
