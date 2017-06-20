import React, { Component, PropTypes } from 'react';
import fecha from 'fecha';
import ButtonGroup from '../Button/ButtonGroup';
import Button from '../Button/Button';

export default class Solution extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    average: PropTypes.number,
    lastModified: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onLoad: PropTypes.func,
    onDelete: PropTypes.func,
    points: PropTypes.number,
    score: PropTypes.number,
    title: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  };

  render() {
    const {
      avatar,
      average,
      lastModified,
      onSubmit,
      onLoad,
      onDelete,
      points,
      score,
      title,
      user,
    } = this.props;

    const stats = [];

    if (points) stats.push({ label: 'Points', value: points });
    if (average) stats.push({ label: 'Average', value: average });
    if (score) stats.push({ label: 'Score', value: score });

    return (
      <div className="sh-solution">
        <div className="sh-solution__container">
          <img className="sh-solution__avatar" src={ avatar } />

          <div className="sh-solution__details">
            <div className="sh-solution__name">
              { title } <span className="sh-solution__user">by { user }</span>
            </div>
            <div className="sh-solution__lastModified">
              { fecha.format(new Date(lastModified), 'dddd Do MMMM, YYYY') }
            </div>
          </div>

          { !!stats.length && (
            <div className="sh-solution__stats">
              { stats.map(({ label, value }) =>
                <div className="sh-solution__stat" key={ label }>
                  <span className="sh-solution__stat-value">{ value }</span>
                  <span className="sh-solution__stat-label">{ label }</span>
                </div>
              ) }
            </div>
          ) }

          { onDelete && (
            <div className="sh-solution__actions">
              <ButtonGroup>
                <Button color="gray" onClick={ onSubmit }>Submit</Button>
                <Button color="gray" onClick={ onLoad }>Load</Button>
                <Button color="red" onClick={ onDelete }>Delete</Button>
              </ButtonGroup>
            </div>
          ) }
        </div>
      </div>
    );
  }
}
