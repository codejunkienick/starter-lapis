// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { actions } from 'redux/actions/app';
import './index.css';

type Props = {
  sendNotification: ActionCreator,
  clearNotifications: ActionCreator,
  handleSubmit: any,
};

const NotificationCenter = (
  { sendNotification, clearNotifications, handleSubmit }: Props,
) => (
  <div styleName="container">
    <h2 styleName="header">Notification Center</h2>
    <form
      onSubmit={handleSubmit(values => {
        sendNotification(values.get('msg'));
      })}
    >
      <Field type="text" component="input" name="msg" />
      <button>
        Send Notification
      </button>
    </form>
    <button type="button" onClick={() => clearNotifications()}>
      Clear Notifications
    </button>
  </div>
);

export default connect(null, { ...actions })(
  reduxForm({ form: 'notifications' })(NotificationCenter),
);
