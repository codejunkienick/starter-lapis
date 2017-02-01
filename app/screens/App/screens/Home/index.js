// @flow
import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'redux/actions/user';
import './index.css';

type Props = {
  login: ReduxAction,
  isAuthenticated: boolean,
}

const Home = ({ login, isAuthenticated }: Props) => {
  return (
    <div styleName="container">
      <h2 styleName="header">Home</h2>
      { isAuthenticated && (
        <div>
          You are now logged in!
        </div>
      )}
      {!isAuthenticated && (
        <div>
          If you wanna be authenticated just click a btn!
          <br />
          <button type="button" onClick={() => login()}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default connect(
  state => ({
    loading: state.getIn(['user', 'loading']),
    isAuthenticated: state.getIn(['user', 'authenticated'])
  }),
  { login: actions.login }
)(Home);
