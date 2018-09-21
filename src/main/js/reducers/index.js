var initialState = {}
export function registerForm(state = initialState, action)  {
    switch (action.type)  {
        case 'UPDATE_REGISTER_FORM':
          return Object.assign({}, state, action.register);
        default:
          return state;
    }
}

let initial_login = {
    emailid: "",
}


export function loginForm(state = initialState, action) {
    switch (action.type)    {
        case 'UPDATE_LOGIN_FORM':
            return Object.assign({}, state, action.login);
        default:
            return state;
    }
}

export function profile(state = null, action) {
    switch (action.type)    {
        case 'SET_PROFILE':
            return Object.assign({}, action.profile);
        default:
            return state;
    }
}
