import * as api from '../api/index.js';
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_RESET,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_RESET,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_RESET,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_RESET,
  GET_CATEGORIES_STATS,
  GET_CATEGORIES_BY_CATEGORY
} from '../constants/categoryConstants';


export const getCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });

    const { data } = await api.getCategories();

    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAIL, payload: error.message });
  }
};

export const getCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_REQUEST });
    const { data } = await api.getCategory(id);

    dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_FAIL, payload: error.message });
  }
};

export const createCategoryAction = (post) => async (dispatch,getState) => {
  try {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    const {
      login: { userInfo },
      foodList: {foods}
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.createCategory(post,config);

    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_CATEGORY_FAIL, payload: error.message });
  }
};

export const updateCategoryAction = (id, post) => async (dispatch,getState) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    const {
      login: { userInfo },
      categoryList: {categories}
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await api.updateCategory(id, post,config);

    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });


    const filteredData ={
      data: categories.map(category => category._id === id ? {...category, name: post.name, topCategory: post.topCategory } : category)
    }

    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: filteredData });

  } catch (error) {
    dispatch({ type: UPDATE_CATEGORY_FAIL, payload: error.message });
  }
};

export const deleteCategoryAction = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const {
      login: { userInfo },
      categoryList: {categories}
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await api.deleteCategory(id,config);

    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });

    const filteredData ={
      data: categories.filter(category => category._id !== id)
    }

    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: filteredData });

  } catch (error) {
    dispatch({ type: DELETE_CATEGORY_FAIL, payload: error.message });
  }
};

/*export const getCategoryStats = id => async dispatch => {
  try {

    const { data } = api.getCategoryStats(id);

    dispatch({ type: GET_CATEGORIES_STATS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAIL, payload : error.message })
  }
};*/
