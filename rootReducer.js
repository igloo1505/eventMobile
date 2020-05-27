import { combineReducers } from "redux";
import userReducer from "./actions/userReducer";
import layoutReducer from "./actions/layoutReducer";

export default combineReducers({
  user: userReducer,
  layout: layoutReducer,
});
