import React from 'react';

const Search = () => {
  const [keyword, setKeyword] = React.useState('');

  const search = (e) => {
    e.preventDefault();

    // Submit Keyword
    console.log(keyword);

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

export default Search;
