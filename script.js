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
	};

	// Create request
	var xhr = new XMLHttpRequest();
	xhr.open('POST', backendUrl + "/connect/", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.withCredentials = true;

	// Handle request responses (ordered by likelihood for efficiency)
	xhr.onload = function() {
		if (xhr.status === 201) {
			// Created (success)
			showPskScreen(xhr.responseText);
		}
		else if (xhr.status == 401) {
			// Unauthorized
			window.location.href = backendUrl + "/connect/";
		}
		else if (xhr.status == 500) {
			// Internal server error
			showAlert('Det har oppstått en uventet feil. Vennligst prøv igjen.');
			showFormScreen();
		}
		else if (xhr.status == 400) {
			// Bad request
			showAlert('Noe er galt. Vennligst bekreft at e-postadressen er riktig.');
			showFormScreen();
		}
		else if (xhr.status == 403) {
			// Forbidden (too fast)
			showAlert('Du etterspør passord for hyppig. Vennligst prøv igjen senere.');
			showFormScreen();
		}
		else if (xhr.status == 408 || xhr.status == 404 || xhr.status == 503) {
			// Timed out, not found, or unavailable (HiveManager or Dataporten not responding)
			showAlert('Tjenesten er midlertidig utilgjengelig. Vi beklager dette.');
			showFormScreen();
		}
	};

	// Handle request error (likely a browser issue)
	xhr.onerror = function() {
		showAlert('Det har oppstått en uventet feil. Vennligst prøv en annen nettleser.');
		showFormScreen();
	};

	// Send the request
	xhr.send(JSON.stringify(data));
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
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
	return (descriptionInput.value.length >= 1);
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
	loader.style.display = "block";
	pskScreen.style.display = "none";
}

function showPskScreen(password) {
	form.style.display = "none";
	loader.style.display = "none";
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

function showAlert(msg) {
	alertMsg.innerText = msg;
	alertBox.style.display = "block";
	nbAlerts++;
	setTimeout(hideAlert, 15000);
}

function hideAlert() {
	nbAlerts--;
	// Only hide if this is the last alert
	if (nbAlerts == 0) {
		alertBox.style.display = "none";
	}
}
