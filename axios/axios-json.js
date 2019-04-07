var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

var axiosBtn = document.querySelector("#axios");
var jqueryBtn = $("#jquery");
var xhrBtn = document.querySelector("#http");
var fetchBtn = document.querySelector("#fetch");
var jQuote = $('#quote');
var quote =  document.querySelector("#quote");

/*axios section*/
axiosBtn.addEventListener('click', function(){
	axios.get(url)
	.then(function(result){
		console.log(result.data[0]);
		quote.innerHTML = result.data[0];
	})
	.catch(function(error){
		console.log(error);
	});
});


/*XHR section*/
xhrBtn.addEventListener("click", function(){
	//make the request
	var XHR = new XMLHttpRequest();

	XHR.onreadystatechange = function() {
		if(XHR.readyState == 4 && XHR.status == 200) {
			var responseText = JSON.parse(XHR.responseText)[0];
			console.log(responseText);
			quote.innerHTML = responseText;
		}
	}

	XHR.open("GET", url);
	XHR.send();
});

/*jQuery Section*/
jqueryBtn.click(function(){
    $.ajax({
        method: "GET",
        url: url,
        dataType: 'json'
    })
        .done(function(data){
            console.log(data);
            jQuote.text(data[0]);
        })
        .fail(function(){
            alert('oh no, failed!');
        });
});

/*fetch section*/
var handleErrors = function(response) {
    if(!response.ok){
        throw Error('The error is ' + response.status);
    }

    return response;
}

var parseJSON = function(data) {

    return data.json().then(function(parsedData){
        return parsedData;
    });
}

const updateProfile = function(data) {
    console.log(data);
    quote.innerHTML = data[0];


}

const printError = function(error) {
    alert(error);
}

const fetchThis = function(){
    fetch(url)
        .then(handleErrors)
        .then(parseJSON)
        .then(updateProfile)
        .catch(printError);
}


fetchBtn.addEventListener('click', fetchThis);