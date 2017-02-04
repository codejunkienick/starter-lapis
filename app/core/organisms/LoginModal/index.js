import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Form } from 'redux-form';
import { Modal } from 'core';
import { actions } from 'redux/actions/ui';

const formName = 'loginForm';

const submit = values => console.log(values);

const LoginModal = ({ handleSubmit, isLoginOpen, displayLoginModal }) => (
  <Modal
    contentLabel="Login Screen"
    onRequestClose={() => displayLoginModal(false)}
    isOpen={isLoginOpen}
  >
    <Form onSubmit={handleSubmit}>
      <Field component="input" name="login" />
    </Form>
  </Modal>
);

export default connect(
  state => ({
    isLoginOpen: state.getIn(['ui', 'displayLogin']),
    isLoading: state.getIn(['user', 'loading']),
  }),
  { displayLoginModal: actions.displayLogin },
  null,
  { pure: true },
)(reduxForm({ form: formName, onSubmit: submit, pure: true })(LoginModal));
