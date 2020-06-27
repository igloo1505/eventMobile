import {
  REGISTER_EVENT,
  EVENT_ERROR,
  GET_BY_NEIGHBORHOOD,
  GET_ALL_EVENTS,
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
      console.log(error.response);
      dispatch({
        type: EVENT_ERROR,
        payload: error.response,
      });
    }
  }
};

export const getAllEvents = () => async (dispatch) => {
  console.log("running get all events");
  try {
    const res = await Axios.get(
      `${AppConstants.serverRoot}/byNeighborhood/getAllEvents`
    );
    dispatch({
      type: GET_ALL_EVENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: NO_EVENTS_FOUND,
    });
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

export const getDateDifference = (UTC) => {
  let daysConstant = 1000 * 60 * 60 * 24;
  let hoursConstant = 1000 * 60 * 60;
  let minutesConstant = 1000 * 60;
  let secondConstant = 1000;
  let now = Date.now();
  let difference = UTC - now;
  let days = Math.floor(difference / daysConstant);
  let afterDays = difference % daysConstant;
  let hours = Math.floor(afterDays / hoursConstant);
  // if(hours < 10) {
  //   hours = `0${hours}`
  // }
  let afterHours = afterDays % hoursConstant;
  let minutes = Math.floor(afterHours / minutesConstant);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let afterMinutes = afterHours % minutesConstant;
  let seconds = Math.floor(afterMinutes / secondConstant);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (days > 0) {
    return `${days} days, ${hours} hours`;
  } else if (days === 0 && hours !== 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else if (days === 0 && hours === 0) {
    return `${minutes}:${seconds}`;
  } else if (days < 0) {
    return `This event has passed`;
  }
};
