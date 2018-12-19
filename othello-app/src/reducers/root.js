import { combineReducers }  from 'redux';
import lobby                 from './lobby';
import game                 from './game';
import chat                 from './chat';
import gameStats from './gameStats';
import {loginForm as login, profile, registerForm as register} from './index';
import {registrationFormReducer} from "../components/register_form/RegistrationFormReducers";
import {loginForm} from "../components/login_form/LoginReducers";
import {navigationBarReducer} from "../components/navigation_bar/NavigationBarReducer";
import {profilePageReducer} from "../components/profile_page/ProfilePageReducers";
import {createGameReducer} from "../components/create_game/CreateGameReducer";

export default combineReducers({
    lobby,
    game,
    chat,
    register: registrationFormReducer,
    login: loginForm,
    profile: profilePageReducer,
    createGame: createGameReducer,
    gameStats,
    navigationBar: navigationBarReducer,
});
