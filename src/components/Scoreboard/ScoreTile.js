import React, { Component, PropTypes } from 'react';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

export default class ScoreTile extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  };

  render() {
    const { value, label } = this.props;

    return (
      <Flex shrink>
        <Text inline size="large">{ value }</Text> <Text inline subtle>{ label }</Text>
      </Flex>
    );
  }
}
