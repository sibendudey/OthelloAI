import React from 'react';

export function fetchGames(lobbyClient)  {
    return dispatch => {
            lobbyClient.subscribe('/games/newGame', function (resp) {
                dispatch({
                    type: "current_games_set",
                    games: JSON.parse(resp.body),
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
                })
            },
            error: function(error)   {
                console.log(error);
            }
        });
    }
}