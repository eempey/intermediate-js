var handleErrors = function(response) {
	if(!response.ok){
		throw Error('The error is ' + response.status);
	}

	return response;
}

var parseJSON = function(data) {
	
	return data.json().then(function(parsedData){
		return parsedData.results[0];
	});
}

const updateProfile = function(data) {
	document.querySelector('#avatar').src = data.picture.large;
	document.querySelector('#fullname').innerHTML = data.name.first[0].toUpperCase() + data.name.first.slice(1) +' ' + data.name.last[0].toUpperCase() + data.name.last.slice(1);
	document.querySelector('#username').innerHTML = data.login.username;
	document.querySelector('#email').innerHTML = data.email;
	document.querySelector('#city').innerHTML = data.location.city[0].toUpperCase() + data.location.city.slice(1);
	
	
}

const printError = function(error) {
	alert(error);
}

const fetchThis = function(){
	fetch('https://randomuser.me/api/')
					.then(handleErrors)
					.then(parseJSON)
					.then(updateProfile)
					.catch(printError);
}


document.getElementById('btn').addEventListener('click', fetchThis);
