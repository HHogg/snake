import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Flex,
  Link,
  Modal,
  ModalBody,
  Text,
  ModalHeader,
} from 'preshape';
import Logo from './Logo';

export default () => {
  const { push } = useHistory();

  return (
    <Modal
        margin="x6"
        maxWidth="600px"
        onClose={ () => push('/') }
        padding="x6"
        visible
        zIndex={ 5 }>
      <ModalHeader />
      <ModalBody>
        <Flex alignChildren="middle" direction="vertical" margin="x4">
          <Logo height="6rem" width="6rem" />
        </Flex>

        <Text align="middle" margin="x4">
          Snake Heuristics is a game for developers to code the behaviour of the
          snake in the classic point finding game.
        </Text>

        <Text align="middle" margin="x4">
          The goal is to write a heuristic function that returns a single
          number. The function is run on every cell on the board (but only
          the cells around the head of the snake are important). The snake
          will move to the cell with the lowest number, and will continue
          to do this while collecting points, until it either crashes or
          there are no cell left to move to.
        </Text>

        <Text align="middle" margin="x4">
          The solution is scored in 3 areas: accuracy, speed and efficiency.
          Basically, the fewer moves the snake takes to reach the point the
          better. The score grows exponentially with the more points collected
          and the efficiency has a greater weight at the beginning of the
          game.
        </Text>

        <Text margin="x8" size="x1" tag="div">
          <Text align="middle" strong>Harrison Hogg</Text>
          <Text align="middle">Software Engineer</Text>
          <Text align="middle">
            <Link
                href="https://hogg.io"
                target="HoggIO"
                underline>
              https://hogg.io
            </Link>
          </Text>
        </Text>
      </ModalBody>
    </Modal>
  );
};
