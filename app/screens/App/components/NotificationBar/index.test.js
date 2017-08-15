import React from 'react';
import renderer from 'react-test-renderer';
import { Stack, fromJS } from 'immutable';
import NotificationBar from './index.js';

const mockNotifications = Stack(
  fromJS([
    {
      id: 17,
      title: 'Test test test 17',
      unread: true,
      datetime: new Date()
    },
    {
      id: 16,
      title: 'Test test test 16',
      unread: true,
      datetime: new Date().setHours(new Date().getHours() - 2)
    },
    {
      id: 14,
      title: 'Test test test 14',
      unread: true,
      datetime: new Date().setDate(new Date().getDate() - 1)
    },
    {
      id: 13,
      title: 'Test test test 13',
      unread: false,
      datetime: new Date().setDate(new Date().getDate() - 3)
    },
    {
      id: 12,
      title: 'Test test test 12',
      unread: false,
      datetime: new Date().setDate(new Date().getDate() - 8)
    },
    {
      id: 11,
      title: 'Test test test 11',
      unread: false,
      datetime: new Date().setDate(new Date().getDate() - 31)
    },
    {
      id: 10,
      title: 'Test test test 10',
      unread: false,
      datetime: new Date().setDate(new Date().getDate() - 160)
    }
  ])
).reverse();

test('NotificationBar', () => {
  const component = renderer.create(<NotificationBar />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const componentWithNotifications = renderer.create(
    <NotificationBar notifications={mockNotifications} />
  );

  tree = componentWithNotifications.toJSON();
  expect(tree).toMatchSnapshot();
});
