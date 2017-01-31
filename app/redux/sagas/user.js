// @flow weak
import { takeLatest, fork } from 'redux-saga/effects';
import { LOGIN } from '../actions/user';

import { user } from 'data';
import { callApi } from './utils';

export function* loginAsync() {
  yield callApi({ apiFn: user.login, actionType: LOGIN });
}

export default function* root() {
  yield fork(takeLatest, LOGIN.REQUEST, loginAsync);
}
