// @flow-weak
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export default function createStore(data: Object = {}) {
  // Sync dispatched route actions to the history
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [ sagaMiddleware ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    // const reactotronEnhancer = createReactotronEnhancer(Reactotron)
    const { persistState } = require('redux-devtools');
    const DevTools = require('../core/DevTools');
    finalCreateStore = compose(
      // reactotronEnhancer,
      applyMiddleware(...middleware),
      window.devToolsExtension
        ? window.devToolsExtension()
        : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./reducers/index');
  const store = finalCreateStore(reducer, Immutable.fromJS(data));

  // Object.values(sagas).forEach(saga => sagaMiddleware.run(user));
  sagaMiddleware.run(rootSaga).done.catch(
    err => console.log('[SAGA-ERROR]', err),
  );

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers/index', () => {
      store.replaceReducer(require('./reducers/index'));
    });
  }

  return store;
}
