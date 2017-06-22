import actionCreator from '../utils/actionCreator';

const initialState = {
  id: undefined,
  avatar: undefined,
  displayName: undefined,
};

const USER_LOGIN_SUCCESSFUL = 'USER_LOGIN_SUCCESSFUL';

export const userLoginSuccessful = actionCreator(USER_LOGIN_SUCCESSFUL);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case USER_LOGIN_SUCCESSFUL:
    return {
      ...state,
      id: payload.id,
      avatar: payload.avatar,
      displayName: payload.displayName,
    };
  default:
    return state;
  }
};
