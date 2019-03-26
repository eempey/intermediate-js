/*fetch(url)
.then(handleErrors)
.then(parseJSON)
.then(updateProfile)
.catch(printError);*/

var handleErrors = function(response) {
	console.log(response);
	if(!response.ok){
		throw Error('The error is ' + response.status);
	}
	return response;
}

var parseJSON = function(response) {
	console.log(response.body);
}

fetch('https://randomuser.me/api/')
.then(handleErrors)
.then(parseJSON);
//.then(updateProfile)
//.catch(printError);
//

