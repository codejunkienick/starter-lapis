// @flow
import { fromJS, Map, Stack, List } from 'immutable';
import * as TYPES from '../actions/app';

const initialState = fromJS({ errors: Map(), notifications: Map() });

export default function app(state: Object = initialState, action: Object = {}) {
  const { response = {}, error } = action;
  switch (action.type) {
    case TYPES.LOAD.SUCCESS:
      return state.merge(response);

    default:
      return state;
  }
}
