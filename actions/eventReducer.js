import {
  REGISTER_EVENT,
  EVENT_ERROR,
  GET_BY_NEIGHBORHOOD,
  RESET_EVENT_STATE,
  GET_ALL_EVENTS,
  NO_EVENTS_FOUND,
  RESET_EVENT_ARRAY,
  SET_EVENT_LOADING,
} from "./Types";

const initialState = {
  hasCreatedEvent: false,
  createdEvent: null,
  neighborhoodHasData: null,
  returnedEvents: [],
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case REGISTER_EVENT:
      return {
        ...state,
        hasCreatedEvent: true,
        createdEvent: action.payload,
        loading: false,
      };
    case GET_BY_NEIGHBORHOOD:
      console.log("From By Neighborhood", action.payload);
      return {
        ...state,
        neighborhoodHasData: true,
        returnedEvents: action.payload.EventsArrays,
        loading: false,
      };
    case GET_ALL_EVENTS:
      console.log("from get all events", action.payload);
      return {
        ...state,
        neighborhoodHasData: true,
        returnedEvents: action.payload.eventsArray,
        loading: false,
      };
    case NO_EVENTS_FOUND:
      return {
        ...state,
        neighborhoodHasData: false,
        returnedEvents: [],
        loading: false,
      };
    case RESET_EVENT_STATE:
      return {
        ...state,
        hasCreatedEvent: false,
        createdEvent: null,
        neighborhoodHasData: null,
        returnedEvents: [],
        loading: false,
        error: null,
      };
    case RESET_EVENT_ARRAY:
      return {
        ...state,
        returnedEvents: [],
        loading: false,
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
