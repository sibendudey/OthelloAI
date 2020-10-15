import {UPDATE_CREATE_GAME_FORM} from "./CreateGameActions";

const INITIAL_STATE = {
  gamename: '',
  gameType: 'OneVsAI'
};

export function createGameReducer(state = INITIAL_STATE, action) {
  switch (action.type)    {
    case UPDATE_CREATE_GAME_FORM:
      console.log(action);
      return {...state, ...action.obj};
    default:
      return state;
  }
}
