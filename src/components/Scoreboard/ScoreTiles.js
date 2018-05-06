import React, { Component } from 'react';
import { Flex } from 'preshape';

export default class ScoreTiles extends Component {
  render() {
    return (
      <Flex{ ...this.props }
          direction="horizontal"
          gutter="x3" />
    );
  }
}
