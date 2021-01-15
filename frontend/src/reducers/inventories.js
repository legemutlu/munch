import {
  GET_INVENTORIES_REQUEST,
  GET_INVENTORIES_SUCCESS,
  GET_INVENTORIES_FAIL,
  GET_INVENTORIES_RESET,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_FAIL,
  GET_INVENTORY_RESET,
  CREATE_INVENTORY_REQUEST,
  CREATE_INVENTORY_SUCCESS,
  CREATE_INVENTORY_FAIL,
  CREATE_INVENTORY_RESET,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAIL,
  UPDATE_INVENTORY_RESET,
  DELETE_INVENTORY_REQUEST,
  DELETE_INVENTORY_SUCCESS,
  DELETE_INVENTORY_FAIL,
  DELETE_INVENTORY_RESET,
  GET_INVENTORIES_STATS,
  GET_INVENTORIES_BY_CATEGORY
} from '../constants/inventoryConstants';


export const inventoryListReducer = (state = { inventories: [] }, action)=>{
  switch (action.type) {
    case GET_INVENTORIES_REQUEST:
      return { loading: true, inventories: [] }
    case GET_INVENTORIES_SUCCESS:
      return {
        loading: false,
        inventories: action.payload.data,
      }
    case GET_INVENTORIES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const inventoryDetailsReducer = (
  state = { inventory: []  },
  action
) => {
  switch (action.type) {
    case GET_INVENTORY_REQUEST:
      return { ...state, loading: true }
    case GET_INVENTORY_SUCCESS:
      return { loading: false, inventory: action.payload.data }
    case GET_INVENTORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const inventoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INVENTORY_REQUEST:
      return { loading: true }
    case DELETE_INVENTORY_SUCCESS:
      return { loading: false, success: true }
    case DELETE_INVENTORY_FAIL:
      return { loading: false, error: action.payload.error }
    default:
      return state
  }
}

export const inventoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_INVENTORY_REQUEST:
      return { loading: true }
    case CREATE_INVENTORY_SUCCESS:
      return { loading: false, success: true, inventory: action.payload}
    case CREATE_INVENTORY_FAIL:
      return { loading: false, error: action.payload }
    case CREATE_INVENTORY_RESET:
      return {}
    default:
      return state
  }
}

export const inventoryUpdateReducer = (state = { inventory: {} }, action) => {
  switch (action.type) {
    case UPDATE_INVENTORY_REQUEST:
      return { loading: true }
    case UPDATE_INVENTORY_SUCCESS:
      return { loading: false, success: true, inventory: action.payload.data }
    case UPDATE_INVENTORY_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_INVENTORY_RESET:
      return { inventory: {} }
    default:
      return state
  }
}



/*export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INVENTORYS:
      return { ...state, inventorys: action.payload };
    case GET_INVENTORY:
      return { ...state, inventory: action.payload };
    case CREATE_INVENTORY:
      return [...state.inventorys, action.payload];
    case UPDATE_INVENTORY:
      return {
        ...state,
        inventorys: state.inventorys.map(inventory =>
          inventory._id === action.payload._id ? action.payload : food
        )
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        foods: state.foods.data.filter(food => food._id !== action.payload)
      };
    case GET_INVENTORIES_STATS:
      return { ...state, statistic: action.payload };
    case GET_INVENTORIES_BY_CATEGORY:
      return { ...state, foodsByCategory: action.payload };
    default:
      return state;
  }
};*/
