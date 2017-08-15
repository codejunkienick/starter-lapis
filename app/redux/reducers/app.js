// @flow
import { Map, Stack, fromJS } from 'immutable';
import hash from 'object-hash';
import * as TYPES from '../actions/app';

// type AppAction =
//   | { type: 'app/ADD_NOTIFICATION', payload: { msg: string } }
//   | { type: 'app/LOAD_REQUEST', payload: {} }
//   | { type: 'app/LOAD_SUCCESS', payload: {} }
//   | { type: 'app/CLEAR_NOTIFICATIONS', payload: {} }
//   | { type: 'app/TOGGLE_NOTIFICATIONS', payload: {} }
//   | { type: 'app/SEND_NOTIFICATION', payload: { msg: string } }
//   | { type: 'app/READ_ALL_NOTIFICATIONS', payload: {} };

const initialState = Map({
  ui: Map(),
  notifications: Stack(
    fromJS([
      {
        id: 17,
        title: 'Test test test 17',
        unread: true,
        datetime: new Date()
      },
      {
        id: 16,
        title: 'Test test test 16',
        unread: true,
        datetime: new Date().setHours(new Date().getHours() - 2)
      },
      {
        id: 14,
        title: 'Test test test 14',
        unread: true,
        datetime: new Date().setDate(new Date().getDate() - 1)
      },
      {
        id: 13,
        title: 'Test test test 13',
        unread: false,
        datetime: new Date().setDate(new Date().getDate() - 3)
      },
      {
        id: 12,
        title: 'Test test test 12',
        unread: false,
        datetime: new Date().setDate(new Date().getDate() - 8)
      },
      {
        id: 11,
        title: 'Test test test 11',
        unread: false,
        datetime: new Date().setDate(new Date().getDate() - 31)
      },
      {
        id: 10,
        title: 'Test test test 10',
        unread: false,
        datetime: new Date().setDate(new Date().getDate() - 160)
      }
    ])
  ).reverse()
});

export default function app(state: Object = initialState, action: ReduxAction) {
  switch (action.type) {
    case TYPES.LOAD.SUCCESS:
      return state.merge(action.payload);
    case TYPES.CLEAR_NOTIFICATIONS:
      return state.set('notifications', Stack());
    case TYPES.ADD_NOTIFICATION:
      return state.update('notifications', notifications =>
        notifications.push(
          Map({
            title: action.payload.msg,
            datetime: Date.now(),
            unread: true,
            id: hash(action.payload.msg + notifications.size)
          })
        )
      );
    case TYPES.TOGGLE_NOTIFICATIONS:
      return state.updateIn(['ui', 'isNotificationsOpen'], val => !val);
    case TYPES.READ_ALL_NOTIFICATIONS:
      return state.update('notifications', notifications =>
        notifications.map(notification => notification.set('unread', false))
      );
    default:
      return state;
  }
}
