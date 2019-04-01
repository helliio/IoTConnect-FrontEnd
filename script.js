function sendData() {
	loading();
	var url_vars = getUrlVars();
	// authentication_data
	var session_key = url_vars['session_key'];
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
	xhr.open('POST', 'http://127.0.0.1:8000/connect/', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.withCredentials = true;

	xhr.onload = function() {
		if (xhr.status === 201) {
			PSKScreen(xhr.responseText);
		}
		else if (xhr.status == 400) {
			alert('You messed up');
		}
		else if (xhr.status == 500) {
			alert('Unexpected error')
		}
	};
	xhr.onerror = function() {
		alert('Unexpected error. Please check your browser.');
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

function testEmail(){
	if (!emailIsValid()) {
		document.getElementById("email").style.border = "1px solid red";
		document.getElementById("sendBtn").disabled = true;
	}
	else {
		document.getElementById("email").style.border= "1px solid white";
		if (descriptionIsValid()){
			document.getElementById("sendBtn").disabled = false;
		}	
	}
}

function testDescription(){
	if (!descriptionIsValid()) {
		document.getElementById("description").style.border = "1px solid red";
		document.getElementById("sendBtn").disabled = true;
	}
	else {
		document.getElementById("description").style.border= "1px solid white";
		if (emailIsValid()){
			document.getElementById("sendBtn").disabled = false;
		}
	}
}

function emailIsValid() {
	var email = document.getElementById("email").value;
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

function descriptionIsValid(){
	var desc = document.getElementById("description").value;
	if (desc.length < 1){
		return false;
	}
	return true;
}

function showPSK() {
	var psk = document.getElementById("psk");
	var pskBtn = document.getElementById("showPsk");
  if (psk.type === "password") {
		psk.type = "text";
		pskBtn.innerHTML = "Skjul passord";
  } else {
		psk.type = "password";
		pskBtn.innerHTML = "Vis passord";
  }
}

function formScreen() {
	var form = document.getElementById("outerForm");
	form.style.display = "block";
	var loader = document.getElementById("loader")
	loader.style.display = "none"
	var pskScreen = document.getElementById("pskScreen");
	pskScreen.style.display = "none";
}

function loading() {
	var form = document.getElementById("outerForm");
	form.style.display = "none";
	var loader = document.getElementById("loader")
	loader.style.display = "block"
	var pskScreen = document.getElementById("pskScreen");
	pskScreen.style.display = "none";
}

function PSKScreen(password) {
	var form = document.getElementById("outerForm");
	form.style.display = "none";
	var loader = document.getElementById("loader")
	loader.style.display = "none"
	var pskScreen = document.getElementById("pskScreen");
	pskScreen.style.display = "block";
	var psk = document.getElementById("psk");
	psk.value=password.replace(/['"]+/g, '');
}
