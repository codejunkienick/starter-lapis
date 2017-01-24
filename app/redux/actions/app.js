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

export const UPLOAD_FILE = createRequestTypes(prefix, 'UPLOAD_FILE');
export const UPLOAD_FILES = createRequestTypes(prefix, 'UPLOAD_FILES');
export const UPLOAD_MORE_FILES = createRequestTypes(
  prefix,
  'UPLOAD_MORE_FILES',
);
export const RESET_FILE = createType(prefix, 'RESET_FILE');
export const SET_FILE = createType(prefix, 'SET_FILE');
export const SET_MODAL_ELEVATION = createType(prefix, 'SET_MODAL_ELEVATION');
export const INCREASE_MODAL_ELEVATION = createType(
  prefix,
  'INCREASE_MODAL_ELEVATION',
);
export const DECREASE_MODAL_ELEVATION = createType(
  prefix,
  'DECREASE_MODAL_ELEVATION',
);
export const SET_ROUTE_ON_CLOSE_MODAL = createType(
  prefix,
  'SET_ROUTE_ON_CLOSE_MODAL',
);

const uploadFile = (uploadType: string, file: File, filePath: Array<string>) =>
  action(UPLOAD_FILE.REQUEST, { uploadType, file, filePath });
const uploadFiles = (
  uploadType: string,
  files: Array<File>,
  filePath: Array<string>,
) =>
  action(UPLOAD_FILES.REQUEST, { uploadType, files, filePath });
const uploadMore = (
  uploadType: string,
  files: Array<File>,
  filePath: Array<string>,
) =>
  action(UPLOAD_MORE_FILES.REQUEST, { uploadType, files, filePath });
const resetFile = (filePath: Array<string>) => action(RESET_FILE, { filePath });
const setFile = (filePath: Array<string>, file: Object) =>
  action(SET_FILE, { filePath, file });
const increaseModalElevation = (route: string, back: string) =>
  action(INCREASE_MODAL_ELEVATION, { modal: Map({ route, back }) });
const decreaseModalElevation = (route: string) =>
  action(DECREASE_MODAL_ELEVATION, { route });
const setRouteOnCloseModal = (route: string) =>
  action(SET_ROUTE_ON_CLOSE_MODAL, { route });

const showNotification = (message: string) =>
  action(SHOW_NOTIFICATION, { message });
const hideNotification = (notificationId: string) =>
  action(HIDE_NOTIFICATION, { notificationId });
const clearConnectionError = () => action(CLEAR_CONNECTION_ERROR);

export const actions = {
  setRouteOnCloseModal,
  clearConnectionError,
  increaseModalElevation,
  decreaseModalElevation,
  uploadFile,
  uploadFiles,
  uploadMore,
  resetFile,
  setFile,
};
