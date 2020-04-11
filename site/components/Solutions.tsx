import * as React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Text,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'preshape';
import solutions from '../solutions';
import { ISolution } from '../Types';
import { CANVAS_SIZE, SNAKE_LENGTH } from '../config';
import { RootContext } from './Root';

export default () => {
  const { onSelect } = React.useContext(RootContext);
  const { push } = useHistory();

  const handleSelect = (solution: ISolution) => {
    onSelect(solution);
    push('/');
  };

  return (
    <Modal
        gap="x6"
        margin="x6"
        maxWidth="800px"
        onClose={ () => push('/') }
        padding="x6"
        visible
        zIndex={ 6 }>
      <ModalHeader>
        <Text strong>Solutions</Text>
      </ModalHeader>

      <ModalBody minHeight="300px">
        <Table size="x1">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>
                Name
              </TableHeaderCell>

              <TableHeaderCell align="middle">
                Points
              </TableHeaderCell>

              <TableHeaderCell align="middle">
                Average
              </TableHeaderCell>

              <TableHeaderCell align="middle">
                Score
              </TableHeaderCell>

              <TableHeaderCell align="middle">
                Progress
              </TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            { solutions.map((solution, index) => (
              <TableRow
                  clickable
                  key={ index }
                  onPointerUp={ () => handleSelect(solution) }>
                <TableCell align="start" ellipsis>
                  <Text strong>{ solution.name }</Text>
                </TableCell>

                <TableCell align="middle" ellipsis>
                  { Math.floor(solution.points) }
                </TableCell>

                <TableCell align="middle" ellipsis>
                  { Math.floor(solution.average) }
                </TableCell>

                <TableCell align="middle" ellipsis>
                  { Math.floor(solution.score) }
                </TableCell>

                <TableCell align="middle">
                  <Text strong>
                    { `${Math.floor((solution.points / ((CANVAS_SIZE * CANVAS_SIZE) - SNAKE_LENGTH)) * 100)}%` }
                  </Text>
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </ModalBody>
    </Modal>
  );
};
