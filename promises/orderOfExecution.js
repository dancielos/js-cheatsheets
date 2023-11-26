//Which one do you think will run first?

console.log('Hello, World!'); // 1

Promise.resolve('1st promise').then((data) => {
	console.log(data); // 3
});

setTimeout(() => {
	console.log('START of timeout with rejected promise'); // 5
	Promise.reject('Rejected Promise').catch(console.log); // 7
	console.log('END of timeout with rejected promise'); // 6
}, 0);

setTimeout(() => {
	console.log('Timeout callback'); // 8
}, 0);

Promise.resolve('2nd promise').then((data) => {
	console.log(data); // 4
});

console.log('End of code'); // 2
