/* eslint-disable import/no-anonymous-default-export */
import { actionTypes } from '../actions';

const initialState = {
  loading: false,
  products: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SEARCH_INPROGRESS:
      return {
        ...state,
        loading: true,
        products: [],
      };
    case actionTypes.SEARCH:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    default:
      return state;
  }
};
