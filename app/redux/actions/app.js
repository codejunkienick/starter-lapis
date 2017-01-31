// @flow
import { createRequestTypes, createType, action } from './creators';
import { Map } from 'immutable';

const prefix = 'app';

export const SERVER_ERROR = createType(prefix, 'SERVER_ERROR');
export const SERVER_REDIRECT = createType(prefix, 'SERVER_REDIRECT');
export const CONNECTION_ERROR = createType(prefix, 'CONNECTION_ERROR');
export const CLEAR_CONNECTION_ERROR = createType(
  prefix,
  'CLEAR_CONNECTION_ERROR',
);

export const SERVER_NOTIFICATION = createType(prefix, 'SERVER_NOTIFICATION');
export const HIDE_NOTIFICATION = createType(prefix, 'HIDE_NOTIFICATION');
export const SHOW_NOTIFICATION = createType(prefix, 'SHOW_NOTIFICATION');

export const LOAD = createRequestTypes(prefix, 'LOAD');

const showNotification = (message: string) =>
  action(SHOW_NOTIFICATION, { message });
const hideNotification = (notificationId: string) =>
  action(HIDE_NOTIFICATION, { notificationId });
const clearConnectionError = () => action(CLEAR_CONNECTION_ERROR);

const load = () => action(LOAD.REQUEST);

export const actions = { load };
