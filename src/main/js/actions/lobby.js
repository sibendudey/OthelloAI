import React from 'react';
import {Sweetalert} from 'sweetalert';
import configureStore from "../store";

const store = configureStore;

export function fetchGames(lobbyClient) {
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
            error: function (error) {
                console.log(error);
            }
        });
    }
}

export function getStats(lobbyClient, userid) {
    $.ajax("/game/stats/" + userid, {
        type: "GET",
        contentType: "application/json",
        success: function (resp) {
            store.dispatch({
                type: "SET_STATISTICS",
                stats: resp
            });
        },
        error: function (error) {
            console.log("Error while fetching stats");
        }
    });
}