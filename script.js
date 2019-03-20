$(document).ready(function(){
  $("button").click(function(){
	var url_vars = getUrlVars()
	// authentication_data
	var session_key = url_vars['session_key']
	// generation_options
	var feide_username = url_vars['feide_username'];
	var name = url_vars['name'];
	var email = document.getElementById("email").value;
    var description = document.getElementById("description").value;
    var deliver_by_email = document.getElementById("send-email").checked;
	
	// Define dicts
	var authentication_data = {
		"session_key" : session_key
	};
	var generation_options = {
		"feide_username" : feide_username, // TODO: Remove fields that can be gotten from Feide
		"full_name" : name,
		"email" : email,
		"device_type" : description,
		"deliver_by_email" : deliver_by_email,
	};
	
	// Post the request with JSON-stringified dicts (will be formatted correctly on backend)
	$.post("http://127.0.0.1:8000/connect/",
    {
		authentication_data: JSON.stringify(authentication_data),
		generation_options: JSON.stringify(generation_options),
    },
    function(data,status){
		alert(data.responseData);
    });	
  });
});


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}