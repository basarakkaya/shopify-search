/* eslint-disable import/no-anonymous-default-export */
import { actionTypes } from '../actions';

const initialState = {
  loading: false,
  products: [],
  keyword: '',
};

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
      };
    case actionTypes.NEW_SEARCH:
      return {
        ...state,
        keyword: payload,
        loading: false,
        products: [],
      };
    default:
      return state;
  }
};
