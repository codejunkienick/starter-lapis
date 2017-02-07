import { Stack, Map, fromJS } from 'immutable';
import {
  actions,
  CLEAR_NOTIFICATIONS,
  ADD_NOTIFICATION,
  TOGGLE_NOTIFICATIONS,
  READ_ALL_NOTIFICATIONS,
  SEND_NOTIFICATION,
} from '../actions/app';
import reducer from '../reducers/app';

describe('Notifications actions', () => {
  it('should dispatch an action to clear notifications', () => {
    const expectedAction = {
      type: CLEAR_NOTIFICATIONS,
      payload: {},
    };
    expect(actions.clearNotifications()).toEqual(expectedAction);
  });

  it('should dispatch an action to add notification', () => {
    const expectedAction = {
      type: ADD_NOTIFICATION,
      payload: {
        msg: 'test',
      },
    };
    expect(actions.addNotification('test')).toEqual(expectedAction);
  });

  it('should dispatch an action to toggle notifications', () => {
    const expectedAction = {
      type: TOGGLE_NOTIFICATIONS,
      payload: {},
    };
    expect(actions.toggleNotifications()).toEqual(expectedAction);
  });

  it('should dispatch an action to send notification', () => {
    const expectedAction = {
      type: SEND_NOTIFICATION,
      payload: {
        msg: 'test',
      },
    };
    expect(actions.sendNotification('test')).toEqual(expectedAction);
  });

  it('should dispatch an action to read all notifications', () => {
    const expectedAction = {
      type: READ_ALL_NOTIFICATIONS,
      payload: {},
    };
    expect(actions.readAllNotifications()).toEqual(expectedAction);
  });
});

describe('Notifications reducer', () => {
  const sampleNofitications = fromJS([
    {
      id: 12,
      title: 'Test test test 12',
      unread: false,
      datetime: new Date().setDate(new Date().getDate() - 8),
    },
    {
      id: 11,
      title: 'Test test test 11',
      unread: false,
      datetime: new Date().setDate(new Date().getDate() - 31),
    },
    {
      id: 10,
      title: 'Test test test 10',
      unread: false,
      datetime: new Date().setDate(new Date().getDate() - 160),
    },
  ]);

  it('should handle CLEAR_NOTIFICATIONS', () => {
    expect(
      reducer(
        fromJS({
          notifications: Stack(sampleNofitications),
        }),
        {
          type: CLEAR_NOTIFICATIONS,
        },
      ),
    ).toEqual(fromJS({ notifications: Stack() }));
  });

  it('should handle TOGGLE_NOTIFICATIONS', () => {
    expect(
      reducer(
        fromJS({
          notifications: Stack(sampleNofitications),
          ui: Map(),
        }),
        actions.toggleNotifications(),
      ),
    ).toEqual(
      fromJS({
        notifications: Stack(sampleNofitications),
        ui: Map({ isNotificationsOpen: true }),
      }),
    );
  });

  it('should handle TOGGLE_NOTIFICATIONS off', () => {
    expect(
      reducer(
        fromJS({
          notifications: Stack(sampleNofitications),
          ui: Map({ isNotificationsOpen: true }),
        }),
        actions.toggleNotifications(),
      ),
    ).toEqual(
      fromJS({
        notifications: Stack(sampleNofitications),
        ui: Map({ isNotificationsOpen: false }),
      }),
    );
  });
  // TODO: handle
  // it('should handle ADD_NOTIFICATION', () => {
  //   expect(
  //     reducer(
  //       fromJS({
  //         notifications: Stack(),
  //       }),
  //       actions.addNotification('test')
  //     ),
  //   ).toEqual(fromJS({ notifications: Stack() }));
  // })
});
