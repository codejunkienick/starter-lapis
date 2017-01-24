// @flow weak
import { takeLatest } from 'redux-saga';
import { put, fork, call, select } from 'redux-saga/effects';
import {
  UPLOAD_FILE,
  CONNECTION_ERROR,
  UPLOAD_FILES,
  UPLOAD_MORE_FILES,
} from 'redux/actions/app';
import { api } from 'services';

function* uploadFile(action, key, apiFn, actionType) {
  try {
    const { status, data } = yield call(apiFn, action.uploadType, action[key]);

    if (status === 200) {
      yield put({
        type: actionType.SUCCESS,
        [key]: data,
        filePath: action.filePath,
      });
    } else {
      yield put({ type: actionType.FAILURE });
    }
  } catch (error) {
    yield put({ type: CONNECTION_ERROR, error });
  }
}

export function* uploadFileAsync(action) {
  yield uploadFile(action, 'file', api.app.uploadFile, UPLOAD_FILE);
}

export function* uploadFilesAsync(action) {
  yield uploadFile(action, 'files', api.app.uploadFiles, UPLOAD_FILES);
}

export function* uploadMoreFilesAsync(action) {
  yield uploadFile(action, 'files', api.app.uploadFiles, UPLOAD_MORE_FILES);
}

export default function* root() {
  yield fork(takeLatest, UPLOAD_FILE.REQUEST, uploadFileAsync);
  yield fork(takeLatest, UPLOAD_FILES.REQUEST, uploadFilesAsync);
  yield fork(takeLatest, UPLOAD_MORE_FILES.REQUEST, uploadFilesAsync);
}
