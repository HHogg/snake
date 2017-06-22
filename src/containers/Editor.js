import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { editorSetContent } from '../store/editor';
import Editor from '../components/Editor/Editor';

class EditorC extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { content, onChange } = this.props;

    return (
      <Editor
          initialValue={ content }
          onChange={ onChange } />
    );
  }
}

export default connect((state) => ({
  content: state.editor.content,
}), {
  onChange: editorSetContent,
})(EditorC);
