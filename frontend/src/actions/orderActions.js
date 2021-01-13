import {
  ORDER_SAVE_SHIPPING_ADDRESS,
  ORDER_SAVE_PAYMENT_METHOD,
  ORDER_SAVE_TYPE
} from '../constants/orderConstants';

export const saveShippingAddress = data => dispatch => {
  dispatch({
    type: ORDER_SAVE_SHIPPING_ADDRESS,
    payload: data
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const saveOrderType = data => dispatch => {
  dispatch({
    type: ORDER_SAVE_TYPE,
    payload: data
  });

  localStorage.setItem('orderType', JSON.stringify(data));
};

export const savePaymentMethod = data => dispatch => {
  dispatch({
    type: ORDER_SAVE_PAYMENT_METHOD,
    payload: data
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
