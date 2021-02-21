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
  foodReviewCreateReducer,
  foodSearchReducer, foodReviewDeleteReducer, foodListTop5Reducer
} from './reducers/foods';

import {
  orderListReducer,
  orderDetailsReducer,
  orderDeleteReducer,
  orderCreateReducer,
  orderUpdateReducer,
  orderListMyReducer,
} from './reducers/orders'

import {
  categoryListReducer,
  categoryDetailsReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
} from './reducers/categories'

import {
  reservationListReducer,
  reservationDetailsReducer,
  reservationDeleteReducer,
  reservationCreateReducer,
  reservationUpdateReducer,
} from './reducers/reservations'

import {
  contactListReducer,
  contactDetailsReducer,
  contactDeleteReducer,
  contactCreateReducer,
  contactUpdateReducer,
} from './reducers/contacts'

import {
  inventoryListReducer,
  inventoryDetailsReducer,
  inventoryDeleteReducer,
  inventoryCreateReducer,
  inventoryUpdateReducer,
} from './reducers/inventories'

import {
  userDetailsReducer,
  userUpdateMeReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
} from './reducers/users';

import { loginReducer, registerReducer } from './reducers/auth';
import { cartReducer } from './reducers/cart';


const reducer = combineReducers({
  foodList: foodListReducer,
  foodDetails: foodDetailsReducer,
  foodDelete: foodDeleteReducer,
  foodCreate: foodCreateReducer,
  foodUpdate: foodUpdateReducer,
  foodCreateReview: foodReviewCreateReducer,
  foodDeleteReview: foodReviewDeleteReducer,
  foodListTop5: foodListTop5Reducer,
  foodSearch: foodSearchReducer,
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
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDelete: orderDeleteReducer,
  orderCreate: orderCreateReducer,
  orderUpdate: orderUpdateReducer,
  orderListMy: orderListMyReducer,
  reservationList: reservationListReducer,
  reservationDetails: reservationDetailsReducer,
  reservationDelete: reservationDeleteReducer,
  reservationCreate: reservationCreateReducer,
  reservationUpdate: reservationUpdateReducer,
  contactList: contactListReducer,
  contactDetails: contactDetailsReducer,
  contactDelete: contactDeleteReducer,
  contactCreate: contactCreateReducer,
  contactUpdate: contactUpdateReducer,
  login: loginReducer,
  register: registerReducer,
  cart: cartReducer,
  userDetails: userDetailsReducer,
  userUpdateMe: userUpdateMeReducer,
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
