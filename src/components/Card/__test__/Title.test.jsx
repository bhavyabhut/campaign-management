import React from 'react';
import ReactDom from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Title from '../Title';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Title></Title>, div);
});

it('Card Title Found match snapshot', () => {
  const tree = renderer.create(<Title campaign_name="Push Notification" />).toJSON();
  expect(tree).toMatchSnapshot();
});
