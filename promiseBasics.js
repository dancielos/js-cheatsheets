/*
  Author: Dan Cielos | Front-end Developer
  Website: https://dancielos.com
 */

console.log('Using Promises, not async/await (yet)');

// Promises generally have two parts, the maker and the receiver. Or, the merchant and the consumer.

// Btw, the maker and receiver terms is from ColorCode's Sina
// (https://www.youtube.com/channel/UCHa8J-xnRYOg5VuudfWpBgg).
// And his coding video tutorials are amazing,
// you should subscribe if you're interested in learning to code.
// Not sponsored btw, I just truly think he's an awesome instructor.

//********** BASIC SYNTAX **********//

// For the MAKER:
function getSomething() {
	return new Promise(function (resolve, reject) {
		// do something, then call...

		resolve('resolved'); //if successful

		// reject('rejected'); //if NOT
	});
}

// For the RECEIVER:
getSomething()
	.then((data) => {
		// called when successful
		console.log(data);
	})
	.catch((err) => {
		//invoked if NOT successful
		console.error(`ERROR: ${err}`);
	});

// NOTE: You can pass a second argument (function)
// into the .then() which would be the onError, or rejection handler.
// That said, it's seldom used as it makes the code harder to read.

//******* USING CALLBACK METHODS and CHAINING *******/

// IMPORTANT: if you pass in callback methods as arguments of .then(),
// the previous resolved data will be automatically passed
// as an argument to the callback method

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
	// MAKER function
	const randomFriend = Math.floor(Math.random() * friends.length);

	// randomize the friend to retrieve
	// with one who doesn't belong (me)...
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
		// when it's not one of the friends, reject the promise
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
getFriend().then(onSuccess, onError);

// Another reason why this method isn't ideal is
// it will continue invoking the chained .then()
// as it already caught the error.
// It may be useful for some cases, but most of the time it's not.

// BUT this is the BETTER method in my opinion:
//prettier-ignore
getFriend()
  .then(getLine)
  .then(onSuccess)
  .catch(onError)
  .finally(onLastCall);

// the passed-in callbacks are short for
// (data) => getLine(data).

// IMPORTANT: ALWAYS return results for the then() callback methods
// Otherwise, the promise will be 'floating' as there's no way to track whether the promise is settled

// Note: .finally() will be invoked regardless of
// whether the promises were fulfilled or not.

//******* USING real data with fetch API *******/

// By real data, I'm using JSON placeholder,
// which isn't technically, 'real.'
// But it works for the purposes of this cheat sheet.

// MAKER, or PROMISER the one who promised something...
function fetchUsers() {
	return new Promise((resolve, reject) => {
		const PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/users';

		// to test the reject, write incorrect URI path or query ^

		fetch(PLACEHOLDER_URL)
			.then((response) => response.json())
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});
}

// RECEIVER, or PROMISEE the one who was promised something...
fetchUsers().then(console.table).catch(console.error);

//******* using STATIC METHODS: *******//

// **** ALL -> after all promises are fulfilled

const promise1 = fetchUsers();
const promise2 = Promise.resolve('resolved');
const promise3 = 1001;
const promiseTimeout = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('promise after 2 seconds');
	}, 2000);
});

Promise.all([promise1, promise2, promise3, promiseTimeout])
	.then((values) => console.log(values))
	.catch(console.error);

// the <values> will be the array of data from
// Promise.all([])
// prints an array with all the 'promised' data
// will wait until everything is 'fulfilled'

const promise4 = new Promise((_, reject) => reject('promise 4 rejected'));

Promise.all([promise1, promise2, promise3, promiseTimeout, promise4])
	.then((values) => console.log(values))
	.catch((err) => {
		console.error(`Promise.all ERROR: ${err}`);
	});

// IF any one promise is rejected
// will immediately throw an error

// **** RACE -> whichever promise gets fulfilled first
// will not work even if one promise is rejected
// which was 'settled' first, as the rejection won the 'race'

function fetchData(data) {
	const URL = `https://jsonplaceholder.typicode.com/${data}`;
	return new Promise((resolve, reject) => {
		fetch(URL)
			.then((res) => res.json())
			.then(resolve)
			.catch(reject);
	});
}

Promise.race([
	// Promise.reject('nope'),
	fetchData('posts'),
	fetchData('comments'),
	fetchData('albums'),
	fetchData('photos'),
	fetchData('todos'),
	fetchData('users'),
])
	.then((data) => {
		console.log('Promise.race');
		return data;
	})
	.then(console.log)
	.catch((err) => console.error(`Promise.race ERROR: ${err}`));

const timeout = function (duration) {
	return new Promise((resolve, reject) => {
		if (!Number.isFinite(duration)) reject('Not a number');
		setTimeout(() => {
			resolve(`${duration} second(s)`);
		}, 1000 * duration);
	});
};

Promise.race([timeout(1), timeout(2), timeout(3)])
	.then((data) => console.log(`Winner of the race: ${data}`))
	.catch(console.err);

//Of course the winner will be the the timeout(1)

// **** ALL SETTLED -> once all promises are resolved and/or rejected

Promise.allSettled([timeout('a'), timeout('b'), timeout('c')])
	.then((data) => console.log(data))
	.catch(console.err);
// will be 'successful' even if one or all of the promises are rejected.

// **** ANY -> if any one promise has been fulfilled, rejected if ALL fails
// will only return one promise, the first one to be fulfilled

Promise.any([timeout('a'), timeout('b'), timeout('c')])
	.then((data) => console.log(data))
	.catch((err) => console.error(`Promise.any error: ${err}`));

Promise.any([timeout(1), timeout('b'), timeout('c')])
	.then((data) => console.log(`Promise.any with only one fulfilled: ${data}`))
	.catch((err) => console.error(`Promise.any error: ${err}`));

Promise.any([timeout(1), timeout(2), timeout('c')])
	.then((data) =>
		console.log(`Promise.any with two promises fulfilled: ${data}`)
	)
	.catch((err) => console.error(`Promise.any error: ${err}`));
