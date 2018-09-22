import {swal} from 'sweetalert';
import SockJS from "sockjs-client";
import {Stomp} from "stompjs/lib/stomp";

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

export function registration(form, history) {
    console.log(form);
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
           success(resp, history, stompClient);
       },
       error: function(err)   {
           error(err);
       }
    });
}

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
            // TODO
            error(err);
        }
    });
};