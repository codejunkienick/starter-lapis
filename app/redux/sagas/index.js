import { spawn } from 'redux-saga/effects';
import app from './app';
import user from './user';

export default function* root() {
  yield spawn(app);
  yield spawn(user);
}
