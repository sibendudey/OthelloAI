import SockJS from "sockjs-client";
import {Stomp} from "stompjs/lib/stomp";
import swal from 'sweetalert';
import $ from 'jquery';
import {BASE_URL, SOCKET_URL} from "../../BaseUrl";

export const login = ()  => (dispatch, getState) =>  {
  const form = getState().login;
  $.ajax({
    url: BASE_URL + "/signup",
    type: "POST",
    data: form.emailid,
    contentType: "text/plain",
    success: function(resp) {
      const socket = new SockJS(BASE_URL + '/gs-guide-websocket');
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        dispatch(success(resp,stompClient));
      });
    },
    error: function(err)   {
      error(err);
    }
  });
};

export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';
export const updateLoginForm = ({target}) => (dispatch) => {
  dispatch({
    type: UPDATE_LOGIN_FORM,
    emailid: target.value,
  });
};

export const success = (response, socketClient) => (dispatch) => {
  localStorage.setItem("email", response.email);
  dispatch({
    type: "SET_PROFILE",
    profile: {emailId: response.email, userName: response.userName, id: response.id, client: socketClient},
  });
};

export const error = (err) => {
  swal(err.responseText);
};
