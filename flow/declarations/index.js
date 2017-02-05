// @flow
import type { Map } from 'immutable';

declare var __DEVELOPMENT__: boolean;
declare var __CLIENT__: boolean;
declare var __DEVTOOLS__: boolean;
declare var __SERVER__: boolean;

declare type AsyncAction = {
  REQUEST: string,
  FAILURE: string,
  SUCCESS: string
}

declare type MainNavigationLink = {
  to: string,
  text: 'string'
}

declare module CSSModule {
  declare var exports: { [key: string]: string };
}

declare type ReduxAction = { type: string; payload: Object };

declare type ActionCreator = (...args: any) => ReduxAction;

declare type Notification = Map<string, { msg: string, date: number }>

