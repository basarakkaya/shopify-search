import React from 'react';
import { shallow } from 'enzyme';

import { checkProps, findByTestAttr } from '../../test/testUtils';

import Product from './Product';

const expectedProductProp = {
  id: 1,
  title: 'product1',
};

const setup = (product = {}) => {
  return shallow(<Product product={product} />);
};

describe('render Product component and its contents', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(expectedProductProp);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-product');

    expect(component.length).toBe(1);
  });

  test('renders `title` field without error', () => {
    const title = findByTestAttr(wrapper, 'product-title');

    expect(title.text().length).not.toBe(0);
  });

  test('renders `id` field without error', () => {
    const id = findByTestAttr(wrapper, 'product-id');

    expect(id.text().length).not.toBe(0);
  });
});

test('check props', () => {
  checkProps(Product, { product: expectedProductProp });
});
