/* eslint-disable import/no-anonymous-default-export */
import { actionTypes } from '../actions';

const initialState = [];

/**
 * @function alertReducer
 * @param {array} state Array of alerts
 * @param  {object} action action to be reduced
 * @returns {array} new alert state
 */
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_ALERT:
      return [...state, payload];
    case actionTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};
