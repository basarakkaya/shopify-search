import { actionTypes } from '../actions';
import alertReducer from './alertReducer';

test('returns an array of alert with one element upon receiving SET_ALERT', () => {
  const alertObj = {
    msg: 'test',
    alertType: 'info',
    id: 1,
  };

  const newState = alertReducer(undefined, {
    type: actionTypes.SET_ALERT,
    payload: alertObj,
  });

  expect(newState[0]).toBe(alertObj);
});

test('returns an empty array upon receiving REMOVE_ALERT after SET_ALERT', () => {
  const alertObj = {
    msg: 'test',
    alertType: 'info',
    id: 1,
  };

  alertReducer(undefined, {
    type: actionTypes.SET_ALERT,
    payload: alertObj,
  });

  const newState = alertReducer(undefined, {
    type: actionTypes.REMOVE_ALERT,
    payload: alertObj.id,
  });

  expect(newState.length).toBe(0);
});
