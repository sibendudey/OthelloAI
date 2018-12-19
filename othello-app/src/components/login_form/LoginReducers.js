import {UPDATE_LOGIN_FORM} from "./LoginActions";

const INITIAL_STATE = {
  emailid: '',
};

export function loginForm(state = INITIAL_STATE, action) {
  switch (action.type)    {
    case UPDATE_LOGIN_FORM:
      return {...state, emailid: action.emailid};
    default:
      return state;
  }
}
