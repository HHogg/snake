import * as React from 'react';
import { Appear, Flex, Link, Text } from 'preshape';

interface Props {
  messages: string[];
  onConsoleClear: () => void;
}

export default (props: Props) => {
  const { messages, onConsoleClear } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    window.requestAnimationFrame(() => {
      ref.current?.lastElementChild?.scrollIntoView();
    });
  }, [messages]);

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
          { messages.map((message, index) => (
            <Text key={ index } monospace>{ `> ${message}` }</Text>
          )) }
        </Flex>

        <Appear animation="FadeSlideUp" visible={ messages.length > 0 }>
          <Flex absolute="bottom-right" padding="x2">
            <Link onClick={ onConsoleClear } size="x1" strong>Clear Console</Link>
          </Flex>
        </Appear>
      </Flex>
    </Flex>
  );
};
