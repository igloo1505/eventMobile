import { REGISTER_EVENT, EVENT_ERROR } from "./Types";

const initialState = {
  hasCreatedEvent: false,
  createdEvent: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_EVENT:
      return {
        ...state,
        hasCreatedEvent: true,
        createdEvent: action.payload,
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
