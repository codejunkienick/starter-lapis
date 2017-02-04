// @flow
import { createType, action } from './creators';

const prefix = 'ui';

export const DISPLAY_LOGIN = createType(prefix, 'DISPLAY_LOGIN');

const displayLogin = (display: boolean = true) => action(DISPLAY_LOGIN, { display });

export const actions = { displayLogin };
