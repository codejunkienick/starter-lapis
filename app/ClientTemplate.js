import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'screens';

export default class ClientTemplate extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store} key="provider">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}
