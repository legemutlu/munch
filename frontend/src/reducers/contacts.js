import {
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_CONTACT_REQUEST,
  GET_CONTACT_SUCCESS,
  GET_CONTACT_FAIL,
  CREATE_CONTACT_REQUEST,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL
} from '../constants/contactConstants';


export const contactListReducer = (state = { contacts: [] }, action)=>{
  switch (action.type) {
    case GET_CONTACTS_REQUEST:
      return { loading: true, contacts: [] }
    case GET_CONTACTS_SUCCESS:
      return {
        loading: false,
        contacts: action.payload.data,
      }
    case GET_CONTACTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const contactDetailsReducer = (
  state = { contact: []  },
  action
) => {
  switch (action.type) {
    case GET_CONTACT_REQUEST:
      return { ...state, loading: true }
    case GET_CONTACT_SUCCESS:
      return { loading: false, contact: action.payload.data }
    case GET_CONTACT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const contactDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CONTACT_REQUEST:
      return { loading: true }
    case DELETE_CONTACT_SUCCESS:
      return { loading: false, success: true}
    case DELETE_CONTACT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const contactCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONTACT_REQUEST:
      return { loading: true }
    case CREATE_CONTACT_SUCCESS:
      return { loading: false, success: true, contact: action.payload}
    case CREATE_CONTACT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const contactUpdateReducer = (state = { contact: {} }, action) => {
  switch (action.type) {
    case UPDATE_CONTACT_REQUEST:
      return { loading: true }
    case UPDATE_CONTACT_SUCCESS:
      return { loading: false, success: true, contact: action.payload.data }
    case UPDATE_CONTACT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


