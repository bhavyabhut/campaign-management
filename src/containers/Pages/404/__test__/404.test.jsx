import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import PageNotFound from '../index';
import renderer from 'react-test-renderer';

it('No Data Text Testing', () => {
  const { container } = render(<PageNotFound />, { wrapper: MemoryRouter });
  expect(container.querySelector('a')).toHaveTextContent('dashboard');
});

it('No Page Found match snapshot', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
