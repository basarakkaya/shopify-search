import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product: { title = '', id = '' } }) => {
  return (
    <div data-test='component-product'>
      <h5 data-test='product-title'>{title}</h5>
      <p data-test='product-id'>{id}</p>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
