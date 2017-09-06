import { connect } from 'react-redux';
import {
  editorSelectSolution,
  editorSetTitle,
  editorSetUnedited,
  editorStartNew,
} from '../../store/editor';
import {
  notifierAddErrorNotification,
  notifierAddSuccessNotification,
} from '../../store/notifier';
import SolutionTitle from './SolutionTitle';

export default connect((state) => ({
  content: state.editor.content,
  edited: state.editor.edited,
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
