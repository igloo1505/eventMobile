import {
  REGISTER_EVENT,
  EVENT_ERROR,
  GET_BY_NEIGHBORHOOD,
  RESET_EVENT_STATE,
  NO_EVENTS_FOUND,
  SET_EVENT_LOADING,
} from "./Types";
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
  setLoading(true);
  try {
    const res = await Axios.post(
      `${AppConstants.serverRoot}/events/create`,
      eventData,
      config
    );
    setLoading(false);
    dispatch({
      type: REGISTER_EVENT,
      payload: res.data,
    });
  } catch (error) {
    setLoading(false);
    dispatch({
      type: EVENT_ERROR,
      payload: error.response,
    });
  }
};

export const getByNeighborhood = (hood) => async (dispatch) => {
  console.log("running get by neighborhood");
  try {
    const res = await Axios.get(
      `${AppConstants.serverRoot}/byNeighborhood/${hood}`
    );
    // setLoading(false);
    dispatch({
      type: GET_BY_NEIGHBORHOOD,
      payload: res.data,
    });
  } catch (error) {
    if (error.response.data.msg === "No Events located for that neighborhood") {
      dispatch({
        type: NO_EVENTS_FOUND,
      });
    } else {
      dispatch({
        type: EVENT_ERROR,
        payload: error.response,
      });
    }
  }
};

export const setEventLoading = (loadingState) => (dispatch) => {
  dispatch({
    type: SET_EVENT_LOADING,
    payload: loadingState,
  });
};

export const resetEventState = () => (dispatch) => {
  dispatch({
    type: RESET_EVENT_STATE,
  });
};
