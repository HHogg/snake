import React, { Component, PropTypes } from 'react';
import Flex from '../Flex/Flex';
import './MaxWidthContainer.css';

export default class MaxWidthContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <Flex { ...rest } className="sh-layout--max-width">
        { children }
      </Flex>
    );
  }
}
