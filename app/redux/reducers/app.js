// @flow
import { Map } from 'immutable';
import * as TYPES from '../actions/app';

const initialState = Map({ errors: Map(), notifications: Map() });

export default function app(state: Object = initialState, action: Object = {}) {
  const { response = {} } = action;
  switch (action.type) {
    case TYPES.LOAD.SUCCESS:
      return state.merge(response);

    default:
      return state;
  }
}
