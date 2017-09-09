import React, { Component, PropTypes } from 'react';
import Flex from '../Flex/Flex';
import SolutionControls from './SolutionControls';
import SolutionInformation from './SolutionInformation';
import SolutionNotification from './SolutionNotification';
import SolutionProgress from './SolutionProgress';
import SolutionScoreBoard from './SolutionScoreBoard';

export default class Solution extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    average: PropTypes.number,
    displayName: PropTypes.string,
    error: PropTypes.string,
    running: PropTypes.bool,
    modified: PropTypes.number.isRequired,
    onDelete: PropTypes.func,
    onLoad: PropTypes.func,
    onSubmit: PropTypes.func,
    points: PropTypes.number,
    position: PropTypes.number,
    progress: PropTypes.number,
    score: PropTypes.number,
    title: PropTypes.string.isRequired,
  };

  render() {
    const {
      avatar,
      average,
      displayName,
      error,
      running,
      modified,
      onSubmit,
      onLoad,
      onDelete,
      points,
      position,
      progress,
      score,
      title,
    } = this.props;

    return (
      <Flex className="sh-solution" container direction="vertical">
        <Flex alignChildrenVertical="middle" container shrink space="x0">
          { progress && (
            <Flex shrink>
              <SolutionProgress
                  position={ position }
                  progress={ progress } />
            </Flex>
          ) }

          <Flex alignChildrenVertical="middle" container padding="x3">
            <Flex>
              <SolutionInformation
                  avatar={ avatar }
                  displayName={ displayName }
                  modified={ modified }
                  title={ title } />
            </Flex>

            { score && (
              <Flex shrink>
                <SolutionScoreBoard
                    average={ average }
                    points={ points }
                    score={ score } />
              </Flex>
            ) }

            { (onSubmit && onLoad && onDelete) && (
              <Flex shrink>
                <SolutionControls
                    running={ running }
                    onDelete={ onDelete }
                    onLoad={ onLoad }
                    onSubmit={ onSubmit }/>
              </Flex>
            ) }
          </Flex>
        </Flex>

        { (error || running) && (
          <Flex shrink>
            { error && !running && (
              <SolutionNotification type="error">
                Last leaderboard solution returned: { error }
              </SolutionNotification>
            ) }

            { running && (
              <SolutionNotification type="info">
                Currently running, this may take a few minutes.
              </SolutionNotification>
            ) }
          </Flex>
        ) }
      </Flex>
    );
  }
}
