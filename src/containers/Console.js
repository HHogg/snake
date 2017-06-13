import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { consoleClearMessages } from '../store/console';
import Console from '../components/Console/Console';
import ConsoleMessage from '../components/Console/ConsoleMessage';

class ConsoleC extends Component {
  static propTypes = {
    consoleClearMessages: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
  };

  render() {
    const { consoleClearMessages, messages } = this.props;

    return (
      <Console onConsoleClear={ consoleClearMessages }>
        { messages.map((message, index) =>
          <ConsoleMessage key={ index }>
            { message }
          </ConsoleMessage>
        ) }
      </Console>
    );
  }
}

export default connect((state) => ({
  messages: state.console.messages,
}), {
  consoleClearMessages,
})(ConsoleC);
