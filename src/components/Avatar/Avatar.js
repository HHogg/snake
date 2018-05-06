import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Avatar.css';

export default class Avatar extends Component {
  static propTypes = {
    size: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  };

  render() {
    const { size, src, ...rest } = this.props;
    const style = { height: size, width: size };

    return (
      <img { ...rest }
          className="sh-avatar"
          src={ src }
          style={ style } />
    );
  }
}
