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



export const categoryListReducer = (state = { categories: [] }, action)=>{
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { loading: true, categories: [] }
    case GET_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload.data,
      }
    case GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryDetailsReducer = (
  state = { category: []  },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { ...state, loading: true }
    case GET_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload.data }
    case GET_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true }
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: true}
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { loading: true }
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, success: true, category: action.payload}
    case CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_CATEGORY_RESET:
      return {}
    default:
      return state
  }
}

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return { loading: true }
    case UPDATE_CATEGORY_SUCCESS:
      return { loading: false, success: true, category: action.payload.data }
    case UPDATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_CATEGORY_RESET:
      return { category: {} }
    default:
      return state
  }
}

/*
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_CATEGORY:
      return { ...state, category: action.payload };
    /!*     case CREATE_CATEGORY:
      return [...state, action.payload];
    case UPDATE_CATEGORY:
      return categories.map(category =>
        category._id === action.payload._id ? action.payload : category
      );
    case DELETE_CATEGORY:
      return categories.filter(category => category._id !== action.payload);
    case GET_CATEGORIES_STATS:
      return action.payload; *!/
    default:
      return state;
  }
};
*/
