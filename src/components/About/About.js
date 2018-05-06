import React, { Component } from 'react';
import { Flex, Image, Link, Responsive, Text } from 'preshape';
import { widthSmall } from '../Root';
import AboutSection from './AboutSection';
import AboutText from './AboutText';
import SignIn from '../Auth/SignIn';

export default class About extends Component {
  render() {
    return (
      <Flex
          maxWidth={ widthSmall }
          paddingHorizontal="x3"
          paddingVertical="x12">
        <Text margin="x12" size="title">About Snake Heuristics</Text>

        <Responsive queries={ [widthSmall] }>
          { (match) => (
            <Flex
                direction={ match(widthSmall) ? 'horizontal' : 'vertical' }
                gutter={ match(widthSmall) ? 'x12' : 'x6' }>
              <Flex
                  initial={ match(widthSmall) ? 'none' : null }
                  grow>
                <AboutSection title="What is Snake Heuristics?">
                  <AboutText>
                    Snake Heuristics is a game for Developers to write a heuristic
                    function, to play the perfect classic game of snake.
                  </AboutText>
                </AboutSection>

                <Image src="/assets/snake.gif" width="100%" />

                <AboutSection title="What is it in a bit more detail?">
                  <AboutText>
                    The goal is to write a heuristic function that returns a single
                    number. The function is run on every cell on the board, but only
                    the cells around the head of the snake are important. The snake
                    will move to the cell with the lowest number, and will continue
                    to do this while collecting points, until it either crashes or
                    there are no cell left to move to.
                  </AboutText>
                </AboutSection>

                <AboutSection
                    last={ match(widthSmall) }
                    title="Some other stuff you should know">
                  <AboutText>
                    If two or more cells have the same lowest number, then the first of
                    those cells clockwise from the top will be chosen.
                  </AboutText>

                  <AboutText>
                    Finding the balance of accuracy, speed and efficiency is the main
                    challenge. Snake Heuristic's scores solution on all three of these
                    areas. See the scoring section for more information.
                  </AboutText>
                </AboutSection>
              </Flex>

              <Flex
                  initial={ match(widthSmall) ? 'none' : null }
                  grow>
                <AboutSection title="What are the controls for?">
                  <AboutText>
                    You can alter your solution at any point in the game, and see how
                    those changes affect your current position or any
                    position previously in the game... but be careful,
                    if you rewind and make changes to your solution the Butterfly Effect
                    will change how the snake previously moved.
                  </AboutText>
                </AboutSection>

                <AboutSection title="How is the solution scored?">
                  <AboutText>
                    Basically, the fewer moves the snake takes to reach the point the
                    better. The score grows exponentially with the more points collected
                    and the efficiency has a greater weight at the beginning of the
                    game.
                  </AboutText>

                  <AboutText>
                    Here's an example. The methodical sweep technique is a sure thing to
                    get you the perfect completion, but it is very inefficient so will
                    score very low. A Manhattan Distance is very efficient, but is
                    highly unlikely to get you many points before it crashes.
                  </AboutText>
                </AboutSection>

                <AboutSection last title="What is the Leaderboard, and how do I submit my solution?">
                  <AboutText>
                    Solutions submitted to the Leaderboard are run in a cloud
                    environment, where a score is calculated using the same equation
                    used on this client. To submit to the Leaderboard, you need to <SignIn><Link>"Sign
                    in with Github"</Link></SignIn> and once your solution is saved, press "Submit".
                    You will also be able to permanently store solutions in the
                    "My Saved Solutions" area.
                  </AboutText>
                </AboutSection>
              </Flex>
            </Flex>
          ) }
        </Responsive>
      </Flex>
    );
  }
}
