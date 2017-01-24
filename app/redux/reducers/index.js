import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import router from './router';
import app from './app';

export default combineReducers({ form: formReducer, router, app });
