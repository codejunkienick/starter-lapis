// @flow
import { Map, Stack } from 'immutable';
import * as TYPES from '../actions/app';

const initialState = Map({
  ui: Map(),
  notifications: Stack(),
});

export default function app(state: Object = initialState, action: Object = {}) {
  const { response = {}, payload = {} } = action;
  switch (action.type) {
    case TYPES.LOAD.SUCCESS:
      return state.merge(response);
    case TYPES.CLEAR_NOTIFICATIONS:
      return state.set('notifications', Stack());
    case TYPES.ADD_NOTIFICATION:
      return state.update('notifications', notifications =>
        notifications.push(Map({ msg: payload.msg, date: Date.now() })));
    case TYPES.TOGGLE_NOTIFICATIONS:
      return state.updateIn(['ui', 'isNotificationsOpen'], val => !val);
    default:
      return state;
  }
}
