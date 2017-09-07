import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export default class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
  };

  render() {
    const { children, to, ...rest } = this.props;
    const classes = classnames('sh-menu__item', {
      'sh-menu__item--activatable': to,
    });

    if (to) {
      return (
        <NavLink { ...rest }
            activeClassName="sh-menu__item--active"
            className={ classes }
            to={ to }>
          { children }
        </NavLink>
      );
    }

    return (
      <div className={ classes }>
        { children }
      </div>
    );
  }
}
