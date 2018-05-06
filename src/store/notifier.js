import { v1 } from 'uuid';
import { createAction, handleActions } from '../utils/reduxActions';

const initialState = {
  notifications: [],
};

export const notifierAddNotfication = createAction('NOTIFIER_ADD_NOTFICATION', (payload) => ({ ...payload, id: v1() }));
export const notifierRemoveNotification = createAction('NOTIFIER_REMOVE_NOTIFICATION');
export const notifierAddSuccessNotification = (notification) => notifierAddNotfication({ notification, type: 'success' });
export const notifierAddErrorNotification = (notification) => notifierAddNotfication({ notification, type: 'error' });

export default handleActions({
  [notifierAddNotfication]: ({ notifications }, { payload }) => ({
    notifications: [{
      notification: payload.notification,
      type: payload.type,
      id: payload.id,
    }].concat(notifications),
  }),
  [notifierRemoveNotification]: ({ notifications }, { payload }) => ({
    notifications: notifications.filter(({ id }) => id !== payload.id),
  }),
}, initialState);
