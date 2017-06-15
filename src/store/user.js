import actionCreator from '../utils/actionCreator';

const initialState = {
  user: undefined,
};

const USER_LOGIN_SUCCESSFUL = 'USER_LOGIN_SUCCESSFUL';

export const userLoginSuccessful = actionCreator(USER_LOGIN_SUCCESSFUL);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case USER_LOGIN_SUCCESSFUL:
    return {
      ...state,
      accessToken: payload.accessToken,
      avatar: payload.avatar,
      username: payload.username,
    };
  default:
    return state;
  }
};
