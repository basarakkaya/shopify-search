import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Product from './Product';

const UnconnectedProducts = ({ products = [], loading }) => {
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

UnconnectedProducts.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ search: { products, loading } }) => ({
  products,
  loading,
});

export default connect(mapStateToProps)(UnconnectedProducts);
