import $ from 'jquery';
import {BASE_URL} from "../../BaseUrl";

export const UPDATE_CREATE_GAME_FORM = 'UPDATE_CREATE_GAME_FORM';
export const updateCreateGameForm = (obj) => (dispatch) => {
    dispatch({
      type: UPDATE_CREATE_GAME_FORM,
      obj,
    });
};

export const createGame = (history) => (dispatch, getState) => {
  const state = getState();
  const userid = state.profile.id;
  const gameName = state.createGame.gamename;
  $.ajax({
    url: BASE_URL + "/api/games/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({"gameName": gameName, "player1": "api/users/" + userid}),
    success: function (resp) {
      history.push("/games/" + resp.id);
    },
    error: function (error) {
      console.log(error);
    }
  });
};