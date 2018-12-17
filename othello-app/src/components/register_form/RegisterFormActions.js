import SockJS from "sockjs-client";
import {Stomp} from "stompjs/lib/stomp";
import $ from 'jquery';
import {BASE_URL} from "../../BaseUrl";
import {profileSuccess} from "../profile_page/ProfilePageActions";
export const registration = (form) => (dispatch, getState) => {
  const form = getState().register;
  $.ajax({
    url: BASE_URL + "/api/users",
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({userName: form.username, email: form.emailid}),
    success: function (resp) {
      const socket = new SockJS(BASE_URL + '/gs-guide-websocket');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        dispatch(profileSuccess(resp, stompClient));
      });
    },
    error: function (err) {
      error(err);
    }
  });
};

export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const success = () => (dispatch) => {
  dispatch({
    type: REGISTRATION_SUCCESS,
  });
};

export const REGISTRATION_ERROR = 'REGISTRATION_SUCCESS';
export const error = () => (dispatch) => {
  dispatch({
    type: REGISTRATION_ERROR,
  });
};

export const UPDATE_REGISTER_FORM = 'UPDATE_REGISTER_FORM';

export const updateRegisterForm = (data) => (dispatch) => {
  dispatch({
    type: 'UPDATE_REGISTER_FORM',
    registrationData: data,
  });
};



