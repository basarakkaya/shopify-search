const config = require('config');

test('something', () => {
  console.log(config.get('apiKey'));
  expect(true);
});
