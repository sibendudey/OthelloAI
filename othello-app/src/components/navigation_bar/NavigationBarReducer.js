import {UPDATE_SELECTED} from "./NavigationBarActions";

const INITIAL_STATE = {
  loggedOffTabs: [
  {
    tabName: 'Login',
    tabUrl: '/login',
  },
  {
    tabName: 'Register',
    tabUrl: '/register',
  },
  ],
  loggedInTabs: [
    {
      tabName: 'Profile',
      tabUrl: '/profile',
    },
    {
      tabName: 'Lobby',
      tabUrl: '/lobby',
    },
    {
      tabName: 'Play a game',
      tabUrl: '/create_game',
    },
    {
      tabName: 'Logout',
      tabUrl: '/logout'
    }
  ],
  
  selectedValue: 'Home',
};

export const navigationBarReducer = (state = INITIAL_STATE, action ) => {
  switch (action.type)  {
    case UPDATE_SELECTED:
      return {...state, selectedValue: action.selectedValue};
    default:
      return state;
  };
};