import { connect } from 'react-redux';
import { editorSetContent } from '../../store/editor';
import Editor from './Editor';

export default connect((state) => ({
  initialValue: state.editor.content,
}), {
  onChange: editorSetContent,
})(Editor);
