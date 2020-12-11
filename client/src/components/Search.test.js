import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../test/testUtils';

import Search from './Search';

const setup = () => {
  return shallow(<Search />);
};

describe('render Search component and its contents', () => {
  test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-search');

    expect(component.length).toBe(1);
  });

  test('renders input box without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'search-input');

    expect(component.length).toBe(1);
  });

  test('renders search button without error', () => {
    const wrapper = setup();
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
