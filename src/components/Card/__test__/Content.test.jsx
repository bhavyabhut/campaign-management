import React from 'react';
import ReactDom from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Content from '../Content';
import renderer from 'react-test-renderer';

const dummyData = [
  {
    creator_name: 'Bhavya',
    campaign_name: 'Email',
    status: 1,
    created_at: '',
    updated_at: '',
    tags: ['awesome', 'nice'],
  },
  {
    creator_name: 'John',
    campaign_name: 'Video call',
    status: 2,
    created_at: '',
    updated_at: '',
    tags: ['poor', 'bad'],
  },
];

afterEach(cleanup);

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(<Content data={{}}></Content>, div);
});

it('Renders Card Content Correctly', () => {
  const { container } = render(<Content data={dummyData[0]}></Content>);
  const test = document.createElement('div');
  test.classList.add('mrb');
  test.innerHTML = `<span class="customLabel">Creator Name: </span><span>Bhavya</span>`;
  expect(container.querySelector('div')).toEqual(test);
});

it('Renders Card Content Correctly for second ', () => {
  const { container } = render(<Content data={dummyData[1]}></Content>);
  const test = document.createElement('div');
  test.classList.add('mrb');
  test.innerHTML = `<span class="customLabel">Creator Name: </span><span>John</span>`;
  expect(container.querySelector('div')).toEqual(test);
});

it('Card Content Found match snapshot', () => {
  const tree = renderer.create(<Content data={dummyData[0]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
