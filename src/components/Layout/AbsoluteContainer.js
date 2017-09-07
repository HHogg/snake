import React, { Component, PropTypes } from 'react';
import Flex from '../Flex/Flex';
import './AbsoluteContainer.css';

export default class AbsoluteContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <Flex { ...rest } className="sh-absolute__container">
        { children }
      </Flex>
    );
  }
}
