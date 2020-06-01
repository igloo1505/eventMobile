import { TOGGLE_OVERLAY, SIGN_UP_FORM } from "./Types";

const initialState = {
  visible: false,
  signUpForm: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OVERLAY:
      return {
        ...state,
        visible: !visible,
      };
    case SIGN_UP_FORM: {
      return {
        ...state,
        signUpForm: !state.signUpForm,
      };
    }
    default:
      return state;
  }
};
