import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, Flex, Icon, Link, Text } from 'preshape';

const NOTIFICATION_DURATION = 5000;

const color = {
  'error': 'negative',
  'success': 'positive',
};

export default class Notification extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['error', 'success']).isRequired,
  };

  componentDidMount() {
    const { id, onRemove } = this.props;

    window.setTimeout(() => onRemove({ id }), NOTIFICATION_DURATION);
  }

  render() {
    const { children, id, onRemove, type, ...rest } = this.props;

    return (
      <Alert { ...rest }
          color={ color[type] }
          paddingHorizontal="x3"
          paddingVertical="x2"
          style="solid">
        <Flex alignChildrenVertical="middle" direction="horizontal">
          <Flex initial="none" grow>
            <Text size="small" strong>{ children }</Text>
          </Flex>

          <Flex>
            <Link onClick={ () => onRemove({ id }) }>
              <Icon name="Cross" size="1rem" />
            </Link>
          </Flex>
        </Flex>
      </Alert>
    );
  }
}

