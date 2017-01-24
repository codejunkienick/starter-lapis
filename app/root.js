import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, RouterContext, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './redux/create';
import getRoutes from './routes';
import { useScroll } from 'react-router-scroll';

export default class Root extends React.Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store} key="provider">
        <Router
          render={(props) => {
            applyRouterMiddleware(useScroll());
            return <RouterContext {...props} filter={item => !item.deferred} />;
          }
          }
          history={history}
        >
          {getRoutes(store)}
        </Router>

      </Provider>
    );
  }
}
