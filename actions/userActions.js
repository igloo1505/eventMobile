import {
  SET_USER,
  SET_LOADING,
  USER_ERROR,
  LOGIN,
  EDIT_ACCESS,
  REGISTER_ADMIN,
  CHANGE_VIEW,
  LOGOUT,
} from "./Types";

import axios from "axios";
import setAuthToken from "../setToken";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const loadUser = () => async (dispatch) => {
  setAuthToken(localStorage.token);
  try {
    const res = await axios.get("/auth");
    dispatch({
      type: SET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
};

export const setNewUser = (user) => async (dispatch) => {
  setLoading();

  try {
    const res = await axios.post("/users", user, config);

    dispatch({
      type: REGISTER_ADMIN,
      payload: res.data,
    });
    loadUser();
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
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
  try {
    const res = await axios.post("/auth", user, config);
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.msg,
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
