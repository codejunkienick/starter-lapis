// @flow weak
import { takeLatest } from 'redux-saga';
import { put, fork, call, select } from 'redux-saga/effects';
import {
  UPLOAD_FILE,
  CONNECTION_ERROR,
  UPLOAD_FILES,
  UPLOAD_MORE_FILES,
} from 'redux/actions/app';

import { app } from 'data';


export default function* root() {
}
