import { actionTypes } from '../actions';
import searchReducer from './searchReducer';

test('returns an array of products and `false` of loading upon receiving SEARCH', () => {
  const products = [
    { id: 1, title: 'title1' },
    { id: 2, title: 'title2' },
    { id: 3, title: 'title3' },
  ];

  const newState = searchReducer(undefined, {
    type: actionTypes.SEARCH,
    payload: products,
  });

  expect(newState).toEqual({
    loading: false,
    products,
  });
});

test('returns an empty array of products and `true` of loading upon receiving SEARCH_IN_PROGRESS', () => {
  const newState = searchReducer(undefined, {
    type: actionTypes.SEARCH_INPROGRESS,
  });

  expect(newState).toEqual({
    loading: true,
    products: [],
  });
});
