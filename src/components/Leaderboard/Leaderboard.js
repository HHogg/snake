import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { database } from 'firebase';
import {
  Appear,
  Flex,
  Icon,
  List,
  ListItem,
  Responsive,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from 'preshape';
import { widthSmall } from '../Root';
import Avatar from '../Avatar/Avatar';
import { LEADERBOARD_LIMIT } from '../../../functions/config';

const emojiOrNumber = (n) => {
  switch (n) {
  case 1: return <Text size="title">🥇</Text>;
  case 2: return <Text size="title">🥈</Text>;
  case 3: return <Text size="title">🥉</Text>;
  default: return n;
  }
};

export default class Leaderboard extends Component {
  static propTypes = {
    solutions: PropTypes.array.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    leaderboardUsers: PropTypes.object.isRequired,
    onErrorNotification: PropTypes.func.isRequired,
    onSolutionAdded: PropTypes.func.isRequired,
    onSolutionLoad: PropTypes.func.isRequired,
    onSolutionRemoved: PropTypes.func.isRequired,
    onSolutionUpdated: PropTypes.func.isRequired,
    onSolutionUserAdded: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {
      onErrorNotification,
      onSolutionAdded,
      onSolutionRemoved,
      onSolutionUpdated,
      onSolutionUserAdded,
    } = this.props;

    this.solutionsRef = database()
      .ref('leaderboard')
      .orderByChild('_pathCount/length')
      .startAt(0)
      .limitToLast(LEADERBOARD_LIMIT);

    this.solutionsRef.on('child_added',
      (data) => {
        const solution = data.val();

        if (!this.props.leaderboardUsers[solution.uid]) {
          database()
            .ref(`/users/${solution.uid}`)
            .once('value', (user) => {
              onSolutionUserAdded({ user: user.val(), key: solution.uid });
              onSolutionAdded({ solution, key: data.key });
            });
        } else {
          onSolutionAdded({ solution, key: data.key });
        }
      },
      (error) => onErrorNotification(`Firebase: ${error.message}`));

    this.solutionsRef.on('child_changed',
      (data) => onSolutionUpdated({ solution: data.val(), key: data.key }),
      (error) => onErrorNotification(`Firebase: ${error.message}`));

    this.solutionsRef.on('child_removed',
      (data) => onSolutionRemoved({ solution: data.val(), key: data.key }),
      (error) => onErrorNotification(`Firebase: ${error.message}`));
  }

  componentWillUnmount() {
    this.solutionsRef.off();
  }

  render() {
    const { solutions } = this.props;

    return (
      <Flex
          direction="vertical"
          grow
          gutter="x12"
          maxWidth={ widthSmall }
          paddingHorizontal="x3"
          paddingVertical="x12">
        <Flex>
          <Text size="title">Leaderboard</Text>
          <Text margin="x2">Solutions submitted to the Leaderboard are run in a cloud environment, where a score
            is calculated using the same equation used on this client. Solution
            are progressively scored for how many points are collected and
            is heavily weighted against the average moves taken.</Text>
        </Flex>

        { !solutions.length && (
          <Flex
              alignChildrenHorizontal="middle"
              alignChildrenVertical="middle"
              direction="vertical"
              grow>
            <Icon name="Progress" size="1.5rem" spin="slow" />
            <Text margin="x2" size="small" strong>Loading leaderboard solutions</Text>
          </Flex>
        ) }

        { !!solutions.length && (
          <Appear Component={ Flex }>
            <Responsive queries={ [widthSmall] }>
              { (match) => (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell />
                      <TableHeaderCell>Solution</TableHeaderCell>

                      { match(widthSmall) && (
                        <Fragment>
                          <TableHeaderCell align="middle">Points</TableHeaderCell>
                          <TableHeaderCell align="middle">Average</TableHeaderCell>
                          <TableHeaderCell align="middle">Progress</TableHeaderCell>
                        </Fragment>
                      ) }

                      <TableHeaderCell align="middle" sorted>Score</TableHeaderCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    { solutions
                        .map(({ average, progress, ...rest }) => ({
                          ...rest,
                          average: +average.toFixed(),
                          progress: `${(progress * 100).toFixed()}%`,
                        }))
                        .map(({ avatar, average, displayName, points, progress, score, title }, index) => (
                      <TableRow key={ index }>
                        <TableCell align="middle">
                          <Text strong>
                            { emojiOrNumber(index + 1) }
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Flex
                              alignChildrenVertical="middle"
                              direction="horizontal"
                              gutter="x4">
                            { match(widthSmall) && (
                              <Flex>
                                <Avatar size="2.5rem" src={ avatar } />
                              </Flex>
                            ) }

                            <Flex>
                              <Text strong>{ title }</Text>
                              <Text color="shade-3" size="small">by { displayName }</Text>

                              { match(null, (
                                <Text Component="div" margin="x2" size="small">
                                  <List>
                                    <ListItem>
                                      <Text inline strong>Points:</Text> { points }
                                    </ListItem>
                                    <ListItem>
                                      <Text inline strong>Average:</Text> { average }
                                    </ListItem>
                                    <ListItem>
                                      <Text inline strong>Progress:</Text> { progress }
                                    </ListItem>
                                  </List>
                                </Text>
                              )) }
                            </Flex>
                          </Flex>
                        </TableCell>

                        { match(widthSmall) && (
                          <Fragment>
                            <TableCell align="middle">{ points }</TableCell>
                            <TableCell align="middle">{ average }</TableCell>
                            <TableCell align="middle">{ progress }</TableCell>
                          </Fragment>
                        ) }

                        <TableCell align="middle" sorted>{ +score.toFixed() }</TableCell>
                      </TableRow>
                    )) }
                  </TableBody>
                </Table>
              ) }
            </Responsive>
          </Appear>
        ) }
      </Flex>
    );
  }
}
