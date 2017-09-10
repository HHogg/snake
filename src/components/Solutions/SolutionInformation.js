import React, { Component, PropTypes } from 'react';
import fecha from 'fecha';
import Avatar from '../Avatar/Avatar';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

export default class SolutionInformation extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarSize: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    modified: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { avatar, avatarSize, displayName, modified, title } = this.props;

    return (
      <Flex alignChildrenVertical="middle" parent space="x1">
        { avatar && (
          <Flex shrink>
            <Avatar size={ avatarSize } src={ avatar } />
          </Flex>
        ) }

        <Flex>
          <Text size="medium" strong>{ title } { displayName &&
            <Text inline size="small" subtle weak>by { displayName }</Text>
          }</Text>
          <Text>{ fecha.format(new Date(modified), 'dddd Do MMMM, YYYY') }</Text>
        </Flex>
      </Flex>
    );
  }
}
