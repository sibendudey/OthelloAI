import { combineReducers }  from 'redux';
import { routerReducer }    from 'react-router-redux';
import lobby                 from './lobby';
import game                 from './game';
import chat                 from './chat';


// export default combineReducers({
//   routing: routerReducer,
//   lobby: lobby,
//   game: game,
//   chat: chat,
// });

var initialState = {}
export function registerForm(state = initialState, action)  {
    switch (action.type)  {
        case 'UPDATE_FORM':
          return Object.assign({}, action.register);
        default:
          return initialState;
    }
}
