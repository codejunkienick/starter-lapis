// @flow
import { fromJS, Map, Stack, List } from 'immutable';
import * as TYPES from '../actions/app';
import guid from 'core/utils/guid';

const initialState = fromJS({ errors: Map(), notifications: Map() });

export default function app(state: Object = initialState, action: Object = {}) {
  const { response = {}, error } = action;
  const uuid = guid();
  switch (action.type) {
    case TYPES.LOAD.SUCCESS:
      return state.merge(response);

    default:
      return state;
  }
}
