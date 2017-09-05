import { createAction, handleActions } from '../utils/reduxActions';

const initialState = {
  id: undefined,
  avatar: undefined,
  displayName: undefined,
};

const USER_LOGIN_SUCCESSFUL = 'USER_LOGIN_SUCCESSFUL';

export const userLoginSuccessful = createAction(USER_LOGIN_SUCCESSFUL,
  ({ id, avatar, displayName }) => ({ id, avatar, displayName }));

export default handleActions({
  [USER_LOGIN_SUCCESSFUL]: (_, { payload }) => ({
    id: payload.id,
    avatar: payload.avatar,
    displayName: payload.displayName,
  }),
}, initialState);
