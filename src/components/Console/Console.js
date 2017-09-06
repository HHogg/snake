import React, { Component, PropTypes } from 'react';
import ConsoleMessage from './ConsoleMessage';
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
      <div className="sh-console">
        <div className="sh-console__messages" ref={ (el) => this.messages = el }>
          { messages.map((message, index) =>
            <ConsoleMessage key={ index }>
              { message }
            </ConsoleMessage>
          ) }
        </div>

        <a className="sh-console__clear" onClick={ onConsoleClear }>
          Clear console
        </a>
      </div>
    );
  }
}
