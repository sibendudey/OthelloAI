const initialState = {
    games: [],
    lobby: null,
    playerName: null
};

export default function reducer(state = initialState, action = {}) {
    if (action.type === "current_games_set") {
        return Object.assign({}, state, {
            games: action.games,
            lobbyClient: action.lobbyClient
        });
    } else {
        return state;
    }
}