import { connect } from 'react-redux';
import { notifierRemoveNotification } from '../../store/notifier';
import Notifications from './Notifications';

export default connect((state) => ({
  notifications: state.notifier.notifications,
}), {
  onRemoveNotification: notifierRemoveNotification,
})(Notifications);
