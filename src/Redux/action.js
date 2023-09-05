import axios from "axios";

import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  ADD_USER_DATA_LOGIN,
  ADD_USER_DATA_LOGIN_FAIL,
  ADD_USER_DATA_SIGNUP,
  ADD_USER_DATA_SIGNUP_FAIL,
  ADD_LOGIN_STATUS,
} from "./actionType";

export const getData = (inputValue, findActive, findType, sortValue) => {
  return function (dispatch, getState) {
    let url = `https://api.spacexdata.com/v3/capsules`;

    dispatch({
      type: GET_ITEMS_REQUEST,
    });

    if (inputValue) {
      url += `?capsule_serial=${inputValue}`;
    } else {
      if (findActive) {
        url += `?status=active`;
      }
      if (findType) {
        findActive
          ? (url += `&type=${findType}`)
          : (url += `?type=${findType}`);
      }
      if (sortValue) {
        findActive
          ? (url += `&sort=capsule_serial&order=${sortValue}`)
          : (url += `?sort=capsule_serial&order=${sortValue}`);
      }
    }

    axios
      .get(url)
      .then((res) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_ERROR,
        });
      });
  };
};

export const postUser = (inputValues) => {
  return function (dispatch, getState) {
    axios
      .post("https://brainstormbackend.onrender.com/user/login", inputValues)
      .then((res) => {
        dispatch({
          type: ADD_USER_DATA_LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_USER_DATA_LOGIN_FAIL,
        });
      });
  };
};

export const addUser = (inputValues) => {
  return function (dispatch, getState) {
    axios
      .post("https://brainstormbackend.onrender.com/user/signup", inputValues)
      .then((res) => {
        dispatch({
          type: ADD_USER_DATA_SIGNUP,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_USER_DATA_SIGNUP_FAIL,
        });
      });
  };
};

export const logOut = () => {
  return function (dispatch, getState) {
    dispatch({
      type: ADD_LOGIN_STATUS,
    });
  };
};
