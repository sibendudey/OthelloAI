import configureStore from "../store";

const store  = configureStore;

export function registerForGame(gameChannel) {
    return (dispatch) => {
        gameChannel.push("games:register_for_game").receive("ok", payload => {
            dispatch({
                type: "fetch_game_data",
                gameData: payload.gameData,
                gameChannel: gameChannel
            });
        });

        gameChannel.on("update_game", payload => {
            dispatch({
                type: "fetch_game_data",
                gameData: payload.gameData,
                gameChannel: gameChannel
            });
        });
    }
}

export function markSquare(i, j, gameChannel)    {
    var obj = {i: i, j: j}
    return dispatch => {
        gameChannel.push("games:mark_square", obj).receive("ok", payload => {})
    }
}

export function newGame(gameName,userid,history)   {
    $.ajax({
        // url: "/game/newgame",
        url: "/api/games/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"gameName": gameName, "player1": "api/users/" + userid}),
        success: function (resp) {
            console.log(resp);
            delete resp["_links"];
            store.dispatch({
                type: "new_game_created",
                gameData: resp,
            });
            history.push("/games/" + gameName);
        },
        error: function(error)   {
            console.log(error);
        }
    });
}

export function subscribeToGameChanges(lobbyClient, gameName)    {
    lobbyClient.subscribe('/games/' + gameName, function (resp) {
        dispatch({
            type: "fetch_game_data",
            gameData: JSON.parse(resp.body),
        });
    });
}

export function fetchGameData(gameName) {
    $.ajax({
        url: "/games/" + gameName,
        type: "GET",
        success: function (resp) {
            dispatch({
                type: "new_game_created",
                gameData: JSON.parse(resp),
            });
            history.push("/games/" + gameName);
        },
        error: function(error)   {
            console.log(error);
        }
    });
}