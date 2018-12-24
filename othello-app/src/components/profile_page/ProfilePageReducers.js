import {RESET_PROFILE, SET_PROFILE} from "./ProfilePageActions";

export function profilePageReducer(state = null, action) {
  switch (action.type)    {
    case SET_PROFILE:
      return Object.assign({}, action.profile);
    case RESET_PROFILE:
      return null;
    default:
      return state;
  }
}
