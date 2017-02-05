// @flow weak
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { takeLatest, fork, call, take, put } from 'redux-saga/effects';
import { LOAD, SEND_NOTIFICATION, actions } from 'redux/actions/app';

import { app } from 'data';
import { callApi } from './utils';

function connect() {
  const socket = io('', { path: '/ws' });
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('notifications.sendOne', ({ msg }) => {
      emit(actions.addNotification(msg));
    });
    socket.on('disconnect', event => {
      // TODO: handle
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(SEND_NOTIFICATION);
    socket.emit('notifications.sendOne', payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    yield take(LOAD.REQUEST);
    const socket = yield call(connect);
    const task = yield fork(handleIO, socket);
  }
}

function* loadAsync() {
  yield callApi({ apiFn: app.load, actionType: LOAD });
}

export default function* root() {
  yield fork(flow);
  yield fork(takeLatest, LOAD.REQUEST, loadAsync);
}
