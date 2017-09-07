import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import './Link.css';

export default class Link extends Component {
  static propTypes = {
    to: PropTypes.string,
  };

  render() {
    const { to, ...rest } = this.props;
    const Component = to ? NavLink : 'a';

    return (
      <Component { ...rest }
          className="sh-link"
          target={ to ? undefined : '_blank' }
          to={ to } />
    );
  }
}
