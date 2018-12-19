import {UPDATE_LOGIN_FORM} from "../login_form/LoginActions";
import {UPDATE_CREATE_GAME_FORM} from "./CreateGameActions";

const INITIAL_STATE = {
  gamename: '',
};

export function createGameReducer(state = INITIAL_STATE, action) {
  switch (action.type)    {
    case UPDATE_CREATE_GAME_FORM:
      return {...state, ...action.obj};
    default:
      return state;
  }
}
