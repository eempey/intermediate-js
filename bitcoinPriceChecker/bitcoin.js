var priceSpan = document.querySelector("#price");
var refreshButton = document.querySelector("#priceCheck");

var checkPrice = function(){
	currency = document.querySelector('input[name="currency"]:checked').value;
	var XHR = new XMLHttpRequest();

	XHR.onreadystatechange = function() {
		if(XHR.readyState == 4 && XHR.status == 200) {
			var priceData = JSON.parse(XHR.responseText).bpi;
			priceSpan.innerHTML = currency + ' ' + priceData[currency].rate_float;		
		}
	}

	XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
	XHR.send();
}

checkPrice();

refreshButton.addEventListener("click", checkPrice);