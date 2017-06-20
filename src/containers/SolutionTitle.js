import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'firebase';
import { editorSelectSolution, editorSetTitle, editorStartNew } from '../store/editor';
import TitleSaver from '../components/TitleSaver/TitleSaver';

class SolutionTitle extends Component {
  static propTypes = {
    content: PropTypes.string,
    editorSelectSolution: PropTypes.func.isRequired,
    editorSetTitle: PropTypes.func.isRequired,
    editorStartNew: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    selectedSolutionId: PropTypes.string,
    title: PropTypes.string,
    userId: PropTypes.string,
  };

  handleSave() {
    const {
      content,
      editorSelectSolution,
      selectedSolutionId,
      userId,
      title,
    } = this.props;

    if (selectedSolutionId) {
      database()
        .ref(`solutions/${userId}/${selectedSolutionId}`)
        .set({
          id: selectedSolutionId,
          title,
          content,
          lastModified: new Date().toISOString(),
        });
    } else {
      const newSolutionRef = database()
        .ref(`solutions/${userId}`)
        .push();

      const newSolution = {
        id: newSolutionRef.key,
        title,
        content,
        lastModified: new Date().toISOString(),
      };

      newSolutionRef.set(newSolution);
      editorSelectSolution(newSolution);
    }
  }

  render() {
    const {
      editorSetTitle,
      editorStartNew,
      isLoggedIn,
      title,
    } = this.props;

    return (
      <TitleSaver
          onNew={ editorStartNew }
          onSave={ isLoggedIn ? () => this.handleSave() : undefined }
          onTitleChange={ editorSetTitle }
          value={ title } />
    );
  }
}

export default connect((state) => ({
  content: state.editor.content,
  isLoggedIn: !!state.user.id,
  selectedSolutionId: state.editor.selectedSolutionId,
  title: state.editor.title,
  userId: state.user.id,
}), {
  editorSelectSolution,
  editorSetTitle,
  editorStartNew,
})(SolutionTitle);
