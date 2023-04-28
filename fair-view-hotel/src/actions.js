// actions.js used in cinjunction with store.js to handle the logged in status and customer id in the app after logging in
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_CUSTOMER_ID = 'SET_CUSTOMER_ID';

// Action creators
export const loginSuccess = (customerId) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { customerId }
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: { error }
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

// Action creator for setting customer_id
export const setCustomerId = (customerId) => {
  return {
    type: SET_CUSTOMER_ID,
    payload: { customerId }
  };
};
