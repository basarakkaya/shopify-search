import React from 'react';
import { shallow } from 'enzyme';

import { checkProps, findByTestAttr } from '../../test/testUtils';

import Products from './Products';

const expectedProductsProp = [
  { id: 1, title: 'product1' },
  { id: 2, title: 'product2' },
  { id: 3, title: 'product3' },
];

const setup = (products = []) => {
  return shallow(<Products products={products} />);
};

describe('if there are no products', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('renders products component without error', () => {
    const component = findByTestAttr(wrapper, 'component-products');

    expect(component.length).toBe(1);
  });

  test('renders a message that indicates that there are no products to be listed', () => {
    const message = findByTestAttr(wrapper, 'products-message');

    expect(message.text().length).not.toBe(0);
  });

  test('does not render products list', () => {
    const list = findByTestAttr(wrapper, 'products-list');

    expect(list.length).toBe(0);
  });
});

describe('if there are products to be listed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(expectedProductsProp);
  });

  test('renders products component without error', () => {
    const component = findByTestAttr(wrapper, 'component-products');

    expect(component.length).toBe(1);
  });

  test('renders a message that displays keyword and result length', () => {
    const message = findByTestAttr(wrapper, 'products-message');

    expect(message.text().length).not.toBe(0);
  });

  test('renders products list without error', () => {
    const list = findByTestAttr(wrapper, 'products-list');

    expect(list.length).toBe(1);
  });

  test('correct number of products are listed', () => {
    const products = findByTestAttr(wrapper, 'products-product');

    expect(products.length).toBe(3);
  });
});

describe('check props', () => {
  test('`products` prop is an empty array', () => {
    checkProps(Products, { products: [] });
  });

  test('`products` prop is a non-empty array with expected shape of components', () => {
    checkProps(Products, { products: expectedProductsProp });
  });
});
