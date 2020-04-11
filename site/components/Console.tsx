import * as React from 'react';
import { Appear, Flex, Link, Text } from 'preshape';
import { SnakeContext } from '@hogg/snake';

export default () => {
  const { logs, onClearLog } = React.useContext(SnakeContext);;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      ref.current?.lastElementChild?.scrollIntoView();
    });
  }, [logs]);

  return (
    <Flex
        basis="none"
        container
        direction="vertical"
        grow
        height="7rem">
      <Flex
          direction="vertical"
          grow
          height="5rem">
        <Flex
            backgroundColor="background-shade-2"
            basis="none"
            grow
            padding="x3"
            ref={ ref }
            scrollable>
          { logs.map((message, index) => (
            <Text key={ index } monospace>{ `> ${message}` }</Text>
          )) }
        </Flex>

        <Appear animation="FadeSlideUp" visible={ logs.length > 0 }>
          <Flex absolute="bottom-right" padding="x2">
            <Link onClick={ onClearLog } size="x1" strong>Clear Console</Link>
          </Flex>
        </Appear>
      </Flex>
    </Flex>
  );
};
