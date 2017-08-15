// @flow
import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'screens';

const ClientTemplate = ({ store }: { store: any }) =>
  <Provider store={store} key="provider">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>;

export default ClientTemplate;
