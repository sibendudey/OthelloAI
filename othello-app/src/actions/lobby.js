import React from 'react';
import Sweetalert from 'sweetalert';
import $ from 'jquery';
import {BASE_URL} from "../BaseUrl";

export function fetchGames(lobbyClient) {
    return (dispatch, getState) => {
        lobbyClient.subscribe('/games/newGame', function (resp) {
            dispatch({
                type: "current_games_set",
                games: JSON.parse(resp.body),
            });
        });

        $.ajax(BASE_URL + "/game/fetchGames", {
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

export const getStats = (lobbyClient, userid) => (dispatch) => {
    $.ajax("/user/stats/" + userid, {
        type: "GET",
        contentType: "application/json",
        success: function (resp) {
            dispatch({
                type: "SET_GAME_STATS",
                gameStats: resp
            });
            // dispatch(push('/stats'));
        },
        error: function (error) {
            console.log("Error while fetching stats");
        }
    });
};