import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spinner, Row, Col, Button } from 'reactstrap';

import Product from './Product';
import { searchProducts } from '../actions';

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

export const UnconnectedProducts = ({
  products = [],
  loading,
  keyword = '',
  searchProducts,
}) => {
  const loadMore = () => {
    searchProducts(keyword, products[products.length - 1].id);
  };

  const spinner = loading && (
    <SpinnerContainer>
      <Spinner data-test='products-loading' color='primary' />
    </SpinnerContainer>
  );

  const message = (
    <Message data-test='products-message'>
      {products.length > 0
        ? `${products.length} results are displayed for keyword ${keyword}`
        : 'No products to list'}
    </Message>
  );

  const productsList = products.length > 0 && (
    <>
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
      {!loading && (
        <Button data-test='products-load-more' outline block onClick={loadMore}>
          Load More
        </Button>
      )}
    </>
  );

  return (
    <div data-test='component-products'>
      {message}
      {productsList}
      {spinner}
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
  keyword: PropTypes.string.isRequired,
  searchProducts: PropTypes.func.isRequired,
};

const mapStateToProps = ({ search: { products, loading, keyword } }) => ({
  products,
  loading,
  keyword,
});

export default connect(mapStateToProps, { searchProducts })(
  UnconnectedProducts
);
