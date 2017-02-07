// @flow
import { fromJS } from 'immutable';
import * as TYPES from 'redux/actions/user';

const initialState = fromJS({
  loaded: false,
});

export default function app(state: Object = initialState, action: ReduxAction) {
  switch (action.type) {
    case TYPES.LOGIN.REQUEST:
      return state.set('loading', true);
    case TYPES.LOGIN.SUCCESS:
      return state
        .delete('loading')
        .set('loaded', true)
        .set('authenticated', true);
    case TYPES.LOGIN.FAILURE:
      return state
        .delete('loading')
        .set('loaded', true)
        .set('authenticated', false);

    default:
      return state;
  }
}
