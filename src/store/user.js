import { createAction, handleActions } from '../utils/reduxActions';

const initialState = {
  id: undefined,
  avatar: undefined,
  displayName: undefined,
};

export const userLoginSuccessful = createAction('USER_LOGIN_SUCCESSFUL');
export const userLogoutSuccessful = createAction('USER_LOGOUT_SUCCESSFUL');

export default handleActions({
  [userLoginSuccessful]: (_, { payload }) => ({
    id: payload.id,
    avatar: payload.avatar,
    displayName: payload.displayName,
  }),
  [userLogoutSuccessful]: () => ({
    ...initialState,
  }),
}, initialState);
