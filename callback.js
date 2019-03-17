function findIndex(arr, callback) {
    for(var i=0; i< arr.length; i++) {
    	if (callback(arr[i], i, arr) === true) {
    		return i;
    	} 
    }
    return -1;
}

var checkThis = [0,1,2,3,4,5,6]

findIndex(checkThis, function(value, index, array){
	return value % 2 === 0;
});

// HINTS
  // the function should iterate through the array passed to it and invoke the callback function at each iteration
  // the callback function should accept three parameters - the value you are iterating over, the index you are currently at, and the entire array
  // if the callback returns true at any point, return the index at which you are iterating over
  // otherwise return -1