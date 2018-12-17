import {UPDATE_LOGIN_FORM} from "./LoginActions";

var initialState = {}
export function registerForm(state = initialState, action)  {
  switch (action.type)  {
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({}, state, action.register);
    default:
      return state;
  }
}

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
