import React from 'react';
import ReactDom from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoData from '../index';
import renderer from 'react-test-renderer';

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<NoData />, div);
});

it('No Data Text Testing', () => {
  const { container } = render(<NoData />);
  expect(container.querySelector('div span')).toHaveTextContent('No Campaign Data Found');
});

it('No Data Found match snapshot', () => {
  const tree = renderer.create(<NoData />).toJSON();
  expect(tree).toMatchSnapshot();
});
