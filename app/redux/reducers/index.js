import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import app from './app';
import user from './user';
import ui from './ui';

export default combineReducers({ form: formReducer, user, ui, app });
