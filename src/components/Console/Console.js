import React, { Component, PropTypes } from 'react';
import './Console.css';

export default class Console extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onConsoleClear: PropTypes.func.isRequired,
  };

  render() {
    const { children, onConsoleClear } = this.props;

    return (
      <div className="sh-console">
        <div className="sh-console__messages">
          { children }
        </div>

        <a className="sh-console__clear" onClick={ onConsoleClear }>
          Clear console
        </a>
      </div>
    );
  }
}
