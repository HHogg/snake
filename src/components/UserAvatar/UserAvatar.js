import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

export const USER_AVATAR_SIZE = '2rem';

export default class UserAvatar extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  };

  render() {
    const { name, src } = this.props;
    const style = { height: USER_AVATAR_SIZE };

    return (
      <Flex container alignChildrenVertical="middle" style={ style }>
        <Flex>
          <Text strong>{ name }</Text>
        </Flex>
        <Flex shrink>
          <Avatar size={ USER_AVATAR_SIZE } src={ src } />
        </Flex>
      </Flex>
    );
  }
}
