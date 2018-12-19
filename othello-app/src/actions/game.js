
import $ from 'jquery';
import {BASE_URL} from "../BaseUrl";

export function joinGame(gameid, userid, history) {
    $.ajax({
        url: BASE_URL + "/api/games/" + gameid,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify({"player2": "api/users/" + userid}),
        success: function (resp) {
            console.log(resp);
            delete resp["_links"];
            // store.dispatch({
            //     type: "new_game_created",
            //     gameData: resp,
            // });
            history.push("/games/" + gameid);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

export function spectateGame(history, gameid) {
    history.push("/games/" + gameid);
}

export function markSquare(i, j, gameid) {
    let obj = {i: i, j: j, id: gameid};
    $.ajax({
        url: BASE_URL +  "/game/markSquare",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (resp) {

        },
        error: function (error) {
        
        }
    });
}

export const newGame = (gameName, userid) => (dispatch) => {
    $.ajax({
        url: "/api/games/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({"gameName": gameName, "player1": "api/users/" + userid}),
        success: function (resp) {
            delete resp["_links"];
            dispatch({
                type: "new_game_created",
                gameData: resp,
            });
            // dispatch(push("/games/" + resp.id));
        },
        error: function (error) {
            console.log(error);
        }
    });
};

export function subscribeToGameChanges(lobbyClient, gameid) {
    return (dispatch) => {
        lobbyClient.subscribe('/games/' + gameid, function (resp) {
            console.log("Game data updated: ", resp.body);
            dispatch({
                type: "fetch_game_data",
                gameData: JSON.parse(resp.body),
            });
        });
    }
}

export function fetchGameData(gameid) {
    return (dispatch) => {
        $.ajax({
            url: BASE_URL + "/api/games/" + gameid,
            type: "GET",
            success: function (resp) {
                dispatch({
                    type: "fetch_game_data",
                    gameData: resp,
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}