import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { preload, ServerStateProvider } from 'react-router-server';
import createStore from './redux/create';
import App from './app';

export default class Root extends React.Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store} key="provider">
        <BrowserRouter
          history={history}
        >
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}
