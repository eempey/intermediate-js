function countdown(seconds) {
	var countdown = seconds * 1000;
	var secondsElapsed = 0;
	var interval = setInterval(function(secondsElapsed){
		secondsElapsed++;
		console.log(secondsElapsed);
	} ,1000); 

	setTimeout(function(){
		clearInterval(interval);
		console.log('Ring Ring Ring!!!');
	}, countdown);
}

countdown(10);