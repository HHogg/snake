import React, { Component, PropTypes } from 'react';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

const GRADIENT = [
  [0.0, [255, 224, 102] ],
  [0.5, [192, 235, 117] ],
  [1.0, [102, 217, 232] ],
];

const getProgressColor = (progress) => {
  const upperIndex = GRADIENT.findIndex(([p]) => p > progress);
  const [lp, [lr, lg, lb]] = GRADIENT[upperIndex - 1];
  const [up, [ur, ug, ub]] = GRADIENT[upperIndex];
  const upperPercentage = (progress - lp) / (up - lp);
  const lowerPercentage = 1 - upperPercentage;

  return `rgb(
    ${Math.floor(lr * lowerPercentage + ur * upperPercentage)},
    ${Math.floor(lg * lowerPercentage + ug * upperPercentage)},
    ${Math.floor(lb * lowerPercentage + ub * upperPercentage)}
  )`;
};

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
      backgroundColor: getProgressColor(progress),
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
