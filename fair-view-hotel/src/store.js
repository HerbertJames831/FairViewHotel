// store.js is used to store user login in details for the app namely the staus of wether the user is logged in or not in this app and the customer_id as it is used in multiple functions
import { createStore } from 'redux';

// Initial state
const initialState = {
  loggedIn: false,
  user: null,
  error: null,
  customer_id: null,
};

// Reducer
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loggedIn: true,
        user: action.payload.customerId,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loggedIn: false,
        user: null,
        error: action.payload.error,
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        user: null,
        error: null,
      };
    // Add a new case to handle setting customer_id
    case 'SET_CUSTOMER_ID':
      return {
        ...state,
        customer_id: action.payload.customerId,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(loginReducer);

export default store;
