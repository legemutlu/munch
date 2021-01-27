import * as api from '../api/index.js';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_GET_ME_REQUEST,
  USER_GET_ME_SUCCESS,
  USER_GET_ME_FAIL,
  USER_GET_ME_RESET,
  USER_UPDATE_ME_SUCCESS,
  USER_UPDATE_ME_REQUEST,
  USER_UPDATE_ME_FAIL,
  USER_UPDATE_ME_RESET,
  USER_DELETE_ME_SUCCESS,
  USER_DELETE_ME_REQUEST,
  USER_DELETE_ME_FAIL,
  USER_DELETE_ME_RESET,

} from '../constants/userConstants';
import { USER_LOGIN_SUCCESS } from '../constants/authConstants';

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });
    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.getUser(id, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message
    });
  }
};


export const listUsers = (limit, page) => async (dispatch, getState) => {
  try {
    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const allData = await api.getAllUsers(config);
    let allDataLength;
    if (allData.data) {
      allDataLength = allData.data.results;
    }

    dispatch({
      type: USER_LIST_REQUEST,
      allDataLength: allDataLength
    });

    const { data } = await api.getUsers(limit, page, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
      allDataLength: allDataLength
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_LIST_FAIL,
      payload: message
    });
  }
};

/* export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message
    });
  }
};
 */

export const updateUserAction = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    });

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.updateUser(user, config);

    dispatch({ type: USER_UPDATE_SUCCESS });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message
    });
  }
};

export const updateMeAction = user => async (dispatch, getState) => {
  try {

    dispatch({
      type: USER_UPDATE_ME_REQUEST
    });

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.updateMe(user,config);

    dispatch({ type: USER_UPDATE_ME_SUCCESS, payload: data});

    await dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...userInfo, user: data && data.data ? data.data : userInfo.user}  });

    localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, user: data && data.data ? data.data : userInfo.user }  ));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_UPDATE_ME_FAIL,
      payload: message
    });
  }
};

export const getMeAction = () => async (dispatch, getState) => {
  try {

    dispatch({
      type: USER_GET_ME_REQUEST
    });

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.getMe(config);

    dispatch({ type: USER_GET_ME_SUCCESS });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_GET_ME_FAIL,
      payload: message
    });
  }
};

export const deleteMeAction = () => async (dispatch, getState) => {
  try {

    dispatch({
      type: USER_DELETE_ME_REQUEST
    });

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.deleteMe(config);

    dispatch({ type: USER_DELETE_ME_SUCCESS });

    dispatch({ type: USER_DELETE_SUCCESS });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USER_DELETE_ME_FAIL,
      payload: message
    });
  }
};


