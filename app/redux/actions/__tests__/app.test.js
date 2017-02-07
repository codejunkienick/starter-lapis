import {
  actions,
  CLEAR_NOTIFICATIONS,
  ADD_NOTIFICATION,
  TOGGLE_NOTIFICATIONS,
  READ_ALL_NOTIFICATIONS,
  SEND_NOTIFICATION,
} from '../app';

describe('Notifications test', () => {
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
