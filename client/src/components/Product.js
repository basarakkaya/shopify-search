import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { loremIpsum } from 'lorem-ipsum';

const CustomCard = styled(Card)`
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 2px;
  transition: all ease-in-out 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 8px 2px;
  }
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
