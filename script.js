var descriptionInput = document.getElementById("description");
var deliverByEmailInput = document.getElementById("send-email");
var submitButton = document.getElementById("sendBtn");
var pskTextField = document.getElementById("psk");
var showPskButton = document.getElementById("showPsk");
var form = document.getElementById("outerForm");
var loader = document.getElementById("loader");
var pskScreen = document.getElementById("pskScreen");


function sendData() {
	loading();
	// Get query strings
	var url_vars = getUrlVars();

	// Authentication data
	var session_key = url_vars['session_key'];

	// Generation options
	var description = descriptionInput.value;
	var deliver_by_email = deliverByEmailInput.checked;

	// Request data
	var authentication_data = {
		"session_key" : session_key
	};
	var generation_options = {
		"device_type" : description,
		"deliver_by_email" : deliver_by_email,
	};
	var data = {
		authentication_data: JSON.stringify(authentication_data),
		generation_options: JSON.stringify(generation_options)
	}

	// Create request
	var xhr = new XMLHttpRequest();
	xhr.open('POST', backendUrl + "/connect/", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.withCredentials = true;

	// Handle request responses
	xhr.onload = function() {
		if (xhr.status === 201) {
			showPskScreen(xhr.responseText);
		}
		else if (xhr.status == 400) {
			alert('You messed up');
			showFormScreen();
		}
		else if (xhr.status == 500) {
			alert('Unexpected error')
			showFormScreen();
		}
		else if (xhr.status == 403) {
			window.location.href = backendUrl + "/connect/"
		}
	};

	// Handle request error
	xhr.onerror = function() {
		alert('Unexpected error. Please check your browser.');
	};

	// Send the request
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

function setDescriptionColors() {
	if (!descriptionIsValid()) {
		descriptionInput.style.border = "1px solid red";
		submitButton.disabled = true;
	}
	else {
		descriptionInput.style.border= "1px solid white";
		submitButton.disabled = false;
	}
}


function descriptionIsValid() {
	// Check if the inputted description is valid
	var desc = descriptionInput.value;
	if (desc.length < 1){
		return false;
	}
	return true;
}

function togglePsk() {
	// Show/hide the password
	if (pskTextField.type === "password") {
		pskTextField.type = "text";
		showPskButton.innerHTML = "Skjul passord";
		showPskButton.title = "Skjul passordet";
	} else {
		pskTextField.type = "password";
		showPskButton.innerHTML = "Vis passord";
		showPskButton.title = "Vis passordet";
	}
}

function loading() {
	form.style.display = "none";
	loader.style.display = "block"
	pskScreen.style.display = "none";
}

function showPskScreen(password) {
	form.style.display = "none";
	loader.style.display = "none"
	pskScreen.style.display = "block";
	pskTextField.value = password.replace(/['"]+/g, '');
	// Clear the password after 5 minutes
	setTimeout(clearPsk, 300000);
}

function showFormScreen() {
	form.style.display = "block";
	loader.style.display = "none";
	pskScreen.style.display = "none";
}

function clearPsk() {
	pskTextField.value = "expired";
}
