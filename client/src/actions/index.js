import axios from 'axios';
import { v4 } from 'uuid';

export const actionTypes = {
  SEARCH: 'SEARCH',
  SEARCH_INPROGRESS: 'SEARCH_INPROGRESS',
  SET_ALERT: 'SET_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT',
};

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = v4();

  // set the alert
  dispatch({
    type: actionTypes.SET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });

  // remove when the time is out
  setTimeout(() => {
    dispatch({
      type: actionTypes.REMOVE_ALERT,
      payload: id,
    });
  }, timeout);
};

export const searchProducts = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SEARCH_INPROGRESS });

    const products = await axios.get(`/api/products?keyword=${keyword}`);

    dispatch({ type: actionTypes.SEARCH, payload: products.data });
  } catch (error) {
    dispatch(setAlert('An error occured - Cannot fetch products', 'danger'));

    // clear list & loading state
    dispatch({
      type: actionTypes.SEARCH,
      payload: [],
    });
  }
};
