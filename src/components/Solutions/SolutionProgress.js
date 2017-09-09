import React, { Component, PropTypes } from 'react';
import getGradientColor from '../../utils/getGradientColor';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

const ORDINALS = ['th', 'st', 'nd', 'rd'];
const ordinal = (n) => n + (
  ORDINALS[((n % 100) - 20) % 10] ||
  ORDINALS[(n % 100)] ||
  ORDINALS[0]
);

export default class SolutionProgress extends Component {
  static propTypes = {
    position: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
  };

  render() {
    const { position, progress } = this.props;
    const style = {
      backgroundColor: getGradientColor(progress),
      width: '5rem',
    };

    return (
      <Flex
          alignChildrenHorizontal="middle"
          alignChildrenVertical="middle"
          container
          direction="vertical"
          padding="x3"
          style={ style }>
        <Text color="dark" size="large">{ ordinal(position) }</Text>
        <Text color="dark">({ (progress * 100).toFixed() }%)</Text>
      </Flex>
    );
  }
}
