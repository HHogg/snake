import { createAction, handleActions } from '../utils/reduxActions';

const initialState = {
  skipIntro: false,
};

const UI_SKIP_INTRO = 'UI_SKIP_INTRO';

export const uiSkipIntro = createAction(UI_SKIP_INTRO);

export default handleActions({
  [UI_SKIP_INTRO]: () => ({
    skipIntro: true,
  }),
}, initialState);
