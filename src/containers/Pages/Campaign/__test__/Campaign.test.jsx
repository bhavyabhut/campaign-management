import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import CampaignList from '../index';
import mockUpState from './mockUpState';
import renderer from 'react-test-renderer';

describe('With React Testing Library', () => {
  const initialState = mockUpState;
  const mockStore = configureStore();
  let store, wrapper;

  it('Campaigns List', () => {
    store = mockStore(initialState);
    const { container } = render(
      <Provider store={store}>
        <CampaignList />
      </Provider>,
    );
    expect(container.querySelector('button')).toHaveTextContent('Add Campaign');
  });
  it('Campaign List match snapshot', () => {
    store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <CampaignList />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
