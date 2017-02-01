// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createType(reducer: string, base: string): string {
  return `${reducer}/${base}`;
}

export function createRequestTypes(reducer: string, base: string): AsyncAction {
  return [REQUEST, SUCCESS, FAILURE].reduce(
    (acc, type) => {
      acc[type] = `${createType(reducer, base)}_${type}`;
      return acc;
    },
    {},
  );
}

export function action(type: string, payload: Object = {}): Object {
  return { type, ...payload };
}
