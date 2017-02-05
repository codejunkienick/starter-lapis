// @flow
import React from 'react';
import { NotificationIcon } from 'core';
import type { Stack } from 'immutable';
import './index.css';

type Props = {
  notifications: Stack<Notification>,
  toggleNotifications: ActionCreator,
  isNotificationsOpen: boolean,
};

const NotificationBar = (
  { notifications, isNotificationsOpen, toggleNotifications }: Props,
) => (
  <div styleName="bar">
    <div styleName="icon-wrap">
      <button type="button" onClick={() => toggleNotifications()}>
        <NotificationIcon />
      </button>
      {isNotificationsOpen &&
        <div styleName="notifications">
          {' '}
          {notifications
            .takeLast(5)
            .map(notif => <span styleName="notification">{notif.get('msg')}</span>)}
        </div>}
    </div>
  </div>
);

export default NotificationBar;
