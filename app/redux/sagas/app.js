// @flow weak
import { takeLatest, put, fork, call, select } from 'redux-saga/effects';
import {
  LOAD
} from 'redux/actions/app';

import { app } from 'data';
import { callApi } from './utils';

export function* loadAsync() {
  yield callApi({
    apiFn: app.load,
    actionType: LOAD
  })
}

export default function* root() {
  yield fork(takeLatest, LOAD.REQUEST, loadAsync);
}
