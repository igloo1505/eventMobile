import {
  SET_USER,
  SET_LOADING,
  EDIT_ACCESS,
  LOGIN,
  REGISTER_USER,
  REGISTER_ADMIN,
  SWITCH_TO_ADMIN_REGISTER,
  USER_ERROR,
  CHANGE_VIEW,
  LOGOUT,
  TRIED_AUTO_LOGIN,
  AUTHENTICATED,
} from "./Types";
import setAuthToken from "../setToken";
import { AsyncStorage } from "react-native";

const initialState = {
  loggedIn: false,
  token: AsyncStorage.getItem("token"),
  leaders: null,
  loading: false,
  admin: false,
  user: null,
  userAdminDataHolder: null,
  triedAutoLogin: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case REGISTER_USER:
      setAuthToken(action.payload.token);
      AsyncStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loggedIn: true,
        user: user,
        loading: false,
      };
    case SWITCH_TO_ADMIN_REGISTER:
      return {
        ...state,
        userAdminDataHolder: action.payload,
        loading: false,
      };

    case REGISTER_ADMIN:
      setAuthToken(action.payload.token);
      AsyncStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
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
      setAuthToken(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loggedIn: true,
        triedAutoLogin: true,
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
    case USER_ERROR:
      console.error("at reducer...", action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
