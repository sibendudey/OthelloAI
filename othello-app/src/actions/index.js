import SockJS from "sockjs-client";
import {Stomp} from "stompjs/lib/stomp";
import {success} from "../components/login_form/LoginActions";



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
           success(resp, stompClient);
       },
       error: function(err)   {
           error(err);
       }
    });
}

