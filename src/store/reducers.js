import { combineReducers } from 'redux';

import accountReducer from './reducers/account';
import notificationReducer from './reducers/notification';

export default combineReducers({
  account: accountReducer,
  notification: notificationReducer,
});
