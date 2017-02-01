declare var __DEVELOPMENT__: bool;
declare var __CLIENT__: bool;
declare var __DEVTOOLS__: bool;
declare var __SERVER__: bool;

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

