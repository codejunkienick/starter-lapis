import { push } from 'react-router-redux';
import { put, fork, call, select, cancelled } from 'redux-saga/effects';
import {
  CONNECTION_ERROR,
  SERVER_ERROR,
  SERVER_NOTIFICATION,
  CLEAR_CONNECTION_ERROR,
} from 'redux/actions/app';

import { haveConnectionError } from 'redux/reducers/app';

import { fromJS } from 'immutable';

export function* callApi({ apiFn, actionData, actionType }) {
  try {
    const { data, msg, error, url } = yield call(apiFn, actionData);
    if (data) {
      if (actionType.SUCCESS) {
        yield put({ type: actionType.SUCCESS, response: fromJS(data) });
      }
      if (msg) yield put({ type: SERVER_NOTIFICATION, msg });
    } else {
      if (actionType.FAILURE) {
        yield put({ type: actionType.FAILURE, error });
      }
      if (msg) yield put({ type: SERVER_ERROR, msg });
    }
    // if (yield select(haveConnectionError)) {
    //   yield put({ type: CLEAR_CONNECTION_ERROR });
    // }
  } catch (error) {
    if (error) {
      console.log(error);
      yield put({ type: CONNECTION_ERROR, error });
    }
  }
}

export function* handleApi(apiFn, actionData, onSuccess, onError) {
  try {
    const { data, msg, error, url } = yield call(apiFn, actionData);
    try {
      if (data) {
        yield onSuccess(fromJS(data));
        if (msg) yield put({ type: SERVER_NOTIFICATION, msg });
      } else {
        yield onError(error);
        if (msg) yield put({ type: SERVER_ERROR, msg });
      }
      if (url) {
        yield put(push(url));
      }
      if (yield select(haveConnectionError)) {
        yield put({ type: CLEAR_CONNECTION_ERROR });
      }
    } catch (err) {
      console.error('[SAGA]', error);
    }
    yield put({ type: CLEAR_CONNECTION_ERROR });
  } catch (error) {
    yield put({ type: CONNECTION_ERROR, error });
  }
}

export function* callDadataApi(apiFn, actionData, actionType) {
  try {
    const { suggestions } = yield call(apiFn, actionData);
    if (suggestions) {
      yield put({ type: actionType.SUCCESS, response: suggestions });
    } else {
      yield put({ type: actionType.FAILURE });
    }
  } catch (error) {
    console.log('[CONNECTION_ERROR]', error);
    yield put({ type: CONNECTION_ERROR, error });
  }
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
