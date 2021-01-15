import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import {
  foodListReducer,
  foodDetailsReducer,
  foodDeleteReducer,
  foodCreateReducer,
  foodUpdateReducer,
} from './reducers/foods'

import {
  categoryListReducer,
  categoryDetailsReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
} from './reducers/categories'

import {
  inventoryListReducer,
  inventoryDetailsReducer,
  inventoryDeleteReducer,
  inventoryCreateReducer,
  inventoryUpdateReducer,
} from './reducers/inventories'

import {
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './reducers/users';

import { loginReducer, registerReducer } from './reducers/auth';
import { cartReducer } from './reducers/cart';


const reducer = combineReducers({
  foodList: foodListReducer,
  foodDetails: foodDetailsReducer,
  foodDelete: foodDeleteReducer,
  foodCreate: foodCreateReducer,
  foodUpdate: foodUpdateReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  inventoryList: inventoryListReducer,
  inventoryDetails: inventoryDetailsReducer,
  inventoryDelete: inventoryDeleteReducer,
  inventoryCreate: inventoryCreateReducer,
  inventoryUpdate: inventoryUpdateReducer,
  login: loginReducer,
  register: registerReducer,
  cart: cartReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  login: { userInfo: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
