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
  const { gamename, gameType }  = state.createGame;
  $.ajax({
    url: BASE_URL + "/game/createGame/",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({"gameName": gamename, "userId": userid, "gameType": gameType}),
    success: function (resp) {
      history.push("/games/" + resp.id);
    },
    error: function (error) {
      console.log(error);
    }
  });
};