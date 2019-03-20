$(document).ready(function(){
    $("form").submit(function(){
        var email = document.forms["pskForm"]["email"].value;
        var desc = document.forms["pskForm"]["description"].value;
        var send = document.forms["pskForm"]["send-email"].checked;
        alert("email: " + email + " Description: " + desc + " Checkbox: " + send)
    });
});