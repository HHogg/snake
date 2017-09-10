import React, { Component, PropTypes } from 'react';
import ConsoleMessage from './ConsoleMessage';
import Flex from '../Flex/Flex';
import './Console.css';

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
    const { messages, onConsoleClear } = this.props;

    return (
      <Flex className="sh-console" parent>
        <Flex
            className="sh-console__messages"
            ref={ (el) => this.messages = el }>
          { messages.map((message, index) =>
            <ConsoleMessage key={ index }>
              { message }
            </ConsoleMessage>
          ) }
        </Flex>

        <a className="sh-console__clear" onClick={ onConsoleClear }>
          Clear console
        </a>
      </Flex>
    );
  }
}
