
export default function session(state = {}, action) {
    switch(action)  {
        case 'set_session':
            return Object.assign({}, state, action.userName);
        case 'remove_session':
            return {};
        default:
            return state;
    }
}