import SockJS from "sockjs-client";
import {Stomp} from "stompjs/lib/stomp";
import $ from 'jquery';
export const registration = (form) => (dispatch) => {
  $.ajax({
    url: "/api/users",
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({userName: form.username, email: form.emailid}),
    success: function (resp) {
      const socket = new SockJS('/gs-guide-websocket');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        console.log("Connected");
      });
      success(resp, stompClient);
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


