import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { searchProducts } from '../actions';

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
        <input
          data-test='search-input'
          type='text'
          placeholder='Enter keyword'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button data-test='search-button' type='submit' onClick={search}>
          Search
        </button>
      </form>
    </div>
  );
};

UnconnectedSearch.propTypes = {
  searchProducts: PropTypes.func.isRequired,
};

export default connect(null, { searchProducts })(UnconnectedSearch);
