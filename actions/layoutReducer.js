import { TOGGLE_OVERLAY } from "./Types";

const initialState = {
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OVERLAY:
      return {
        ...state,
        visible: !visible,
      };
    default:
      return state;
  }
};
