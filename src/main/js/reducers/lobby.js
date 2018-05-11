const initialState = {
    games: [],
    lobby: null,
    playerName: null
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "current_games_set":
            return Object.assign({}, state, {
                games: action.games,
                lobbyClient: action.lobbyClient
            });
        default:
            return Object.assign({}, state, {games: []});
    }
}