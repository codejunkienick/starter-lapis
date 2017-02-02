import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? React.createElement(component, props)
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
  />
);

export default connect(state => ({
  isAuthenticated: state.getIn(['user', 'authenticated'])
}))(PrivateRoute);

