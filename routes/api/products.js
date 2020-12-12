const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');

/**
 * @route       GET api/products
 * @description Get products containing the keyword within their title.
 *              Request body should contain attribute `keyword`
 *              in order not to throw validation error.
 * @access      Public
 */
router.get(
  '/',
  [query('keyword', 'Please enter a keyword').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error('Validation error');
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const products = await axios.get(
        `https://${config.get('apiKey')}:${config.get(
          'apiSecret'
        )}@${config.get('apiURL')}/admin/products.json?limit=12&title=${
          req.query.keyword
        }${
          req.query.lastId ? `&since_id=${req.query.lastId}` : ''
        }&fields=id,title`
      );

      return res.status(200).json(products.data.products);
    } catch (error) {
      console.error('An Error Occurred: ', error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
