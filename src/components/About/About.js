import React, { Component, PropTypes } from 'react';
import AboutStep from './AboutStep';
import AboutSteps from './AboutSteps';
import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';
import Flex from '../Flex/Flex';
import GithubAuthenticationLink from '../GithubAuthenticationLink';
import Heading from '../Heading/Heading';
import HeuristicValueSVG from './HeuristicValueSVG';
import Link from '../Link/Link';
import Paragraph from '../Paragraph/Paragraph';
import PathfindingSVG from './PathfindingSVG';
import ScoringSVG from './ScoringSVG';

export default class About extends Component {
  static propTypes = {
    isAboutActive: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onSkip: PropTypes.func,
    skipIntro: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  componentWillReceiveProps(next) {
    const { isAboutActive } = this.props;

    if (!isAboutActive && next.isAboutActive) {
      this.setState({ step: 0 });
    }
  }

  render() {
    const { step } = this.state;
    const { isLoggedIn, onPlay, onSkip } = this.props;

    return (
      <Flex centerChildren container>
        <AboutSteps
            onStepChange={ (step) => this.setState({ step }) }
            onSkip={ onSkip }
            step={ step }>
          <AboutStep>
            <PathfindingSVG />
            <Heading>Pathfinding and Heuristics</Heading>
            <Paragraph>
              Pathfinding is <Link href="http://theory.stanford.edu/~amitp/GameProgramming/">
              "the problem of finding a good path from the starting point to the goal―avoiding
              obstacles, avoiding enemies, and minimizing costs (fuel, time, distance, equipment,
              money, etc)" (Amit Patel)</Link>. A heurisitic funcition provides an estimated
              value of the cost for a step to the goal. It can be used to control the behaviour of
              the searching algorithm.
            </Paragraph>
          </AboutStep>

          <AboutStep>
            <HeuristicValueSVG />
            <Heading>Playing Snake Heuristics</Heading>
            <Paragraph>
              The goal is to move the snake across the cells to the point by returning a number
              from the <code>heuristic()</code> function. The function is called for every cell
              every time the snake needs to move, and is provided with information of the
              environment.
            </Paragraph>

            <Paragraph>
              The lowest number given for the 3 cells around the snakes head will be the next
              position the snake will take. If two cells have the same value, the first cell c
              lockwise from the top cell will be selected. Cells that are out of bounds and
              contain the snake are already excluded from selection.
            </Paragraph>
          </AboutStep>

          <AboutStep>
            <ScoringSVG />
            <Heading>Scoring</Heading>
            <Paragraph>
              To encourage minimizing costs, metrics for each point collection and the overall
              averages are fed into a rudementary scoring system. This will give an indication
              to how good your solution is.
            </Paragraph>
          </AboutStep>

          <AboutStep>
            <Heading>The Leaderboard</Heading>
            <Paragraph>
              Solutions are temporary stored into local storage, but when authenticated
              with <Link href="https://github.com">GitHub</Link> they can be stored more
              perminantly. Once a valid solution has been saved, it can be submitted to the
              Leaderboard where it will be run against a similar environment.
            </Paragraph>

            { !isLoggedIn && (
              <Paragraph>
                <GithubAuthenticationLink />
              </Paragraph>
            ) }

            <ButtonGroup>
              <Button
                  color="blue"
                  onClick={ () => onPlay() }
                  shrink>
                I'm ready, let me play!
              </Button>
            </ButtonGroup>
          </AboutStep>
        </AboutSteps>
      </Flex>
    );
  }
}
