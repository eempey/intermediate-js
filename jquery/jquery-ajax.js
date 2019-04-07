$('#btn').click(function(){
	$.ajax({
	method: "GET",
	url: "https://baconipsum.com/api/?type=meat-and-filler",
	dataType: 'json'
	})
	.done(function(data){
		console.log(data);
		$('p#grossMeatThing').text(data[0]);
	})
	.fail(function(){
		alert('oh no, failed!');
	});
});

$('#randomPicBtn').click(function(){
	$.ajax({
	method: "GET",
	url: "http://aws.random.cat/meow",
	dataType: 'json'
	})
	.done(function(data){
		console.log(data);
		$('#randomPic').attr('src', data.file);
	})
	.fail(function(){
		alert('oh no, failed!');
	});
});
