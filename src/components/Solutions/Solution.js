import React, { Component, PropTypes } from 'react';
import fecha from 'fecha';
import ButtonGroup from '../Button/ButtonGroup';
import Button from '../Button/Button';

export default class Solution extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    average: PropTypes.number,
    displayName: PropTypes.string.isRequired,
    error: PropTypes.string,
    isRunning: PropTypes.bool,
    modified: PropTypes.number.isRequired,
    onSubmit: PropTypes.func,
    onLoad: PropTypes.func,
    onDelete: PropTypes.func,
    points: PropTypes.number,
    score: PropTypes.number,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      deleting: false,
    };
  }

  handleDelete() {
    const { onDelete } = this.props;
    this.setState({ deleting: true });
    onDelete();
  }

  render() {
    const { deleting } = this.state;
    const {
      avatar,
      average,
      displayName,
      error,
      isRunning,
      modified,
      onSubmit,
      onLoad,
      onDelete,
      points,
      score,
      title,
    } = this.props;

    const stats = [];

    if (points) stats.push({ label: 'Points', value: points });
    if (average) stats.push({ label: 'Average', value: average });
    if (score) stats.push({ label: 'Score', value: Math.floor(score) });

    return (
      <div className="sh-solution">
        <div className="sh-solution__data">
          <div className="sh-solution__container">
            <img className="sh-solution__avatar" src={ avatar } />

            <div className="sh-solution__details">
              <div className="sh-solution__name">
                { title } <span className="sh-solution__user">by { displayName }</span>
              </div>
              <div className="sh-solution__lastModified">
                { fecha.format(new Date(modified), 'dddd Do MMMM, YYYY') }
              </div>
            </div>

            { (points || average || score) && (
              <div className="sh-solution__stats">
                { stats.map(({ label, value }) =>
                  <div className="sh-solution__stat" key={ label }>
                    <span className="sh-solution__stat-value">{ value }</span>
                    <span className="sh-solution__stat-label">{ label }</span>
                  </div>
                ) }
              </div>
            ) }

            { (onSubmit || onLoad || onDelete) && (
              <div className="sh-solution__actions">
                <ButtonGroup>
                  { onSubmit && (
                    <Button
                        color="gray"
                        disabled={ isRunning }
                        onClick={ () => onSubmit() }>
                      Submit
                    </Button>
                  ) }

                  { onLoad && (
                    <Button
                        color="gray"
                        onClick={ () => onLoad() }>
                      Load
                    </Button>
                  ) }

                  { onDelete && (
                    <Button
                        color="red"
                        disabled={ deleting }
                        onClick={ () => this.handleDelete() }>
                      Delete
                    </Button>
                  ) }
                </ButtonGroup>
              </div>
            ) }
          </div>
        </div>

        { error && !isRunning && (
          <div className="sh-solution__error">
            Last leaderboard solution returned: { error }
          </div>
        ) }

        { isRunning && (
          <div className="sh-solution__info">
            Currently running, this may take a few minutes.
          </div>
        ) }
      </div>
    );
  }
}
