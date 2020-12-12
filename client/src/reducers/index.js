import { combineReducers } from 'redux';

import alert from './alertReducer';
import search from './searchReducer';

export default combineReducers({
  alert,
  search,
});
