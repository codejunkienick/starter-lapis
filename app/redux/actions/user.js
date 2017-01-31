// @flow
import { createRequestTypes, createType, action } from './creators';

const prefix = 'user';

export const LOGIN = createRequestTypes(prefix, 'LOGIN');


const login = () => action(LOGIN.REQUEST);

export const actions = { login };
