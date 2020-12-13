const productsRouter = require('./products');
const express = require('express');
const moxios = require('moxios');
const request = require('supertest');
const config = require('config');

const initRouter = () => {
  const app = express();
  app.use('/api/products', productsRouter);
  return app;
};

const response = {
  products: [{ id: 1, title: 'title1' }],
};

describe('GET api/products', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('fetches from correct URL with no lastId param', async () => {
    moxios.stubRequest(
      new RegExp(
        `${config.get('apiKey')}:${config.get('apiSecret')}@${config.get(
          'apiURL'
        )}`
      ),
      {
        status: 200,
        response,
      }
    );

    const app = initRouter();

    await request(app).get('/api/products').query({ keyword: 'title' });

    expect(moxios.requests.mostRecent().url).toBe(
      `https://${config.get('apiKey')}:${config.get('apiSecret')}@${config.get(
        'apiURL'
      )}/admin/products.json?limit=12&title=title&fields=id,title`
    );
  });

  test('fetches from correct URL with a lastId param', async () => {
    moxios.stubRequest(
      new RegExp(
        `${config.get('apiKey')}:${config.get('apiSecret')}@${config.get(
          'apiURL'
        )}`
      ),
      {
        status: 200,
        response,
      }
    );

    const app = initRouter();

    await request(app)
      .get('/api/products')
      .query({ keyword: 'title', lastId: 1234 });

    expect(moxios.requests.mostRecent().url).toBe(
      `https://${config.get('apiKey')}:${config.get('apiSecret')}@${config.get(
        'apiURL'
      )}/admin/products.json?limit=12&title=title&since_id=1234&fields=id,title`
    );
  });

  test('return non-empty products array', async () => {
    moxios.stubRequest(
      new RegExp(
        `${config.get('apiKey')}:${config.get('apiSecret')}@${config.get(
          'apiURL'
        )}`
      ),
      {
        status: 200,
        response,
      }
    );

    const app = initRouter();

    const res = await request(app)
      .get('/api/products')
      .query({ keyword: 'title' });

    expect(res.body).toEqual(response.products);
  });

  test('return validation error when no keyword is pass as query', async () => {
    const app = initRouter();

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(400);
    expect(res.body.errors.length).not.toBe(0);
  });

  test('return server error when axios request fails', async () => {
    moxios.stubRequest(
      new RegExp(
        `${config.get('apiKey')}:${config.get('apiSecret')}@${config.get(
          'apiURL'
        )}`
      ),
      {
        status: 400,
      }
    );

    const app = initRouter();

    const res = await request(app)
      .get('/api/products')
      .query({ keyword: 'title' });

    expect(res.status).toBe(500);
  });
});
