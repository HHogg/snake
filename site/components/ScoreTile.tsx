import * as React from 'react';
import { Box, Text } from 'preshape';

interface Props {
  label: string;
  value: number;
}

export default (props: Props) => {
  const { value, label } = props;

  return (
    <Box
        basis="0"
        grow
        padding="x3">
      <Text align="middle">
        <Text inline size="x5">{ value }</Text> <Text color="shade-3" inline size="x1">{ label }</Text>
      </Text>
    </Box>
  );
};
