import { combineReducers } from "redux";
import userReducer from "./actions/userReducer";
import layoutReducer from "./actions/layoutReducer";
import eventReducer from "./actions/eventReducer";

export default combineReducers({
  user: userReducer,
  event: eventReducer,
  layout: layoutReducer,
});
