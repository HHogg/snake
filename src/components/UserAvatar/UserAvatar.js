import React, { Component, PropTypes } from 'react';
import './UserAvatar.css';

export default class UserAvatar extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  };

  render() {
    const { name, src } = this.props;

    return (
      <div className="sh-user-avatar">
        <div className="sh-user-avatar__name">
          { name }
        </div>

        <img className="sh-user-avatar__img" src={ src } />
      </div>
    );
  }
}
