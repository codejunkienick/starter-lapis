import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

type Props = {
  component: React$Element,
  isAuthenticated: boolean
};

type RouteProps = {
  location: any
};

const PrivateRoute = ({ component, isAuthenticated, ...rest }: Props) =>
  <Route
    {...rest}
    render={(props: RouteProps) =>
      isAuthenticated
        ? React.createElement(component, props)
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
  />;

export default connect(state => ({
  isAuthenticated: state.getIn(['user', 'authenticated'])
}))(PrivateRoute);
