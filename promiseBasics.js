/*
  Author: Dan Cielos | Front-end Developer
  Website: https://dancielos.com
 */

console.log('Using Promises, not async/await (yet)');

//Promises generally have two parts, the maker and the receiver. Or, the merchant and the consumer.

//Btw, the maker and receiver terms is from ColorCode's Sina (https://www.youtube.com/channel/UCHa8J-xnRYOg5VuudfWpBgg). And his coding video tutorials are amazing, you should subscribe if you're interested in learning to code. Not sponsored btw, I just truly think he's an awesome instructor.

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

//******* USING CALLBACK METHODS and CHAINING *******//

//IMPORTANT: if you pass in callback methods as arguments of .then(), the previous resolved data will be automatically passed as an argument to the callback method

const friends = [
	'Chandler',
	'Monica',
	'Joey',
	'Ross',
	'Rachel',
	'Phoebe',
	'Dan',
];

function getFriend() {
	//MAKER function
	const randomFriend = Math.floor(Math.random() * friends.length);

	//randomize the friend to retrieve
	//with one who doesn't belong (me)...
	return new Promise((resolve, reject) => {
		resolve(friends[randomFriend]);
	});
}

function getLine(friend) {
	return new Promise((resolve, reject) => {
		if (friend === 'Joey') resolve(`${friend}: How you doin'?`);
		if (friend === 'Chandler')
			resolve(`Hi I'm ${friend}, I make jokes when I'm uncomfortable.`);
		if (friend === 'Ross') resolve(`${friend}: Pivot, pivot, pivot!`);
		if (friend === 'Monica') resolve(`${friend}: Seven, seven, seven!`);
		if (friend === 'Phoebe')
			resolve(`${friend}: I wish I could, but I don't want to.`);
		if (friend === 'Rachel') resolve(`${friend}: Noooooo...`);
		//when it's not one of the friends, reject the promise
		reject('Who dat?');
	});
}

function onSuccess(data) {
	console.log(`SUCCESS: ${data}`);
	return data;
}

function onError(err) {
	console.error(`ERROR: ${err}`);
}

function onLastCall() {
	console.log('Do you have time for some coffee?');
}

// IF you want to use the second parameter of .then() to catch errors:

// getData().then(onSuccess, onError);

//Another reason why this method isn't ideal is it will continue invoking the chained .then() as it already caught the error. It may be useful for some cases, but most of the time it's not.

// BUT this is the BETTER method in my opinion:
//prettier-ignore
getFriend()
  .then(getLine)
  .then(onSuccess)
  .catch(onError)
  .finally(onLastCall);

//Note: .finally() will be invoked regardless of whether the promise was fulfilled or not.

//******* USING real data with fetch API *******//

//By real data, I'm using JSON placeholder, which isn't technically, 'real.' But it works for the purposes of this cheat sheet.

//MAKER, or PROMISE-R the one who promised something...
function fetchUsers() {
	return new Promise((resolve, reject) => {
		const PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/users';

		//to test the reject, write incorrect URI path or query

		fetch(PLACEHOLDER_URL)
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});
}

//RECEIVER, or PROMISEE the one who was promised something...
fetchUsers()
	.then((data) => console.table(data))
	.catch((err) => console.error(err));
