import * as api from '../api/index.js';
import {
  GET_RESERVATIONS_REQUEST,
  GET_RESERVATIONS_SUCCESS,
  GET_RESERVATIONS_FAIL,
  GET_RESERVATION_REQUEST,
  GET_RESERVATION_SUCCESS,
  GET_RESERVATION_FAIL,
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_FAIL,
  UPDATE_RESERVATION_REQUEST,
  UPDATE_RESERVATION_SUCCESS,
  UPDATE_RESERVATION_FAIL,
  DELETE_RESERVATION_REQUEST,
  DELETE_RESERVATION_SUCCESS,
  DELETE_RESERVATION_FAIL
} from '../constants/reservationConstants';
import { DELETE_ORDER_SUCCESS, GET_ORDERS_SUCCESS } from '../constants/orderConstants';

export const getReservationsAction = () => async (dispatch,getState) => {
  try {

    dispatch({ type: GET_RESERVATIONS_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.getAllReservations(config);

    dispatch({ type: GET_RESERVATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_RESERVATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const getReservationAction = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: GET_RESERVATION_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await api.getReservation(id,config);

    dispatch({ type: GET_RESERVATION_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_RESERVATION_FAIL,
      payload: message
    })
  }
};

export const createReservationAction = (post) => async (dispatch, getState) => {
  try {

    dispatch({ type: CREATE_RESERVATION_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.createReservation(post, config);

    dispatch({ type: CREATE_RESERVATION_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_RESERVATION_FAIL,
      payload: message,
    })
  }
};

export const updateReservationAction = (id, post) => async (dispatch, getState) => {
  try {

    dispatch({ type: UPDATE_RESERVATION_REQUEST })
    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.updateReservation(id, post, config);

    dispatch({ type: UPDATE_RESERVATION_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UPDATE_RESERVATION_FAIL,
      payload: message,
    })
  }
};

export const deleteReservationAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_RESERVATION_REQUEST })

    const {
      login: { userInfo },
      reservationList: {reservations}
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const filteredData ={
      data: reservations.filter(reservation => reservation._id !== id)
    }

    dispatch({ type: GET_ORDERS_SUCCESS, payload: filteredData });

    await api.deleteOrder(id, config);
    dispatch({ type: DELETE_RESERVATION_SUCCESS, payload: id });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DELETE_RESERVATION_FAIL,
      payload: message,
    })
  }
};

