import * as api from '../api/index.js';
import {
  GET_ORDERS_REQUEST ,
  GET_ORDERS_SUCCESS ,
  GET_ORDERS_FAIL ,
  GET_ORDERS_RESET ,
  GET_ORDER_REQUEST ,
  GET_ORDER_SUCCESS ,
  GET_ORDER_FAIL ,
  GET_ORDER_RESET ,
  CREATE_ORDER_REQUEST ,
  CREATE_ORDER_SUCCESS ,
  CREATE_ORDER_FAIL ,
  CREATE_ORDER_RESET ,
  UPDATE_ORDER_REQUEST ,
  UPDATE_ORDER_SUCCESS ,
  UPDATE_ORDER_FAIL ,
  UPDATE_ORDER_RESET ,
  DELETE_ORDER_REQUEST ,
  DELETE_ORDER_SUCCESS ,
  DELETE_ORDER_FAIL ,
  DELETE_ORDER_RESET ,
  GET_ORDERS_STATS
} from '../constants/orderConstants';


export const getOrdersAction = (limit, page) => async (dispatch,getState) => {
  try {

    dispatch({ type: GET_ORDERS_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.getAllOrdersLimit(limit, page, config);
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const getOrderAction = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.getOrder(id,config);

    dispatch({ type: GET_ORDER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_ORDER_FAIL,
      payload: message
    })
  }
};

export const createOrderAction = (food) => async (dispatch, getState) => {
  try {

    dispatch({ type: CREATE_ORDER_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.createOrder(food, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: message,
    })
  }
};

export const updateOrderAction = (id, post) => async (dispatch, getState) => {
  try {
    console.log(post)
    dispatch({ type: UPDATE_ORDER_REQUEST })
    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.updateOrder(id, post, config);

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: message,
    })
  }
};

export const deleteOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST })

    const {
      login: { userInfo },
      orderList: {orders}
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const filteredData ={
      data: orders.filter(order => order._id !== id)
    }

    dispatch({ type: GET_ORDERS_SUCCESS, payload: filteredData });

    await api.deleteOrder(id, config);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: id });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: message,
    })
  }
};

/*export const getOrderStatsAction = (id) => async (dispatch) => {
  try {
    const { data } = api.getOrderStats(id);

    dispatch({ type: GET_ORDERS_STATS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};*/


/*export const saveShippingAddress = data => dispatch => {
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
};*/
