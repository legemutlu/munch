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
  GET_FOODS_BY_CATEGORY,
  FOOD_CREATE_REVIEW_REQUEST,
  FOOD_CREATE_REVIEW_SUCCESS,
  FOOD_CREATE_REVIEW_FAIL,
  FOOD_CREATE_REVIEW_RESET,
  GET_FOODS_DIC_REQUEST,
  GET_FOODS_DIC_SUCCESS,
  GET_FOODS_DIC_FAIL,
  GET_FOODS_SEARCH_REQUEST,
  GET_FOODS_SEARCH_SUCCESS,
  GET_FOODS_SEARCH_FAIL,
  FOOD_DELETE_REVIEW_REQUEST,
  FOOD_DELETE_REVIEW_SUCCESS,
  FOOD_DELETE_REVIEW_FAIL, GET_FOODS_TOP5_SUCCESS, GET_FOODS_TOP5_REQUEST, GET_FOODS_TOP5_FAIL
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

export const foodReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOD_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case FOOD_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case FOOD_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case FOOD_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const foodReviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FOOD_DELETE_REVIEW_REQUEST:
      return { loading: true }
    case FOOD_DELETE_REVIEW_SUCCESS:
      return { loading: false, success: true}
    case FOOD_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}




export const foodSearchReducer = (state = { foodSearch: [] }, action)=>{
  switch (action.type) {
    case GET_FOODS_SEARCH_REQUEST:
      return { loading: true, foodSearch: [] }
    case GET_FOODS_SEARCH_SUCCESS:
      return {
        loading: false,
        foodSearch: action.payload.data,
      }
    case GET_FOODS_SEARCH_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const foodListTop5Reducer = (state = { top5Foods: [] }, action)=>{
  switch (action.type) {
    case GET_FOODS_TOP5_REQUEST:
      return { loading: true, top5Foods: [] }
    case GET_FOODS_TOP5_SUCCESS:
      return {
        loading: false,
        top5Foods: action.payload.data,
      }
    case GET_FOODS_TOP5_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}