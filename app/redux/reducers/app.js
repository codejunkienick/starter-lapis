// @flow
import { fromJS, Map, Stack, List } from 'immutable';
import * as TYPES from '../actions/app';
import guid from 'core/utils/guid';

const initialState = fromJS({ errors: Map(), notifications: Map() });

export default function app(state: Object = initialState, action: Object = {}) {
  const { response = {}, error } = action;
  const uuid = guid();
  switch (action.type) {
    case TYPES.SERVER_ERROR:
      alert(action.msg);
      return state.setIn(
        ['errors', uuid],
        Map({ message: action.msg, id: uuid }),
      );

    case TYPES.CLEAR_CONNECTION_ERROR:
      return state.delete('displayConnectionError');

    case TYPES.CONNECTION_ERROR:
      return state
        .set('displayConnectionError', true)
        .set('lastConnectionCheck', Date.now());

    case TYPES.SERVER_NOTIFICATION:
      alert(action.msg);
      return state.setIn(
        ['notifications', uuid],
        Map({ message: action.msg, id: uuid }),
      );

    default:
      return state;
  }
}
