import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import lobby                 from './lobby';
import game                 from './game';
import chat                 from './chat';
import gameStats from './gameStats';
import {loginForm as login, profile, registerForm as register} from './index';

export default combineReducers({
    routing: routerReducer,
    lobby,
    game,
    chat,
    register,
    login,
    profile,
    gameStats,
});
