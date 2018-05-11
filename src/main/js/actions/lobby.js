import React from 'react';

// Attribution.
// I would like to attribute this idea of showing the list
// of games in the lobby page to the underlined link.
// https://github.com/bigardone/phoenix-battleship
export function fetchGames(lobbyClient, socket)  {
    return dispatch => {
        lobbyClient.connect({}, function (frame) {
            lobbyClient.subscribe('/games/newGame', function (resp) {
                dispatch({
                    type: "current_games_set",
                    games: JSON.parse(resp.body),
                    lobbyClient: lobbyClient
                });
            });
        });

        $.ajax("/game/fetchGames", {
            url: "/game/fetchGames",
            type: "GET",
            contentType: "application/json",
            success: function (resp) {
                console.log("Response received", resp);
                dispatch({
                    type: "current_games_set",
                    games: resp,
                    lobbyClient: lobbyClient
                })
            },
            error: function(error)   {
                console.log(error);
            }
        });
        // stompClient.subscribe('/game/fetchGames', function (games) {
        //     dispatch({
        //         type: "current_games_set",
        //         games: games,
        //         lobby: lobby
        //     });
        // });

        // lobbyChannel.push("lobby:current_games").receive( "ok", payload => {
        //     dispatch({
        //         type: "current_games_set",
        //         games: payload.current_games,
        //         lobby: lobbyChannel
        //     });
        // });
    }
}