import * as api from '../api/index.js';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INCREASE_QUANTITY,
  CART_DECREASE_QUANTITY,
  CART_CLEAR_ITEMS
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  let { data } = await api.getFood(id);
  data.data.quantity = qty;
  dispatch({
    type: CART_ADD_ITEM,
    payload: { data }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const increaseQuantity = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_INCREASE_QUANTITY,
    payload: { id, qty }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const decreaseQuantity = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_DECREASE_QUANTITY,
    payload: { id, qty }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: CART_CLEAR_ITEMS,
    payload: []
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
