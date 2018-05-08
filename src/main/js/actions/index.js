
export function registerForm()  {

}

export function registration(form, history) {
    $.ajax({
       url: "/api/users",
       type: "POST",
       contentType: "application/json",
       dataType: "json",
       data: JSON.stringify(form),
       success: function (resp) {
           history.push("/lobby");
       },
       error: function(error)   {
           console.log(error);
       }
    });
}