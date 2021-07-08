import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  useMatchMedia,
  useLocalStorage,
  useTheme,
  Button,
  Editor,
  Box,
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
import { blank, tailEscape } from '../solutions';
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
  const [editorState, setEditorState] = useLocalStorage<ISolution>('com.hogg.snake.editor', tailEscape);
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
      <Box flex="vertical" grow>
        <Box
            alignChildrenVertical="middle"
            flex="horizontal"
            gap="x6"
            paddingHorizontal="x6"
            paddingVertical="x2">
          <Box
              alignChildrenVertical="middle"
              flex="horizontal"
              gap="x4"
              grow>
            <Box>
              <Logo height="32px" width="32px" />
            </Box>
          </Box>

          <Box>
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
          </Box>
        </Box>

        <Box>
          <Box borderColor="background-shade-3" borderSize="x1" />
        </Box>

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

        <Box flex="horizontal" grow>
          { (match('1000px') || activeTab === 'game') && (
            <Box
                basis="0"
                flex="vertical"
                grow
                paddingHorizontal="x6"
                paddingVertical="x4">
              <Snake
                  solution={ editorState.content }
                  worker={ worker }
                  xLength={ CANVAS_SIZE }
                  yLength={ CANVAS_SIZE }>
                <Box
                    flex="horizontal"
                    gap="x4"
                    grow>
                  <Box
                      basis="0"
                      flex="vertical"
                      gap="x2"
                      grow>
                    <Box
                        basis="0"
                        flex="vertical"
                        grow
                        minHeight="20rem">
                      <SnakeViewer theme={ theme } />
                    </Box>

                    <Box flex="horizontal">
                      <Console />
                    </Box>

                    <Box>
                      <Scoreboard />
                    </Box>

                    <Box>
                      <Controller />
                    </Box>
                  </Box>
                </Box>
              </Snake>
            </Box>
          ) }

          { match('1000px') && (
            <Box borderColor="background-shade-3" borderSize="x1" />
          ) }

          { (match('1000px') || activeTab === 'editor') && (
            <Box
                basis="0"
                flex="vertical"
                gap="x6"
                grow
                paddingHorizontal="x6"
                paddingVertical="x4">
              <Box
                  alignChildrenVertical="middle"
                  flex="horizontal"
                  gap="x2">
                <Box basis="0" grow>
                  <Text ellipsis strong>{ editorState.name }</Text>
                </Box>

                <Box>
                  <Button
                      color="negative"
                      gap="x2"
                      onClick={ () => onReset() }>
                    <Box><Icon name="Delete" size="1rem" /></Box>
                    <Box>Clear</Box>
                  </Button>
                </Box>
              </Box>

              <Box flex="vertical" grow>
                <Editor
                    language="javascript"
                    onChange={ onChange }
                    value={ editorState.content } />
              </Box>
            </Box>
          ) }
        </Box>
      </Box>

      <Switch>
        <Route component={ About } path="/about" />
        <Route component={ Solutions } path="/solutions" />
      </Switch>
    </RootContext.Provider>
  );
};
