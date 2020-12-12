import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { searchProducts } from '../actions';

const CustomInputGroup = styled(InputGroup)`
  max-width: 720px;
  margin: 0 auto;
`;

export const UnconnectedSearch = ({ searchProducts }) => {
  const [keyword, setKeyword] = React.useState('');

  const search = (e) => {
    e.preventDefault();

    // Submit Keyword
    searchProducts(keyword);

    setKeyword('');
  };

  return (
    <div data-test='component-search'>
      <form>
        <CustomInputGroup>
          <Input
            data-test='search-input'
            type='text'
            placeholder='Enter keyword'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <InputGroupAddon addonType='append'>
            <Button
              data-test='search-button'
              type='submit'
              onClick={search}
              outline
            >
              Search
            </Button>
          </InputGroupAddon>
        </CustomInputGroup>
      </form>
    </div>
  );
};

UnconnectedSearch.propTypes = {
  searchProducts: PropTypes.func.isRequired,
};

export default connect(null, { searchProducts })(UnconnectedSearch);
