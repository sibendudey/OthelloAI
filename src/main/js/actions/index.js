
export function registerForm()  {

}

export function registration(form) {
    $.ajax({
       url: "/api/users",
       type: "POST",
       contentType: "application/json",
       dataType: "json",
       data: JSON.stringify(form),
       success: function (resp) {
           console.log(resp);
       },
       error: function(error)   {
           console.log(error);
       }
    });
}