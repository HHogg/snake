import { connect } from 'react-redux';
import { notifierRemoveNotification } from '../../store/notifier';
import NotificationBar from './NotificationBar';

export default connect((state) => ({
  notifications: state.notifier.notifications,
}), {
  onRemoveNotification: notifierRemoveNotification,
})(NotificationBar);
