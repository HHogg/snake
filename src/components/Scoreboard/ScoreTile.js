import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Flex, Text } from 'preshape';

export default class ScoreTile extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  };

  render() {
    const { value, label } = this.props;

    return (
      <Flex
          borderColor
          borderSize="x2"
          grow
          initial="none"
          padding="x1">
        <Text align="middle">
          <Text inline size="title">{ value }</Text> <Text color="shade-3" inline size="small">{ label }</Text>
        </Text>
      </Flex>
    );
  }
}
