import { v1 } from 'uuid';
import actionCreator from '../utils/actionCreator';

const initialState = {
  notifications: [],
};

const NOTIFIER_ADD_NOTFICATION = 'NOTIFIER_ADD_NOTFICATION';
const NOTIFIER_REMOVE_NOTIFICATION = 'NOTIFIER_REMOVE_NOTIFICATION';

export const notifierAddNotfication = ({ notification }) =>
  actionCreator(NOTIFIER_ADD_NOTFICATION)({ notification, id: v1() });
export const notifierRemoveNotification = actionCreator(NOTIFIER_REMOVE_NOTIFICATION);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case NOTIFIER_ADD_NOTFICATION:
    return {
      ...state,
      notifications: [
        payload.notification,
        ...state.notifications,
      ],
    };
  case NOTIFIER_REMOVE_NOTIFICATION:
    return {
      ...state,
      notifications: state.notifications
        .filter(({ id }) => id !== payload.id),
    };
  default:
    return state;
  }
};
