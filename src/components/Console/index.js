import { connect } from 'react-redux';
import { consoleClearMessages } from '../../store/console';
import Console from './Console';

export default connect((state) => ({
  messages: state.console.messages,
}), {
  onConsoleClear: consoleClearMessages,
})(Console);
