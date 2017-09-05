import { v1 } from 'uuid';
import { createAction, handleActions } from '../utils/reduxActions';

const initialState = {
  notifications: [],
};

const NOTIFIER_ADD_NOTFICATION = 'NOTIFIER_ADD_NOTFICATION';
const NOTIFIER_REMOVE_NOTIFICATION = 'NOTIFIER_REMOVE_NOTIFICATION';

export const notifierAddNotfication = createAction(NOTIFIER_ADD_NOTFICATION,
  ({ notification, type }) => ({ notification, type, id: v1() }));
export const notifierRemoveNotification = createAction(NOTIFIER_REMOVE_NOTIFICATION,
  ({ id }) => ({ id }));
export const notifierAddSuccessNotification = (notification) =>
  notifierAddNotfication({ notification, type: 'success' });
export const notifierAddErrorNotification = (notification) =>
  notifierAddNotfication({ notification, type: 'error' });

export default handleActions({
  [NOTIFIER_ADD_NOTFICATION]: ({ notifications }, { payload }) => ({
    notifications: [{
      notification: payload.notification,
      type: payload.type,
      id: payload.id,
    }].concat(notifications),
  }),
  [NOTIFIER_REMOVE_NOTIFICATION]: ({ notifications }, { payload }) => ({
    notifications: notifications.filter(({ id }) => id !== payload.id),
  }),
}, initialState);
