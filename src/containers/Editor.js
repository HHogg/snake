import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { editorSetContent } from '../store/editor';
import Editor from '../components/Editor/Editor';

class EditorC extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    editorSetContent: PropTypes.func.isRequired,
  };

  render() {
    const { content, editorSetContent } = this.props;

    return (
      <Editor
          initialValue={ content }
          onChange={ editorSetContent } />
    );
  }
}

export default connect((state) => ({
  content: state.editor.content,
}), {
  editorSetContent,
})(EditorC);
