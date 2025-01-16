export function saveScore(trialResults) {
	saveToLocalStorage(trialResults);
	// saveToCookie(trialResults);
}

const saveToLocalStorage = (trialResults) => {
	// If we can't find anything in local storage
	if (!localStorage.getItem("TestResults")) {
		console.log("Setting Local Storage");
		// Set an empty array in local storage
		localStorage.setItem("TestResults", JSON.stringify([]));
	}
	// Get the storage array from local storage
	const storageArr = JSON.parse(localStorage.getItem("TestResults"))
	// Add the results from this trial to the array
	storageArr.push(trialResults);
	// Set the Local Storage with the new array
	localStorage.setItem("TestResults", JSON.stringify(storageArr));
	console.log(`Saving ${JSON.stringify(trialResults)}`);
}

const saveToCookie = (trialResults) => {
	// If the cookie doesn't exist
	if (getCookie("TestResults") === "") {
		// Set the Cookie
		setCookie("TestResults", JSON.stringify([]), 1)
	}
	const testData = JSON.parse(getCookie("TestResults"));
	testData.push(trialResults);
	setCookie("TestResults", JSON.stringify(testData), 1);
	console.log("Saved");

}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}