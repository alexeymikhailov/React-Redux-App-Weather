import fetch from 'isomorphic-fetch';

const API_KEY='e133e47ab3aafb8739df3e2c03a9ebb8';
const rootUrl='http://api.openweathermap.org/data/2.5';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const REQUEST_WEATHER_FAILED = 'REQUEST_WEATHER_FAILED';

export const REQUEST_TIME='REQUEST_TIME';
export const RECEIVE_TIME='RECEIVE_TIME';

export const REQUEST_FORECAST='REQUEST_FORECAST';
export const RECEIVE_FORECAST='RECEIVE_FORECAST';
export const REQUEST_FORECAST_FAILED='REQUEST_FORECAST_FAILED';

export function requestWeather() {
	return {
		type: REQUEST_WEATHER
	};
}

export function requestWeatherFailed(error) {
	return {
		type: REQUEST_WEATHER_FAILED,
		error
	};
}

export function receiveWeather(json) {
	return {
		type: RECEIVE_WEATHER,
		payload: {
			json
		}
	};
}

export function requestForecast() {
	return {
		type: REQUEST_FORECAST
	};
}

export function receiveForecast(json) {
	return {
		type: RECEIVE_FORECAST,
		payload: {
			json
		}
	};
}

export function requestForecastFailed(error) {
	return {
		type: REQUEST_FORECAST_FAILED,
		error
	};
}

export function requestTime() {
	return {
		type: REQUEST_TIME
	};
}

export function receiveTime(json) {
	return {
		type: RECEIVE_TIME,
		payload: {
			json
		}
	};
}

export function fetchWeather(location) {
	const urlRegular = `${rootUrl}/weather?${location}&units=metric&appid=${API_KEY}`;

	return function(dispatch) {
		dispatch(requestWeather());

		return fetch(urlRegular)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				dispatch(receiveWeather(json));
				dispatch(fetchTime(json.coord));
			})
			.catch((error) => {
				return dispatch(requestWeatherFailed(error.toString()));
			});
	};
}

export function fetchTime(coord) {
	const { lat: lat, lon: lon }=coord;
	const rootUrl='http://api.geonames.org';
	const userName='alexey1249';
	const urlTime=`${rootUrl}/timezoneJSON?lat=${lat}&lng=${lon}&username=${userName}`;

	return function(dispatch) {
		fetch(urlTime)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				return dispatch(receiveTime(json));
				console.dir(json);
			})
			.catch((error) => {
				console.error(error);
			});
	};
}

export function fetchForecast(location) {
	const urlForecast=`${rootUrl}/forecast?${location}&units=metric&appid=${API_KEY}`;

	return function(dispatch) {
		dispatch(requestForecast());

		return fetch(urlForecast) 
			.then((response) => {
				return response.json(); 
			})
			.then((json) => {
				return dispatch(receiveForecast(json));
			})
			.catch((error) => {
				dispatch(requestForecastFailed(error.toString()));
			});
	};
}

