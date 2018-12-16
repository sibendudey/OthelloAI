var initialState = {}
export function registerForm(state = initialState, action)  {
  switch (action.type)  {
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({}, state, action.register);
    default:
      return state;
  }
}

export function loginForm(state = initialState, action) {
  switch (action.type)    {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.login);
    default:
      return state;
  }
}
