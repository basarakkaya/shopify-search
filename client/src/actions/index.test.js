import moxios from 'moxios';

import { storeFactory } from '../../test/testUtils';
import { setAlert, searchProducts } from './';

describe('searchProducts', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('adds products to state when successful', () => {
    const products = [
      { id: 1, title: 'title1' },
      { id: 2, title: 'title2' },
      { id: 3, title: 'title3' },
    ];

    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: products,
      });
    });

    return store.dispatch(searchProducts()).then(() => {
      const newState = store.getState();

      expect(newState.search.products).toEqual(products);
    });
  });

  describe('sets alert when failed', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    test('sets alert when validation error', () => {
      const error = {
        response: {
          status: 400,
          data: {
            errors: [{ msg: 'test' }],
          },
        },
      };

      const store = storeFactory();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 400,
          response: error,
        });
      });

      return store.dispatch(searchProducts()).then(() => {
        const newState = store.getState();

        expect(newState.alert.length).toBe(1);
      });
    });

    test('sets alert when server error', () => {
      const error = {
        response: {
          status: 500,
          data: {},
        },
      };

      const store = storeFactory();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 500,
          response: error,
        });
      });

      return store.dispatch(searchProducts()).then(() => {
        const newState = store.getState();

        expect(newState.alert.length).toBe(1);
      });
    });
  });
});

describe('setAlert', () => {
  test('adds alert to state', () => {
    const store = storeFactory();
    const alertObj = {
      alertType: 'danger',
      msg: 'testMsg',
    };

    store.dispatch(setAlert(alertObj.msg, alertObj.alertType));
    const newState = store.getState();

    expect(newState.alert[0].msg).toBe(alertObj.msg);
    expect(newState.alert[0].alertType).toBe(alertObj.alertType);
  });
});
