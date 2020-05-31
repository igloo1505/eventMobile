import {
  SET_USER,
  SET_LOADING,
  EDIT_ACCESS,
  LOGIN,
  REGISTER_ADMIN,
  CHANGE_VIEW,
  LOGOUT,
  TRIED_AUTO_LOGIN,
  AUTHENTICATED,
} from "./Types";

import { loadUser } from "./userActions";
import setAuthToken from "../setToken";
import { AsyncStorage } from "react-native";

const initialState = {
  loggedIn: false,
  token: AsyncStorage.getItem("token"),
  leaders: null,
  loading: false,
  admin: false,
  user: null,
  triedAutoLogin: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_VIEW:
      return {
        ...state,
        menuKey: action.payload,
      };

    case REGISTER_ADMIN:
      const { token, user } = action.payload;
      setAuthToken(token);

      AsyncStorage.setItem("token", token);
      return {
        ...state,
        loggedIn: true,
        user: user,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        loading: false,
      };
    case TRIED_AUTO_LOGIN:
      return {
        ...state,
        triedAutoLogin: true,
      };
    case LOGIN:
      console.log("payload", action.payload);
      AsyncStorage.setItem("token", action.payload.token);
      // loadUser();

      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loggedIn: true,
        triedAutoLogin: true,
        loading: false,
      };

    case EDIT_ACCESS:
      return {
        ...state,
        organization: action.payload,
        loading: false,
      };
    case LOGOUT:
      AsyncStorage.removeItem("token");
      return {
        ...state,
        loggedIn: false,
        leaders: null,
        admin: false,
        user: null,
        triedAutoLogin: false,
        error: null,
        loading: false,
      };

    case AUTHENTICATED:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
