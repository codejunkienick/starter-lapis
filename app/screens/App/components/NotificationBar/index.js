// @flow
import React from 'react';
import { NotificationIcon } from 'core';
import type { Stack } from 'immutable';
import './index.css';

type Props = {
  notifications: Stack<string>,
};

const NotificationBar = ({ notifications }: Props) => (
  <div styleName="bar">
    {notifications.map(msg => <span>{msg}</span>)}
    <div styleName="icon-wrap">
      <NotificationIcon />
    </div>
  </div>
);

export default NotificationBar;
