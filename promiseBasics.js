/*
  Author: Dan Cielos | Front-end Developer
  Website: https://dancielos.com
 */

console.log('using promises, not async/await (yet)');

//Promises generally have two parts, the maker and the receiver. Or, the merchant and the consumer.

//Btw, the maker and receiver terms is from ColorCode's Sina.

//********** BASIC SYNTAX **********//

//For the MAKER:
function getSomething() {
	return new Promise(function (resolve, reject) {
		//do something, then call...

		resolve('resolved'); //if successful

		// reject('rejected'); //if NOT
	});
}

//For the RECEIVER:
getSomething()
	.then((data) => {
		//called when successful
		console.log(data);
	})
	.catch((err) => {
		//invoked if NOT successful
		console.error(`ERROR: ${err}`);
	});

//NOTE: You can pass a second argument (function) into the .then() which would be the onError, or rejection handler. That said, it's seldom used as it makes the code harder to read.

//********** USING CALLBACK METHODS **********//

//IMPORTANT: if you pass in callback methods as arguments of .then(), the previous resolved data will be automatically passed as an argument to the callback method

//********** PROMISE CHAINING **********//
