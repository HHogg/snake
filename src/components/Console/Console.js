import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Buttons, Button, Flex, Text } from 'preshape';

/* eslint-disable react/no-find-dom-node */
export default class Console extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    onConsoleClear: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    window.requestAnimationFrame(() => {
      this.messages.lastElementChild &&
        this.messages.lastElementChild.scrollIntoView();
    });
  }

  render() {
    const { messages, onConsoleClear, ...rest } = this.props;

    return (
      <Flex { ...rest } container direction="vertical" minHeight="7rem">
        <Flex
            borderColor
            borderSize="x2"
            direction="vertical"
            grow
            minHeight="5rem">
          <Flex
              backgroundColor="shade-2"
              padding="x3"
              grow
              initial="none"
              ref={ (el) => this.messages = ReactDOM.findDOMNode(el) }
              scrollable>
            { messages.map((message, index) => (
              <Text key={ index } monospace>{ `> ${message}` }</Text>
            )) }
          </Flex>

          <Buttons absolute="bottom-right">
            <Button onClick={ onConsoleClear }>Clear Console</Button>
          </Buttons>
        </Flex>
      </Flex>
    );
  }
}
