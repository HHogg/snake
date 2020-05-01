import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  useMatchMedia,
  useLocalStorage,
  useTheme,
  Button,
  Editor,
  Flex,
  Icon,
  Link,
  List,
  ListItem,
  Tab,
  Tabs,
  Text,
  ThemeSwitcher,
  Tooltip,
  TypeTheme,
} from 'preshape';
import { Snake, SnakeViewer } from '@hhogg/snake';
import { ISolution } from '../Types';
import { CANVAS_SIZE } from '../config';
import { blank, manhattanDistance } from '../solutions';
import About from './About';
import Console from './Console';
import Controller from './Controller';
import Logo from './Logo';
import Scoreboard from './Scoreboard';
import Solutions from './Solutions';

import 'brace/mode/javascript';

const worker = new Worker('../../src/SnakeRunnerWorker.js');

export const RootContext = React.createContext<ISolution & {
  onSelect: (solution: ISolution) => void;
  theme: TypeTheme;
}>({
  content: '',
  name: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSelect: () => {},
  theme: 'night',
});


export default () => {
  const [theme, setTheme ] = useLocalStorage<TypeTheme>('com.hogg.theme', 'night');
  const [editorState, setEditorState] = useLocalStorage<ISolution>('com.hogg.snake.editor', manhattanDistance);
  const [activeTab, setActiveTab] = React.useState<'game' | 'editor'>('game');
  const match = useMatchMedia(['1000px']);

  useTheme(theme);

  const onChange = (content: string) => {
    setEditorState({ ...editorState, content });
  };

  const onSelect = (solution: ISolution) => {
    setEditorState(solution);
  };

  const onReset = () => {
    setEditorState(blank);
  };

  const context = {
    ...editorState,
    onSelect,
    theme,
  };

  return (
    <RootContext.Provider value={ context }>
      <Flex direction="vertical" grow>
        <Flex
            alignChildrenVertical="middle"
            direction="horizontal"
            gap="x6"
            paddingHorizontal="x6"
            paddingVertical="x2">
          <Flex
              alignChildrenVertical="middle"
              direction="horizontal"
              gap="x4"
              grow>
            <Flex>
              <Logo height="32px" width="32px" />
            </Flex>
          </Flex>

          <Flex>
            <List gap="x2">
              <ListItem separator="|">
                <Tooltip content="Solutions">
                  { (props) => (
                    <Link { ...props } display="block" to="/solutions">
                      <Icon name="Book" size="1.25rem" />
                    </Link>
                  ) }
                </Tooltip>
              </ListItem>

              <ListItem separator="|">
                <Tooltip content="About">
                  { (props) => (
                    <Link { ...props } display="block" to="/about">
                      <Icon name="Info" size="1.25rem" />
                    </Link>
                  ) }
                </Tooltip>
              </ListItem>

              <ListItem separator="|">
                <Tooltip content="Github">
                  { (props) => (
                    <Link { ...props } display="block" href="https://github.com/HHogg/snake" target="Snake" title="Snake">
                      <Icon name="Github" size="1.25rem" />
                    </Link>
                  ) }
                </Tooltip>
              </ListItem>

              <ListItem separator="|">
                <ThemeSwitcher
                    onChange={ setTheme }
                    theme={ theme } />
              </ListItem>
            </List>
          </Flex>
        </Flex>

        <Flex>
          <Flex borderColor="background-shade-3" borderSize="x1" />
        </Flex>

        { !match('1000px') && (
          <Tabs margin="x2" paddingHorizontal="x6">
            <Tab
                active={ activeTab === 'game' }
                onClick={ () => setActiveTab('game') }>Game</Tab>
            <Tab
                active={ activeTab === 'editor' }
                onClick={ () => setActiveTab('editor') }>Editor</Tab>
          </Tabs>
        ) }

        <Flex direction="horizontal" grow>
          { (match('1000px') || activeTab === 'game') && (
            <Flex
                basis="none"
                direction="vertical"
                grow
                paddingHorizontal="x6"
                paddingVertical="x4">
              <Snake
                  solution={ editorState.content }
                  worker={ worker }
                  xLength={ CANVAS_SIZE }
                  yLength={ CANVAS_SIZE }>
                <Flex
                    direction="horizontal"
                    gap="x4"
                    grow>
                  <Flex
                      basis="none"
                      direction="vertical"
                      gap="x2"
                      grow>
                    <Flex
                        basis="none"
                        direction="vertical"
                        grow
                        minHeight="20rem">
                      <SnakeViewer theme={ theme } />
                    </Flex>

                    <Flex direction="horizontal">
                      <Console />
                    </Flex>

                    <Flex>
                      <Scoreboard />
                    </Flex>

                    <Flex>
                      <Controller />
                    </Flex>
                  </Flex>
                </Flex>
              </Snake>
            </Flex>
          ) }

          { match('1000px') && (
            <Flex borderColor="background-shade-3" borderSize="x1" />
          ) }

          { (match('1000px') || activeTab === 'editor') && (
            <Flex
                basis="none"
                direction="vertical"
                gap="x6"
                grow
                paddingHorizontal="x6"
                paddingVertical="x4">
              <Flex
                  alignChildrenVertical="middle"
                  direction="horizontal"
                  gap="x2">
                <Flex basis="none" grow>
                  <Text ellipsis strong>{ editorState.name }</Text>
                </Flex>

                <Flex>
                  <Button
                      color="negative"
                      gap="x2"
                      onClick={ () => onReset() }>
                    <Flex><Icon name="Delete" size="1rem" /></Flex>
                    <Flex>Clear</Flex>
                  </Button>
                </Flex>
              </Flex>

              <Flex direction="vertical" grow>
                <Editor
                    language="javascript"
                    onChange={ onChange }
                    value={ editorState.content } />
              </Flex>
            </Flex>
          ) }
        </Flex>
      </Flex>

      <Switch>
        <Route component={ About } path="/about" />
        <Route component={ Solutions } path="/solutions" />
      </Switch>
    </RootContext.Provider>
  );
};
