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
  setLoading(true);
  try {
    const res = await axios.post(
      `${appConstants.serverRoot}/registerUser/user`,
      user,
      config
    );

    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response,
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

    dispatch({
      type: REGISTER_ADMIN,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response,
    });
  }
};

export const switchToAdminRegister = (data) => async (dispatch) => {
  dispatch({
    type: SWITCH_TO_ADMIN_REGISTER,
    payload: data,
  });
};

export const loginUser = (user) => async (dispatch) => {
  setLoading(true);
  try {
    const res = await axios.post(
      `${appConstants.serverRoot}/auth`,
      user,
      config
    );

    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response,
    });
  }
};

export const setLoading = (loadingState) => async (dispatch) => {
  console.log("setting loading as", loadingState);
  dispatch({
    type: SET_LOADING,
    payload: loadingState,
  });
};

export const logOut = () => async (dispatch) => dispatch({ type: LOGOUT });
