// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { actions } from 'redux/actions/app';
import './index.css';

type Props = {
  sendNotification: ActionCreator,
  clearNotifications: ActionCreator,
  toggleNotifications: ActionCreator,
  handleSubmit: any,
};

const NotificationCenter = (
  { sendNotification, clearNotifications, toggleNotifications, handleSubmit }: Props,
) => (
  <div styleName="container">
    <h2 styleName="header">Notification Center</h2>
    <form
      styleName="form"
      onSubmit={handleSubmit(values => {
        sendNotification(values.get('msg'));
      })}
    >
      <Field type="text" component="input" name="msg" />
      <button styleName="send">
        Send Notification
      </button>
    </form>
    <button styleName="btn-wide" type="button" onClick={() => clearNotifications()}>
      Clear Notifications
    </button>
    <button styleName="btn-wide" type="button" onClick={() => toggleNotifications()}>
      Toggle Notifications
    </button>
  </div>
);

export default connect(null, { ...actions })(
  reduxForm({ form: 'notifications' })(NotificationCenter),
);
