import React, { Component, PropTypes } from 'react';

export default class AppFooter extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <div { ...rest } className="sh-app__footer">
        { children }
      </div>
    );
  }
}
