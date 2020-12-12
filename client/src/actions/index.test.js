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

  test('adds products to state', () => {
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

      expect(newState.search.products).toBe(products);
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
