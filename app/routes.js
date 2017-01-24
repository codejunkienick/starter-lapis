import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';

import {
  App,
  Home,
  NotFound,
} from './containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
