import * as api from '../api/index.js';
import {
  GET_ALL_FOODS,
  GET_FOOD,
  CREATE_FOOD,
  UPDATE_FOOD,
  DELETE_FOOD,
  GET_FOODS_STATS,
  GET_FOODS_BY_CATEGORY
} from '../constants/foodConstants';

export const getFoods = () => async dispatch => {
  try {
    const { data } = await api.getFoods();

    dispatch({ type: GET_ALL_FOODS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getFood = id => async dispatch => {
  try {
    const { data } = await api.getFood(id);

    dispatch({ type: GET_FOOD, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createFood = post => async dispatch => {
  try {
    const { data } = await api.createFood(post);

    dispatch({ type: CREATE_FOOD, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateFood = (id, post) => async dispatch => {
  try {
    const { data } = await api.updateFood(id, post);

    dispatch({ type: UPDATE_FOOD, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFood = id => async (dispatch, getState) => {
  try {

    const {
      login: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await api.deleteFood(id,config);

    dispatch({ type: DELETE_FOOD, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const getFoodStats = id => async dispatch => {
  try {
    const { data } = api.getFoodStats(id);

    dispatch({ type: GET_FOODS_STATS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getFoodsByCategory = categoryId => async dispatch => {
  try {
    const { data } = await api.getFoods();
    let dataByCategory = [];
    data.data.map(
      el => el.category._id === categoryId && dataByCategory.push(el)
    );
    dispatch({ type: GET_FOODS_BY_CATEGORY, payload: dataByCategory });
  } catch (error) {
    console.log(error.message);
  }
};
