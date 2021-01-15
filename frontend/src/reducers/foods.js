import {
  GET_FOODS_REQUEST,
  GET_FOODS_SUCCESS,
  GET_FOODS_FAIL,
  GET_FOOD_REQUEST,
  GET_FOOD_SUCCESS,
  GET_FOOD_FAIL,
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
  GET_FOODS_STATS,
  GET_FOODS_BY_CATEGORY
} from '../constants/foodConstants';


export const foodListReducer = (state = { foods: [] }, action)=>{
  switch (action.type) {
    case GET_FOODS_REQUEST:
      return { loading: true, foods: [] }
    case GET_FOODS_SUCCESS:
      return {
        loading: false,
        foods: action.payload.data,
      }
    case GET_FOODS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const foodDetailsReducer = (
  state = { food: []  },
  action
) => {
  switch (action.type) {
    case GET_FOOD_REQUEST:
      return { ...state, loading: true }
    case GET_FOOD_SUCCESS:
      return { loading: false, food: action.payload.data }
    case GET_FOOD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const foodDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_FOOD_REQUEST:
      return { loading: true }
    case DELETE_FOOD_SUCCESS:
      return { loading: false, success: true}
    case DELETE_FOOD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const foodCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FOOD_REQUEST:
      return { loading: true }
    case CREATE_FOOD_SUCCESS:
      return { loading: false, success: true, food: action.payload}
    case CREATE_FOOD_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_FOOD_RESET:
      return {}
    default:
      return state
  }
}

export const foodUpdateReducer = (state = { food: {} }, action) => {
  switch (action.type) {
    case UPDATE_FOOD_REQUEST:
      return { loading: true }
    case UPDATE_FOOD_SUCCESS:
      return { loading: false, success: true, food: action.payload.data }
    case UPDATE_FOOD_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_FOOD_RESET:
      return { food: {} }
    default:
      return state
  }
}



/*export default (state = initialState, action) => {
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
};*/
