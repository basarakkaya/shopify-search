import React from 'react';
import { shallow } from 'enzyme';

import Alerts from './Alerts';

import { checkProps, findByTestAttr, storeFactory } from '../../test/testUtils';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Alerts store={store} />)
    .dive()
    .dive();

  return wrapper;
};

describe('with no alerts listed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({ alert: [] });
  });

  test('renders alert container without error', () => {
    const component = findByTestAttr(wrapper, 'component-alerts');

    expect(component.length).toBe(1);
  });

  test('does not list any alert', () => {
    const alerts = findByTestAttr(wrapper, 'alerts-alert');

    expect(alerts.length).toBe(0);
  });
});

describe('with alerts listed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      alert: [
        { msg: 'test', alertType: 'danger', id: 'uuid1' },
        { msg: 'test2', alertType: 'danger', id: 'uuid2' },
      ],
    });
  });

  test('renders alert container without error', () => {
    const component = findByTestAttr(wrapper, 'component-alerts');

    expect(component.length).toBe(1);
  });

  test('lists alerts successfully', () => {
    const alerts = findByTestAttr(wrapper, 'alerts-alert');

    expect(alerts.length).toBe(2);
  });
});

test('check proptypes', () => {
  checkProps(Alerts, [
    { msg: 'test', alertType: 'danger', id: 'uuid1' },
    { msg: 'test2', alertType: 'danger', id: 'uuid2' },
  ]);
});
