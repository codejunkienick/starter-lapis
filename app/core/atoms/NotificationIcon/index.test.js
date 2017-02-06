import React from 'react';
import renderer from 'react-test-renderer';
import NotificationIcon from './index.js';

test('NotificationIcon', () => {
  const component = renderer.create(<NotificationIcon />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
