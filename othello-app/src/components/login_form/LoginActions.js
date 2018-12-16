import SockJS from "sockjs-client";
import {Stomp} from "stompjs/lib/stomp";
import {swal} from 'sweetalert';

const login = (form)  => (dispatch) =>  {
  $.ajax({
    url: "/signup",
    type: "POST",
    data: form.emailid,
    contentType: "text/plain",
    success: function(resp) {
      const socket = new SockJS('/gs-guide-websocket');
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

export const success = (response, socketClient) => (dispatch) => {
  localStorage.setItem("email", response.email);
  dispatch({
    type: "SET_PROFILE",
    profile: {emailId: response.email, userName: response.userName, id: response.id, client: socketClient},
  });
};

export const error = (err) => {
  sweetAlert(err.responseText);
};
