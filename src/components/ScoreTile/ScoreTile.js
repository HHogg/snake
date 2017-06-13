import React, { Component, PropTypes } from 'react';

export default class ScoreTile extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  };

  render() {
    const { value, label } = this.props;

    return (
      <div className="sh-score-tile">
        <span className="sh-score-tile__value">{ value }</span>
        <span className="sh-score-tile__label">{ label }</span>
      </div>
    );
  }
}
