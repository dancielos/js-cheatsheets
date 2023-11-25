/*
  Author: Dan Cielos | Front-end Developer
  Website: https://dancielos.com
 */

console.log('Async / Await');

import { WEATHER_API_KEY } from './config.js';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const getLocation = async function () {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				// console.log(position.coords.longitude);
				resolve([
					position.coords.longitude.toFixed(2),
					position.coords.latitude.toFixed(2),
				]);
			},
			(err) => reject(err)
		);
	});
};

const getWeather = async function () {
	const FETCH_URL = `${API_URL}lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
	// console.log(FETCH_URL);
	try {
		const data = await fetch(FETCH_URL);
		const res = await data.json();
		return res;
	} catch (err) {
		return new Error(`Something went wrong. ${err}`);
	}
};

const getWeatherThen = function () {
	// using the .then() method
	const FETCH_URL = `${API_URL}lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;

	return fetch(FETCH_URL)
		.then((data) => data.json())
		.then((res) => res)
		.catch((err) => new Error(`Something went wrong. ${err}`));
};

const [lon, lat] = await getLocation();
const weather = await getWeather();

console.log({ weather });

const weather2 = await getWeatherThen();

console.log({ weather2 });

// Write asynchronous code like synchronous code
// IMPORTANT: await is dependent on async

console.log(WEATHER_API_KEY);
