// @flow
import React from 'react';
import TimeAgo from 'react-timeago';
import { Stack } from 'immutable';
import { NotificationIcon } from 'core';
import './index.css';

type Props = {
  notifications: Stack<?Notification>,
  toggleNotifications: ActionCreator,
  isNotificationsOpen: boolean,
};

const NotificationBar = (
  { notifications, isNotificationsOpen, toggleNotifications }: Props,
) => {
  const unread = notifications.filter(notification =>
    notification.get('unread'));
  return (
    <div styleName="bar">
      <div styleName="icon-wrap">
        <button type="button" onClick={() => toggleNotifications()}>
          <NotificationIcon />
        </button>
        {unread.size > 0 &&
          <span styleName="counter">
            {unread.size}
          </span>}
        {isNotificationsOpen &&
          <div styleName="notifications">
            <span styleName="arrow-top" />
            {' '}
            {notifications.takeLast(5).reverse().map(notif => (
              <span key={notif.get('id')} styleName="notification">
                {notif.get('title')}
                <br />
                <TimeAgo date={notif.get('datetime')} />
              </span>
            ))}
            <button
              styleName="close-notifications"
              type="button"
              onClick={() => toggleNotifications()}
            >
              Close
            </button>
          </div>}
      </div>
    </div>
  );
};

NotificationBar.defaultProps = {
  notifications: Stack(),
};

export default NotificationBar;
