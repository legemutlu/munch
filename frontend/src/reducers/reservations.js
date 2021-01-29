import {
  GET_RESERVATIONS_REQUEST,
  GET_RESERVATIONS_SUCCESS,
  GET_RESERVATIONS_FAIL,
  GET_RESERVATION_REQUEST,
  GET_RESERVATION_SUCCESS,
  GET_RESERVATION_FAIL,
  CREATE_RESERVATION_REQUEST,
  CREATE_RESERVATION_SUCCESS,
  CREATE_RESERVATION_FAIL,
  UPDATE_RESERVATION_REQUEST,
  UPDATE_RESERVATION_SUCCESS,
  UPDATE_RESERVATION_FAIL,
  DELETE_RESERVATION_REQUEST,
  DELETE_RESERVATION_SUCCESS,
  DELETE_RESERVATION_FAIL
} from '../constants/reservationConstants';


export const reservationListReducer = (state = { reservations: [] }, action)=>{
  switch (action.type) {
    case GET_RESERVATIONS_REQUEST:
      return { loading: true, reservations: [] }
    case GET_RESERVATIONS_SUCCESS:
      return {
        loading: false,
        reservations: action.payload.data,
      }
    case GET_RESERVATIONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reservationDetailsReducer = (
  state = { reservation: []  },
  action
) => {
  switch (action.type) {
    case GET_RESERVATION_REQUEST:
      return { ...state, loading: true }
    case GET_RESERVATION_SUCCESS:
      return { loading: false, reservation: action.payload.data }
    case GET_RESERVATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const reservationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RESERVATION_REQUEST:
      return { loading: true }
    case DELETE_RESERVATION_SUCCESS:
      return { loading: false, success: true}
    case DELETE_RESERVATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reservationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_RESERVATION_REQUEST:
      return { loading: true }
    case CREATE_RESERVATION_SUCCESS:
      return { loading: false, success: true, reservation: action.payload}
    case CREATE_RESERVATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const reservationUpdateReducer = (state = { reservation: {} }, action) => {
  switch (action.type) {
    case UPDATE_RESERVATION_REQUEST:
      return { loading: true }
    case UPDATE_RESERVATION_SUCCESS:
      return { loading: false, success: true, reservation: action.payload.data }
    case UPDATE_RESERVATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


