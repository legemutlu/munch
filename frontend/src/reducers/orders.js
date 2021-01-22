import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_RESET,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_RESET,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_RESET,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,
  GET_ORDERS_STATS
} from '../constants/orderConstants';

export const orderListReducer = (state = { orders: [], length: 0 }, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { loading: true, orders: [] };
    case GET_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.data,
        length: action.payload.results
      };
    case GET_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, loading: true };
    case GET_ORDER_SUCCESS:
      return { loading: false, order: action.payload.data };
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return { loading: true };
    case DELETE_ORDER_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderUpdateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return { loading: true };
    case UPDATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload.data };
    case UPDATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ORDER_RESET:
      return { order: {} };
    default:
      return state;
  }
};
