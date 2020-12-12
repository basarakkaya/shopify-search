import axios from 'axios';
import { v4 } from 'uuid';

export const actionTypes = {
  SEARCH: 'SEARCH',
  SEARCH_INPROGRESS: 'SEARCH_INPROGRESS',
  SET_ALERT: 'SET_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT',
  NEW_SEARCH: 'NEW_SEARCH',
};

/**
 * @description Displays an alert for a time - Usually used for warnings and errors
 * @param {string} msg Message to be displayed within the alert
 * @param {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')} alertType
 * Alert color type
 * @param {number} timeout Display time of the alert - defaults to 5000ms
 */
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

/**
 * @description Searches products with the title containing given keyword.
 * @param {string} keyword Word to be search within product titles
 * @param {number} lastId ID of the last product that is displayed. Used for pagination
 * - defaults to 0 to start from the beginning of the product list
 */
export const searchProducts = (keyword, lastId = 0) => async (dispatch) => {
  try {
    if (!lastId) dispatch({ type: actionTypes.NEW_SEARCH, payload: keyword });

    dispatch({ type: actionTypes.SEARCH_INPROGRESS });

    const products = await axios.get(
      `/api/products${keyword && `?keyword=${keyword}&lastId=${lastId}`}`
    );

    dispatch({ type: actionTypes.SEARCH, payload: products.data });
  } catch (error) {
    const errors = error.response.data.errors;
    const statusCode = error.response.status;

    if (errors) {
      errors.forEach((err) => {
        const msg = `An error occured: ${err.msg} -- Status: ${statusCode}`;
        dispatch(setAlert(msg, 'danger'));
      });
    } else {
      dispatch(setAlert(`An error occured - Status: ${statusCode}`, 'danger'));
    }

    // clear list & loading state
    dispatch({
      type: actionTypes.SEARCH,
      payload: [],
    });
  }
};
