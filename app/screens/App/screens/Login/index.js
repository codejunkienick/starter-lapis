// @flow
import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'redux/actions/ui';
import { LoginModal } from 'core';
import './index.css';

type Props = {
  displayLogin: ReduxAction,
  loading: boolean,
  isAuthenticated: boolean,
}

const Login = ({ displayLogin, loading, isAuthenticated }: Props) => (
  <div styleName="container">
    <h2 styleName="header">Login Screen</h2>
    {loading &&
      <div>
        Loading...
      </div>}
    {isAuthenticated &&
      <div>
        You are now logged in!
      </div>}
    {!isAuthenticated &&
      !loading &&
      <div>
        If you wanna be authenticated just click a btn!
        <br />
        <button type="button" onClick={() => displayLogin(true)}>
          Login
        </button>
      </div>}
      <LoginModal />
  </div>
);

export default connect(
  state => ({
    loading: state.getIn(['user', 'loading']),
    isAuthenticated: state.getIn(['user', 'authenticated']),
  }),
  { displayLogin: actions.displayLogin }
)(Login);
