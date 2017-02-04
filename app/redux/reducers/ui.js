// @flow
import { fromJS } from 'immutable';
import * as TYPES from '../actions/ui';

const initialState = fromJS({
  displayLogin: false,
});

export default function app(state: Object = initialState, action: Object = {}) {
  switch (action.type) {
    case TYPES.DISPLAY_LOGIN:
      return state.set('displayLogin', action.display);

    default:
      return state;
  }
}
