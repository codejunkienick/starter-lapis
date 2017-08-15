/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';
import ClientTemplate from './ClientTemplate';
import createStore from './redux/createStore';

const dest = document.getElementById('content');
const store = createStore(window.reduxState);

ReactDOM.render(
  <AppContainer>
    <ClientTemplate store={store} />
  </AppContainer>,
  dest,
);

if (module && module.hot) {
  module.hot.accept('./ClientTemplate', () => {
    const NextApp = require('./ClientTemplate.js');
    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
      dest,
    );
  });
}

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  // if (
  //   !dest ||
  //     !dest.firstChild ||
  //     !dest.firstChild.attributes ||
  //     !dest.firstChild.attributes['data-react-checksum']
  // ) {
  // }
}
