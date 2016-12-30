import { combineReducers } from 'redux';
import weather from './Weather';
import weatherForecast from './WeatherForecast';
import timeLocation from './TimeLocation';

const rootReducer=combineReducers({
	weather,
	weatherForecast,
	timeLocation
});

export default rootReducer;