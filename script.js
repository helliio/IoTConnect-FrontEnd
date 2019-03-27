function sendData() {
	var url_vars = getUrlVars()
	// authentication_data
	var session_key = url_vars['session_key']
	// generation_options
	var email = document.getElementById("email").value;
    var description = document.getElementById("description").value;
    var deliver_by_email = document.getElementById("send-email").checked;
	
	// Define dicts
	var authentication_data = {
		"session_key" : session_key
	};
	var generation_options = {
		"email" : email,
		"device_type" : description,
		"deliver_by_email" : deliver_by_email,
	};
	var data = {
		authentication_data: JSON.stringify(authentication_data),
		generation_options: JSON.stringify(generation_options)
	}
	
    var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://127.0.0.1:8000/connect/');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function() {
		if (xhr.status === 201) {
			alert(xhr.responseText);
		}
		else if (xhr.status == 400) {
			alert('You messed up');
		}
		else if (xhr.status == 500) {
			alert('Unexpected error')
		}
	};
	xhr.send(JSON.stringify(data));
}


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