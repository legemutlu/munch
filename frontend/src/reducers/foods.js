import {
  GET_ALL_FOODS,
  GET_FOOD,
  CREATE_FOOD,
  UPDATE_FOOD,
  DELETE_FOOD,
  GET_FOODS_STATS,
  GET_FOODS_BY_CATEGORY
} from '../constants/foodConstants';

const initialState = {
  foods: [],
  statistic: [],
  foodsByCategory: [],
  food: null,
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FOODS:
      return { ...state, foods: action.payload };
    case GET_FOOD:
      return { ...state, food: action.payload };
    case CREATE_FOOD:
      return [...state.foods, action.payload];
    case UPDATE_FOOD:
      return {
        ...state,
        foods: state.foods.map(food =>
          food._id === action.payload._id ? action.payload : food
        )
      };
    case DELETE_FOOD:
      return {
        ...state,
        foods: state.foods.data.filter(food => food._id !== action.payload)
      };
    case GET_FOODS_STATS:
      return { ...state, statistic: action.payload };
    case GET_FOODS_BY_CATEGORY:
      return { ...state, foodsByCategory: action.payload };
    default:
      return state;
  }
};
