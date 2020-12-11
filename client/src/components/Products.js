import React from 'react';
import PropTypes from 'prop-types';

import Product from './Product';

const Products = ({ products = [] }) => {
  return (
    <div data-test='component-products'>
      <p data-test='products-message'>
        {products.length > 0
          ? `${products.length} results are displayed`
          : 'No products to list'}
      </p>
      {products.length > 0 && (
        <div data-test='products-list'>
          {products.map((product) => (
            <Product
              data-test='products-product'
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
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
};

export default Products;
