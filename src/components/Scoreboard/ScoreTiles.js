import React, { Component, PropTypes } from 'react';
import Flex from '../Flex/Flex';

export default class ScoreTiles extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <Flex alignChildrenHorizontal="around" parent>
        { this.props.children }
      </Flex>
    );
  }
}
