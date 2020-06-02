import {
  SET_USER,
  SET_LOADING,
  USER_ERROR,
  LOGIN,
  EDIT_ACCESS,
  REGISTER_USER,
  REGISTER_ADMIN,
  CHANGE_VIEW,
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
export const loadUser = () => async (dispatch) => {
  setAuthToken(AsyncStorage.token);
  try {
    const res = await axios.get("/auth");
    dispatch({
      type: SET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({ type: USER_ERROR, payload: err });
  }
};

export const setTriedAutoLogin = () => {
  dispatch({ type: TRIED_AUTO_LOGIN });
};

export const submitNewUser = (user) => async (dispatch) => {
  // debugger;
  setLoading();
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
    // loadUser();
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
export const submitNewAdminUser = (user) => async (dispatch) => {
  setLoading();
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
    // loadUser();
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

export const editUserAccess = ({ orgInfo }) => async (dispatch) => {
  const res = await axios.put(
    `/organizations/${orgInfo.organizationReference}`,
    orgInfo,
    config
  );

  try {
    dispatch({
      type: EDIT_ACCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};

export const loginUser = (user) => async (dispatch) => {
  console.log("logging in as ", user);
  try {
    console.log("serverRoot", `${appConstants.serverRoot}/auth`);
    const res = await axios.post(
      `${appConstants.serverRoot}/auth`,
      user,
      config
    );
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
    // loadUser();
  } catch (err) {
    console.error(err);
    dispatch({
      type: USER_ERROR,
      payload: err,
    });
  }
};

export const setMenuView = (key) => (dispatch) =>
  dispatch({
    type: CHANGE_VIEW,
    payload: key,
  });

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const logOut = () => async (dispatch) => dispatch({ type: LOGOUT });
