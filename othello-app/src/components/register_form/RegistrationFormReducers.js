import {REGISTRATION_SUCCESS, UPDATE_REGISTER_FORM} from "./RegisterFormActions";

const INITIAL_STATE = {
  regSuccess: false,
  regError: false,
  username: '',
  emailid: '',
};

export const registrationFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type)  {
    case UPDATE_REGISTER_FORM:
      return {...state, ...action.registrationData};
    case REGISTRATION_SUCCESS:
      return {...state, regSuccess: true};
    default:
      return state;
  }
};