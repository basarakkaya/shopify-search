import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { loremIpsum } from 'lorem-ipsum';

const CustomCard = styled(Card)`
  height: 100%;
`;

const Product = ({ product: { title = '', id = '' } }) => {
  return (
    <CustomCard data-test='component-product'>
      <CardBody>
        <CardTitle data-test='product-title' tag='h5'>
          {title}
        </CardTitle>
        <CardSubtitle
          data-test='product-id'
          tag='h6'
          className='mb-2 text-muted'
        >
          ID: {id}
        </CardSubtitle>
        <CardText>{loremIpsum()}</CardText>
      </CardBody>
    </CustomCard>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
