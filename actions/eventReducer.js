import {
  REGISTER_EVENT,
  EVENT_ERROR,
  GET_BY_NEIGHBORHOOD,
  RESET_EVENT_STATE,
  NO_EVENTS_FOUND,
  SET_EVENT_LOADING,
} from "./Types";

const initialState = {
  hasCreatedEvent: false,
  createdEvent: null,
  neighborhoodHasData: false,
  filteredByNeighborhood: null,
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
      return {
        ...state,
        neighborhoodHasData: true,
        filteredByNeighborhood: action.payload,
        loading: false,
      };
    case NO_EVENTS_FOUND:
      return {
        ...state,
        neighborhoodHasData: false,
        filteredByNeighborhood: null,
        loading: false,
      };
    case RESET_EVENT_STATE:
      return {
        ...state,
        hasCreatedEvent: false,
        createdEvent: null,
        neighborhoodHasData: false,
        filteredByNeighborhood: null,
        loading: false,
        error: null,
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
