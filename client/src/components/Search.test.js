import React from 'react';
import { shallow } from 'enzyme';

import { checkProps, findByTestAttr, storeFactory } from '../../test/testUtils';

import Search from './Search';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Search store={store} />).dive();

  return wrapper;
};

describe('render Search component and its contents', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-search');

    expect(component.length).toBe(1);
  });

  test('renders input box without error', () => {
    const component = findByTestAttr(wrapper, 'search-input');

    expect(component.length).toBe(1);
  });

  test('renders search button without error', () => {
    const component = findByTestAttr(wrapper, 'search-button');

    expect(component.length).toBe(1);
  });
});

describe('state controlled input field', () => {
  let mockSetKeyword = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetKeyword.mockClear();
    React.useState = jest.fn(() => ['', mockSetKeyword]);
    wrapper = setup();
  });

  test('`keyword` state is updated when input value changes', () => {
    const inputBox = findByTestAttr(wrapper, 'search-input');

    const mockEvent = { target: { value: 'Awesome' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetKeyword).toHaveBeenCalledWith('Awesome');
  });

  test('input field is cleared when search button is clicked', () => {
    const searchButton = findByTestAttr(wrapper, 'search-button');

    searchButton.simulate('click', { preventDefault() {} });

    expect(mockSetKeyword).toHaveBeenCalledWith('');
  });
});

test('check props', () => {
  checkProps(Search, {});
});
