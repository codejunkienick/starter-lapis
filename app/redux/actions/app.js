// @flow
import { createRequestTypes, createType, action } from './creators';

const prefix = 'app';

export const SERVER_ERROR = createType(prefix, 'SERVER_ERROR');
export const CONNECTION_ERROR = createType(prefix, 'CONNECTION_ERROR');
export const CLEAR_CONNECTION_ERROR = createType(
  prefix,
  'CLEAR_CONNECTION_ERROR',
);

export const ADD_NOTIFICATION = createType(prefix, 'ADD_NOTIFICATION');
export const CLEAR_NOTIFICATIONS = createType(prefix, 'CLEAR_NOTIFICATIONS');
export const TOGGLE_NOTIFICATIONS = createType(prefix, 'TOGGLE_NOTIFICATIONS');
export const SEND_NOTIFICATION = createType(prefix, 'SEND_NOTIFICATION');

export const LOAD = createRequestTypes(prefix, 'LOAD');

const load = () => action(LOAD.REQUEST);
const addNotification = (msg: string) => action(ADD_NOTIFICATION, { msg });
const clearNotifications = () => action(CLEAR_NOTIFICATIONS);
const toggleNotifications = () => action(TOGGLE_NOTIFICATIONS);
const sendNotification = (msg: string) => action(SEND_NOTIFICATION, { msg });

export const actions = {
  load,
  addNotification,
  clearNotifications,
  toggleNotifications,
  sendNotification,
};
