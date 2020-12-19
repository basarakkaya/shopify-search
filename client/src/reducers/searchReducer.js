/* eslint-disable import/no-anonymous-default-export */
import { actionTypes } from '../actions';

const initialState = {
  loading: false,
  products: [],
  keyword: '',
  lastPage: false,
};

/**
 * @function searchReducer
 * @param {{
 *  keyword: string,
 *  loading: boolean,
 *  products: array
 * }} state state object
 * @param  {object} action action to be reduced
 * @returns {object} new search state
 */
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SEARCH_INPROGRESS:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SEARCH:
      return {
        ...state,
        loading: false,
        products: [...state.products, ...payload],
        lastPage: payload.length < 12,
      };
    case actionTypes.NEW_SEARCH:
      return {
        ...state,
        keyword: payload,
        loading: false,
        products: [],
        lastPage: false,
      };
    default:
      return state;
  }
};
