export default function gameStats(state = {}, action)   {
    switch (action.type) {
        case "SET_GAME_STATS" :
            return Object.assign({}, {gameStats:  action.gameStats});
        default:
            return state;
    }
}