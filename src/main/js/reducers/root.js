import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import lobby                 from './lobby';
import game                 from './game';
import chat                 from './chat';
import {loginForm as login, registerForm as register} from './index';

export default combineReducers({
    routing: routerReducer,
    lobby: lobby,
    game: game,
    chat: chat,
    register: register,
    login: login
});
