import * as api from '../api/index.js';
import {
  GET_INVENTORIES_REQUEST,
  GET_INVENTORIES_SUCCESS,
  GET_INVENTORIES_FAIL,
  GET_INVENTORIES_RESET,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_FAIL,
  GET_INVENTORY_RESET,
  CREATE_INVENTORY_REQUEST,
  CREATE_INVENTORY_SUCCESS,
  CREATE_INVENTORY_FAIL,
  CREATE_INVENTORY_RESET,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAIL,
  UPDATE_INVENTORY_RESET,
  DELETE_INVENTORY_REQUEST,
  DELETE_INVENTORY_SUCCESS,
  DELETE_INVENTORY_FAIL,
  DELETE_INVENTORY_RESET,
  GET_INVENTORIES_STATS,
  GET_INVENTORIES_BY_CATEGORY
} from '../constants/inventoryConstants';

export const getInventoriesAction = () => async (dispatch,getState) => {
  try {

    dispatch({ type: GET_INVENTORIES_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.getAllInventory(config);

    dispatch({ type: GET_INVENTORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_INVENTORIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const getInventoryAction = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: GET_INVENTORY_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await api.getInventory(id,config);

    dispatch({ type: GET_INVENTORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_INVENTORY_FAIL,
      payload: message
    })
  }
};

export const createInventoryAction = (food) => async (dispatch, getState) => {
  try {

    dispatch({ type: CREATE_INVENTORY_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.createInventory(food, config);

    dispatch({ type: CREATE_INVENTORY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_INVENTORY_FAIL,
      payload: message,
    })
  }
};

export const updateInventoryAction = (id, food) => async (dispatch, getState) => {
  try {

    dispatch({ type: UPDATE_INVENTORY_REQUEST })
    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.updateInventory(id, food, config);

    dispatch({ type: UPDATE_INVENTORY_SUCCESS, payload: data });

    dispatch({type: GET_INVENTORY_SUCCESS, payload:data})
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UPDATE_INVENTORY_FAIL,
      payload: message,
    })
  }
};

export const deleteInventoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_INVENTORY_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await api.deleteInventory(id, config);

    dispatch({ type: DELETE_INVENTORY_SUCCESS, payload: id });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DELETE_INVENTORY_FAIL,
      payload: message,
    })
  }
};

