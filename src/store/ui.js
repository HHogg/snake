import actionCreator from '../utils/actionCreator';

const initialState = {
  skipIntro: false,
};

const UI_SKIP_INTRO = 'UI_SKIP_INTRO';

export const uiSkipIntro = actionCreator(UI_SKIP_INTRO);

export default (state = initialState, { type }) => {
  switch (type) {
  case UI_SKIP_INTRO:
    return {
      ...state,
      skipIntro: true,
    };
  default:
    return state;
  }
};
