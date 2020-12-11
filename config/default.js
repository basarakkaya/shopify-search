const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecret: process.env.SHOPIFY_SECRET,
  apiURL: process.env.SHOPIFY_API_URL,
  port: process.env.PORT || 5000,
};
