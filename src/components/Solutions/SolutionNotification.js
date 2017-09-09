import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

export default class SolutionNotification extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['error', 'info']).isRequired,
  };

  render() {
    const { children, type, ...rest } = this.props;
    const classes = classnames('sh-solution-notification',
      `sh-solution-notification--${type}`);

    return (
      <Flex { ...rest } className={ classes } padding="x3">
        <Text strong>
          { children }
        </Text>
      </Flex>
    );
  }
}
