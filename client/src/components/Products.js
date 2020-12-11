import React from 'react';
import PropTypes from 'prop-types';

import Product from './Product';

const Products = ({ products = [], loading }) => {
  const spinner = loading && <div data-test='products-loading'></div>;

  const message = !loading && (
    <p data-test='products-message'>
      {products.length > 0
        ? `${products.length} results are displayed`
        : 'No products to list'}
    </p>
  );

  const productsList = !loading && products.length > 0 && (
    <div data-test='products-list'>
      {products.map((product) => (
        <Product
          data-test='products-product'
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );

  return (
    <div data-test='component-products'>
      {spinner}
      {message}
      {productsList}
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Products;
