import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form/immutable';
import { Modal } from 'core';
import { actions } from 'redux/actions/ui';
import { actions as userActions } from 'redux/actions/user';

type Props = {
  handleSubmit: any,
  login: ActionCreator,
  isLoginOpen: boolean,
  displayLoginModal: ActionCreator,
};

const formName = 'loginForm';

const LoginModal = (
  { handleSubmit, login, isLoginOpen, displayLoginModal }: Props,
) => (
  <Modal
    contentLabel="Login Screen"
    onRequestClose={() => displayLoginModal(false)}
    isOpen={isLoginOpen}
  >
    <Form
      onSubmit={handleSubmit(values => {
        login();
        displayLoginModal(false);
      })}
    >
      <Field component="input" name="login" />
      <br />
      <button>
        Login
      </button>
    </Form>
  </Modal>
);

export default connect(
  state => ({
    isLoginOpen: state.getIn(['ui', 'displayLogin']),
    isLoading: state.getIn(['user', 'loading']),
  }),
  { displayLoginModal: actions.displayLogin, login: userActions.login },
  null,
  { pure: true },
)(reduxForm({ form: formName, pure: true })(LoginModal));
