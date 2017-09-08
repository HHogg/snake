import React, { Component, PropTypes } from 'react';
import { database } from 'firebase';
import Flex from '../Flex/Flex';
import ButtonGroup from '../Button/ButtonGroup';
import Button from '../Button/Button';
import Text from '../Text/Text';
import './SolutionTitle.css';

export default class SolutionTitle extends Component {
  static propTypes = {
    content: PropTypes.string,
    edited: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    onErrorNotifcation: PropTypes.func.isRequired,
    onNew: PropTypes.func.isRequired,
    onSolutionSelect: PropTypes.func.isRequired,
    onSolutionUpdate: PropTypes.func.isRequired,
    onSuccessNotification: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    selectedSolutionKey: PropTypes.string,
    title: PropTypes.string,
    userId: PropTypes.string,
  };

  handleSave() {
    const {
      content,
      onErrorNotifcation,
      onSolutionSelect,
      onSolutionUpdate,
      onSuccessNotification,
      selectedSolutionKey,
      title,
      userId,
    } = this.props;

    if (selectedSolutionKey) {
      database()
        .ref(`solutions/${userId}/${selectedSolutionKey}`)
        .update({ title, content, modified: database.ServerValue.TIMESTAMP })
        .then(() => onSolutionUpdate())
        .then(() => onSuccessNotification(`Solution "${title}" has been updated`))
        .catch((error) => onErrorNotifcation(`Failed to update solution: ${error.message}`));
    } else {
      const newSolution = database().ref(`solutions/${userId}`).push();

      newSolution
        .set({ title, content, modified: database.ServerValue.TIMESTAMP })
        .then(() => onSolutionSelect({ title, content, key: newSolution.key }))
        .then(() => onSuccessNotification(`Solution "${title}" is now
            saved under 'My Saved Solutions'`))
        .catch((error) => onErrorNotifcation(`Failed to save solution: ${error.message}`));
    }
  }

  render() {
    const {
      edited,
      isLoggedIn,
      onTitleChange,
      onNew,
      title,
    } = this.props;

    return (
      <Flex
          alignChildrenVertical="middle"
          className="sh-solution-title__container"
          container
          style={ { opacity: isLoggedIn ? 1 : 0 } }>
        <Flex>
          <Text size="large">
            <input
                className="sh-solution-title"
                onChange={ (e) => onTitleChange({ title: e.target.value }) }
                placeholder="Untitled solution"
                value={ title || '' } />
          </Text>
        </Flex>

        <Flex shrink>
          <ButtonGroup>
            <Button
                color="blue"
                onClick={ () => onNew() }>New</Button>
              <Button
                  color="blue"
                  disabled={ !title || !edited }
                  onClick={ () => this.handleSave() }>Save</Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    );
  }
}
