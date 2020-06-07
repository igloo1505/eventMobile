import {
  SET_LOADING,
  USER_ERROR,
  LOGIN,
  REGISTER_USER,
  REGISTER_ADMIN,
  LOGOUT,
  TRIED_AUTO_LOGIN,
} from "./Types";
import appConstants from "../constants/AppConstants";
import axios from "axios";
import setAuthToken from "../setToken";
import { AsyncStorage, Alert } from "react-native";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const setTriedAutoLogin = () => {
  dispatch({ type: TRIED_AUTO_LOGIN });
};

export const submitNewUser = (user) => async (dispatch) => {
  // debugger;
  setLoading(true);
  try {
    const res = await axios.post(
      `${appConstants.serverRoot}/registerUser/user`,
      user,
      config
    );
    console.log("res", res);
    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
export const submitNewAdminUser = (user) => async (dispatch) => {
  setLoading(true);
  try {
    const res = await axios.post(
      `${appConstants.serverRoot}/registerUser/userAdmin`,
      user,
      config
    );
    console.log("res", res);
    dispatch({
      type: REGISTER_ADMIN,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};

export const switchToAdminRegister = (data) => async (dispatch) => {
  console.log(data);
  dispatch({
    type: SWITCH_TO_ADMIN_REGISTER,
    payload: data,
  });
};

export const loginUser = (user) => async (dispatch) => {
  console.log("logging in as ", user);
  setLoading(true);
  try {
    console.log("serverRoot", `${appConstants.serverRoot}/auth`);
    const res = await axios.post(
      `${appConstants.serverRoot}/auth`,
      user,
      config
    );
    console.log(res);
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: USER_ERROR,
      payload: err.msg,
    });
  }
};

export const setLoading = (loadingState) => {
  return {
    type: SET_LOADING,
    payload: loadingState,
  };
};

export const logOut = () => async (dispatch) => dispatch({ type: LOGOUT });
