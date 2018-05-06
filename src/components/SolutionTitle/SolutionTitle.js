import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { database } from 'firebase';
import { Buttons, Button, Flex, Input } from 'preshape';

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
      <Flex direction="horizontal" gutter="x3">
        <Flex grow>
          <Input
              disabled={ !isLoggedIn }
              onChange={ (e) => onTitleChange({ title: e.target.value }) }
              placeholder="Untitled solution"
              value={ title || '' } />
        </Flex>

        <Flex direction="horizontal">
          <Buttons>
            <Button onClick={ () => onNew() }>New</Button>
            <Button
                disabled={ !isLoggedIn || !title || !edited }
                onClick={ () => this.handleSave() }>Save</Button>
          </Buttons>
        </Flex>
      </Flex>
    );
  }
}
