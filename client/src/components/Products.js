import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spinner, Row, Col } from 'reactstrap';

import Product from './Product';

const SpinnerContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const Message = styled.p`
  margin-top: 1rem;
`;

const ProductContainer = styled(Col)`
  margin: 16px 0px;
`;

const UnconnectedProducts = ({ products = [], loading }) => {
  const spinner = loading && (
    <SpinnerContainer>
      <Spinner data-test='products-loading' color='primary' />
    </SpinnerContainer>
  );

  const message = !loading && (
    <Message data-test='products-message'>
      {products.length > 0
        ? `${products.length} results are displayed`
        : 'No products to list'}
    </Message>
  );

  const productsList = !loading && products.length > 0 && (
    <Row data-test='products-list'>
      {products.map((product) => (
        <ProductContainer
          data-test='products-product'
          key={product.id}
          xs='12'
          sm='6'
          md='4'
          lg='3'
        >
          <Product product={product} />
        </ProductContainer>
      ))}
    </Row>
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
