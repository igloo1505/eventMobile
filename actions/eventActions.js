import { REGISTER_EVENT, EVENT_ERROR } from "./Types";
import AppConstants from "../constants/AppConstants";
import Axios from "axios";
import { setLoading } from "./userActions";
import { AsyncStorage } from "react-native";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const registerEvent = (eventData) => async (dispatch) => {
  console.log(AsyncStorage.getItem("token"));
  setLoading(true);
  try {
    const res = await Axios.post(
      `${AppConstants.serverRoot}/events/create`,
      eventData,
      config
    );
    console.log("res", res);
    dispatch({
      type: REGISTER_EVENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_ERROR,
      payload: error,
    });
  }
};
