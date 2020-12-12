import React from 'react';
import { shallow } from 'enzyme';

import { checkProps, findByTestAttr, storeFactory } from '../../test/testUtils';

import Products, { UnconnectedProducts } from './Products';

const expectedProductsProp = [
  { id: 1, title: 'product1' },
  { id: 2, title: 'product2' },
  { id: 3, title: 'product3' },
];

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Products store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('if there are no products', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      search: {
        products: [],
        loading: false,
        keyword: '',
        searchProducts: () => {},
      },
    });
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

  test('does not render `load more` button', () => {
    const loadMore = findByTestAttr(wrapper, 'products-load-more');

    expect(loadMore.length).toBe(0);
  });
});

describe('if there are products to be listed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      search: {
        products: expectedProductsProp,
        loading: false,
        keyword: '',
        searchProducts: () => {},
      },
    });
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

  test('renders `load more` button', () => {
    const loadMore = findByTestAttr(wrapper, 'products-load-more');

    expect(loadMore.length).toBe(1);
  });

  describe('`loadMore` button is clicked', () => {
    let searchProductsMock;
    let wrapper;
    const keyword = 'testKeyword';
    const lastId = 1;

    beforeEach(() => {
      searchProductsMock = jest.fn();

      const props = {
        keyword,
        loading: false,
        products: [{ id: lastId, title: 'title1' }],
        searchProducts: searchProductsMock,
      };

      wrapper = shallow(<UnconnectedProducts {...props} />);

      const loadMore = findByTestAttr(wrapper, 'products-load-more');
      loadMore.simulate('click', { preventDefault() {} });
    });

    test('searchProduct action creator runs on click', () => {
      const searchProductsCallCount = searchProductsMock.mock.calls.length;

      expect(searchProductsCallCount).toBe(1);
    });

    test('searchProduct action creator is called with correct arguments', () => {
      const searchProductArgs = searchProductsMock.mock.calls[0];

      expect(searchProductArgs[0]).toBe(keyword);
      expect(searchProductArgs[1]).toBe(lastId);
    });
  });
});

describe('if search in progress', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      search: {
        products: [],
        loading: true,
        keyword: '',
        searchProducts: () => {},
      },
    });
  });

  test('renders products component without error', () => {
    const component = findByTestAttr(wrapper, 'component-products');

    expect(component.length).toBe(1);
  });

  test('render a message', () => {
    const message = findByTestAttr(wrapper, 'products-message');

    expect(message.length).toBe(1);
  });

  test('renders spinner without error', () => {
    const spinner = findByTestAttr(wrapper, 'products-loading');

    expect(spinner.length).toBe(1);
  });

  test('does not render `load more` button', () => {
    const loadMore = findByTestAttr(wrapper, 'products-load-more');

    expect(loadMore.length).toBe(0);
  });
});

describe('check props', () => {
  test('`products` prop is an empty array', () => {
    checkProps(Products, {
      products: [],
      loading: false,
      keyword: '',
      searchProducts: () => {},
    });
  });

  test('`products` prop is a non-empty array with expected shape of components', () => {
    checkProps(Products, {
      products: expectedProductsProp,
      loading: false,
      keyword: '',
      searchProducts: () => {},
    });
  });
});
