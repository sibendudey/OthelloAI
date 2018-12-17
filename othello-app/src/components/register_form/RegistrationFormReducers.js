import {REGISTRATION_SUCCESS} from "./RegisterFormActions";

const INITIAL_STATE = {
  regSuccess: false,
  regError: false,
};

export const registrationFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type)  {
    case REGISTRATION_SUCCESS:
      return {...state, regSuccess: true};
    default:
      return state;
  }
};