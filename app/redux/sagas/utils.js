import { put, call } from 'redux-saga/effects';
import { CONNECTION_ERROR } from 'redux/actions/app';

import { fromJS } from 'immutable';

export function* callApi({ apiFn, actionData, actionType }) {
  try {
    const { data, error } = yield call(apiFn, actionData);
    if (data && actionType.SUCCESS) {
      yield put({ type: actionType.SUCCESS, payload: fromJS(data) });
    } else if (actionType.FAILURE) {
      yield put({ type: actionType.FAILURE, error });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      yield put({ type: CONNECTION_ERROR, error });
    }
  }
}
