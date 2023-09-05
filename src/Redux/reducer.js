import {
  ADD_LOGIN_STATUS,
  ADD_USER_DATA_LOGIN,
  ADD_USER_DATA_LOGIN_FAIL,
  ADD_USER_DATA_SIGNUP,
  ADD_USER_DATA_SIGNUP_FAIL,
  GET_ITEMS_ERROR,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
  items: [],
  userData: [],
  isLogin: false,
  isSignup: false,
  signUp_res: {},
  login_res: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        items: action.payload,
      };
    }
    case GET_ITEMS_ERROR: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }
    case ADD_USER_DATA_LOGIN: {
      return {
        ...state,
        login_res: action.payload,
      };
    }
    case ADD_USER_DATA_LOGIN_FAIL: {
      return {
        ...state,
        isLogin: false,
      };
    }
    case ADD_USER_DATA_SIGNUP: {
      return {
        ...state,
        isSignup: true,
        signUp_res: action.payload,
      };
    }
    case ADD_USER_DATA_SIGNUP_FAIL: {
      return {
        ...state,
        isSignup: false,
      };
    }
    case ADD_LOGIN_STATUS: {
      return {
        ...state,
        isLogin: false,
      };
    }
  }

  return state;
};
