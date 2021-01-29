import * as api from '../api/index.js';
import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_CONTACT_REQUEST,
  GET_CONTACT_SUCCESS,
  GET_CONTACT_FAIL,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL
} from '../constants/contactConstants';

export const getContactsAction = () => async (dispatch,getState) => {
  try {

    dispatch({ type: GET_CONTACTS_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.getAllContacts(config);

    dispatch({ type: GET_CONTACTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CONTACTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const getContactAction = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: GET_CONTACT_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await api.getContact(id,config);

    dispatch({ type: GET_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_CONTACT_FAIL,
      payload: message
    })
  }
};

export const createContactAction = (food) => async (dispatch, getState) => {
  try {

    dispatch({ type: CREATE_CONTACT_REQUEST })

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.createContact(food, config);

    dispatch({ type: CREATE_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_CONTACT_FAIL,
      payload: message,
    })
  }
};

export const updateContactAction = (id, food) => async (dispatch, getState) => {
  try {

    dispatch({ type: UPDATE_CONTACT_REQUEST })
    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.updateContact(id, food, config);

    dispatch({ type: UPDATE_CONTACT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: UPDATE_CONTACT_FAIL,
      payload: message,
    })
  }
};

export const deleteContactAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_CONTACT_REQUEST })

    const {
      login: { userInfo },
      inventoryList: {inventories}
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const filteredData ={
      data: inventories.filter(inventory => inventory._id !== id)
    }

    dispatch({ type: DELETE_CONTACT_SUCCESS, payload: filteredData });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DELETE_CONTACT_FAIL,
      payload: message,
    })
  }
};

