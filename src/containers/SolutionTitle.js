import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'firebase';
import {
  editorSelectSolution,
  editorSetTitle,
  editorSetUnedited,
  editorStartNew,
} from '../store/editor';
import {
  notifierAddErrorNotification,
  notifierAddSuccessNotification,
} from '../store/notifier';
import TitleSaver from '../components/TitleSaver/TitleSaver';

class SolutionTitle extends Component {
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
      onTitleChange,
      onNew,
      isLoggedIn,
      title,
    } = this.props;

    return (
      <TitleSaver
          edited={ edited }
          onNew={ onNew }
          onSave={ isLoggedIn ? () => this.handleSave() : undefined }
          onTitleChange={ onTitleChange }
          value={ title } />
    );
  }
}

export default connect((state) => ({
  content: state.editor.content,
  edited: state.editor.edited,
  isLoggedIn: !!state.user.id,
  selectedSolutionKey: state.editor.selectedSolutionKey,
  title: state.editor.title,
  userId: state.user.id,
}), {
  onErrorNotifcation: notifierAddErrorNotification,
  onNew: editorStartNew,
  onSolutionSelect: editorSelectSolution,
  onSolutionUpdate: editorSetUnedited,
  onSuccessNotification: notifierAddSuccessNotification,
  onTitleChange: editorSetTitle,
})(SolutionTitle);
