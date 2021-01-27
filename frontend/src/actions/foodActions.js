import * as api from '../api/index.js';
import {
  GET_FOODS_REQUEST,
  GET_FOODS_SUCCESS,
  GET_FOODS_FAIL,
  GET_FOODS_RESET,
  GET_FOOD_REQUEST,
  GET_FOOD_SUCCESS,
  GET_FOOD_FAIL,
  GET_FOOD_RESET,
  CREATE_FOOD_REQUEST,
  CREATE_FOOD_SUCCESS,
  CREATE_FOOD_FAIL,
  CREATE_FOOD_RESET,
  UPDATE_FOOD_REQUEST,
  UPDATE_FOOD_SUCCESS,
  UPDATE_FOOD_FAIL,
  UPDATE_FOOD_RESET,
  DELETE_FOOD_REQUEST,
  DELETE_FOOD_SUCCESS,
  DELETE_FOOD_FAIL,
  DELETE_FOOD_RESET,
  GET_FOODS_STATS,
  GET_FOODS_BY_CATEGORY
} from '../constants/foodConstants';

export const getFoodsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FOODS_REQUEST });

    const { data } = await api.getFoods();

    dispatch({ type: GET_FOODS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FOODS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getFoodAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_FOOD_REQUEST });
    const { data } = await api.getFood(id);

    dispatch({ type: GET_FOOD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_FOOD_FAIL,
      payload: message
    });
  }
};

export const createFoodAction = (food) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_FOOD_REQUEST });

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.createFood(food, config);

    dispatch({ type: CREATE_FOOD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_FOOD_FAIL,
      payload: message
    });
  }
};

export const updateFoodAction = (id, post) => async (dispatch, getState) => {
  try {

    dispatch({ type: UPDATE_FOOD_REQUEST });
    const {
      login: { userInfo }
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.updateFood(id, post, config);

    dispatch({ type: UPDATE_FOOD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.log(message);
    dispatch({
      type: UPDATE_FOOD_FAIL,
      payload: message
    });
  }
};

export const deleteFoodAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_FOOD_REQUEST });

    const {
      login: { userInfo },
      foodList: { foods }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const filteredData = {
      data: foods.filter((food) => food._id !== id)
    };

    dispatch({ type: GET_FOODS_SUCCESS, payload: filteredData });

    await api.deleteFood(id, config);
    dispatch({ type: DELETE_FOOD_SUCCESS, payload: id });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DELETE_FOOD_FAIL,
      payload: message
    });
  }
};

export const getFoodStatsAction = (id) => async (dispatch) => {
  try {
    const { data } = api.getFoodStats(id);

    dispatch({ type: GET_FOODS_STATS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
