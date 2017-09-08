import React, { Component, PropTypes } from 'react';
import Text from '../Text/Text';

export default class ConsoleMessage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <Text className="sh-console__message" space="x2">
        { this.props.children }
      </Text>
    );
  }
}
