import { GET_ALL_CATEGORIES } from '../constants/categoryConstants';
import { GET_CATEGORY } from '../constants/categoryConstants';
import { CREATE_CATEGORY } from '../constants/categoryConstants';
import { UPDATE_CATEGORY } from '../constants/categoryConstants';
import { DELETE_CATEGORY } from '../constants/categoryConstants';
import { GET_CATEGORIES_STATS } from '../constants/categoryConstants';

const initialState = {
  categories: [],
  statistic: [],
  category: null,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_CATEGORY:
      return { ...state, category: action.payload };
    /*     case CREATE_CATEGORY:
      return [...state, action.payload];
    case UPDATE_CATEGORY:
      return categories.map(category =>
        category._id === action.payload._id ? action.payload : category
      );
    case DELETE_CATEGORY:
      return categories.filter(category => category._id !== action.payload);
    case GET_CATEGORIES_STATS:
      return action.payload; */
    default:
      return state;
  }
};
