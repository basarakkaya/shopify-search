# shopify-search

Allows you to search within your Shopify store. Enter a keyword and hit the `Search` button to find products with the title that contains your keyword.

This app is developed using [React](https://reactjs.org/), [Redux](https://redux.js.org/), [Redux-thunk](https://github.com/reduxjs/redux-thunk) and [Express](https://expressjs.com/). [reactstrap](https://reactstrap.github.io/) is used for some UI components. For CSS-in-JS, [styled-components](https://styled-components.com/) is used. Unit tests are written with [jest](https://jestjs.io/) and [enzyme](https://enzymejs.github.io/enzyme/).

## Setting up & Environment Variables

To setup this app locally, first, you need to install dependencies. Run `npm install` in root directory, then run `yarn` in `client` directory. After the dependencies are installed, you are ready to start the app up.

IMPORTANT: You need to set these environment variables as your Shopify credentials;

```
SHOPIFY_API_KEY= <Your Shopify API Key>
SHOPIFY_SECRET= <Your Shopify API Secret>
SHOPIFY_API_URL= <Your Shopify URL - without http and trailing slash>
```

To run on your local server, you need to create `.env` file in the root directory and set these variable inside.

## Development mode

To run in development mode, run `npm run dev` in root directory. This will initiate the client on `localhost:3000` and the server on `localhost:5000`. The client proxies the requests to port `5000` as specified in its `package.json`.

## Production mode

To run in production mode, run `npm run build:client` in root directory, or `yarn run build` in `client` directory. Afterwards run `npm start` in the root directory. The app will be served on `localhost:5000`.

## Heroku Deployment & Environment Variables

To deploy to Heroku, no extra process is required - except creating environment variables.
