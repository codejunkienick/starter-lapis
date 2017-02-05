// @flow
import React from 'react';
import TimeAgo from 'react-timeago';
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
        notifications.size > 0 &&
        <div styleName="notifications">
          {' '}
          {notifications.takeLast(5).map(notif => (
            <span styleName="notification">
              {notif.get('msg')}<br /><TimeAgo date={notif.get('date')} />
            </span>
          ))}
          <button styleName="close-notifications" type="button" onClick={() => toggleNotifications()}>
            Close
          </button>
        </div>}
    </div>
  </div>
);

export default NotificationBar;
