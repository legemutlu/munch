import * as api from '../api/index.js';
import { GET_ALL_CATEGORIES } from '../constants/categoryConstants';
import { GET_CATEGORY } from '../constants/categoryConstants';
import { CREATE_CATEGORY } from '../constants/categoryConstants';
import { UPDATE_CATEGORY } from '../constants/categoryConstants';
import { DELETE_CATEGORY } from '../constants/categoryConstants';
import { GET_CATEGORIES_STATS } from '../constants/categoryConstants';

export const getCategories = () => async dispatch => {
  try {
    const { data } = await api.getCategories();

    dispatch({ type: GET_ALL_CATEGORIES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategory = id => async dispatch => {
  try {
    const { data } = await api.getCategory(id);

    dispatch({ type: GET_CATEGORY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createCategory = post => async dispatch => {
  try {
    const { data } = await api.createCategory(post);

    dispatch({ type: CREATE_CATEGORY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCategory = (id, post) => async dispatch => {
  try {
    const { data } = await api.updateCategory(id, post);

    dispatch({ type: UPDATE_CATEGORY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCategory = id => async dispatch => {
  try {
    await api.deleteCategory(id);

    dispatch({ type: DELETE_CATEGORY, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const getCategoryStats = id => async dispatch => {
  try {
    const { data } = api.getCategoryStats(id);

    dispatch({ type: GET_CATEGORIES_STATS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
