import {swal} from 'sweetalert';

import store from '../store/index.js';
import SockJS from "sockjs-client";
import {Stomp} from "stompjs/lib/stomp";

let success = function (response, history, socketClient) {
    console.log(response);
    localStorage.setItem("email", response.email);
    store.dispatch({
        type: "SET_PROFILE",
        profile: {emailId: response.email, userName: response.userName, id: response.id, client: socketClient},
    });

    if (history) history.push("/");
};

let error = function (err) {
    console.log(err);
    sweetAlert(err.responseText);
}

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

export function login(form, history)    {
    console.log(form.emailid);
    $.ajax({
        url: "/signup",
        type: "POST",
        data: form.emailid,
        contentType: "text/plain",
        success: function(resp) {
            const socket = new SockJS('/gs-guide-websocket');
            let stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                success(resp,history, stompClient);
            });
        },
        error: function(err)   {
            error(err);
        }
    })
}