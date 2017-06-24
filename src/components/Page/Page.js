import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Flex from '../Flex/Flex';
import './Page.css';

export default class Page extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { active, children } = this.props;
    const classes = classnames('sh-pages__page', {
      'sh-pages__page--active': active,
    });

    return (
      <Flex className={ classes } container direction="vertical">
        { children }
      </Flex>
    );
  }
}
