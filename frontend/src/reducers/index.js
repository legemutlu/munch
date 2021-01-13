import { combineReducers } from 'redux';

import foods from './foods';
import categories from './categories';
import { loginReducer, registerReducer } from './auth';

export default combineReducers({
  foods,
  categories,
  login: loginReducer,
  register: registerReducer
});
