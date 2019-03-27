var inputs = document.getElementsByTagName("input");
for (i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("sendBtn").click();
		}
	});
}

var welcomeHeader = document.getElementById("welcomeText");
var userName = getUrlVars()['name'];
welcomeHeader.innerHTML = "Velkommen, " + userName;