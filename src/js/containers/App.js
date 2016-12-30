import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather, fetchForecast } from '../actions';
import { bindActionCreators } from 'redux';
import fetch from 'isomorphic-fetch';
import Search from './Search';
import Spinner from '../components/Spinner';
import WeatherCityTemp from '../components/WeatherCityTemp';
import WeatherIcon from '../components/WeatherIcon';
import WeatherParam from '../components/WeatherParam';
import WeatherForecast from '../components/WeatherForecast';
import ErrorMessage from '../components/ErrorFetch';

class App extends Component {
	constructor(props, defaultProps) {
		super(props, defaultProps);

		this.getWeather();

		this.state={
			errorGeolocation: ''
		};
	}

	getWeather() {
		if (window.navigator.geolocation) {
			window.navigator.geolocation.getCurrentPosition((position) => {

				const { latitude: lat, longitude: lon }=position.coords;

				this.props.dispatch(fetchWeather(`lat=${lat}&lon=${lon}`));
				this.props.dispatch(fetchForecast(`lat=${lat}&lon=${lon}`));
			}, (error) => {
				this.state.errorGeolocation=error;
			});
		} else {
			this.state.errorGeolocation='Your browser does not support geolocation.';
		}
	}

	getIconClass(code, icon) {
		const arr=icon.split('');
		const ic=arr[arr.length-1];

		if (code >= 200 && code < 300) {
			return 'thunderstorm-' + ic;
		} else if (code >= 300 && code < 400) {
			return 'drizzle-' + ic;
		} else if (code >= 500 && code < 600) {
			return 'rain-' + ic;
		} else if (code >= 600 && code < 700) {
			return 'snow-' + ic;
		} else if (code >= 700 && code < 800) {
			return 'mist-smoke-' + ic;
		} else if (code === 800) {
			return 'clear-' + ic;
		} else if (code === 801) {
			return 'few-clouds-' + ic;
		} else if (code >= 802 && code < 900) {
			return 'clouds';
		} else {
			return 'unknown';
		}
	}

	getDayFormat(forecast) {
		const dateToString=(date, ms) => {
			return new Date(date * ms).toDateString();
		};

		let nextDay=dateToString(forecast[0].dt, 1000);
		
		const dayNames=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const monthNames=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

		const days=forecast.filter((day, i) => {
			let prevDay=nextDay;
			let dateString=dateToString(day.dt, 1000);
			nextDay=dateString;

			return dateString.indexOf(prevDay) < 0 || i === 0;
		}).map((day) => {
			day.dayName=dayNames[new Date(day.dt * 1000).getDay()];
			day.date=new Date(day.dt * 1000).getDate();
			day.month=monthNames[new Date(day.dt * 1000).getMonth()];

			return day;
		});

		return days;
	}

	render() {
		const { weather, weatherFetch, weatherForecast, timeLocation, timeFetch }=this.props;

		if (!weather.data || !weatherForecast.data || !timeLocation.data || weatherFetch || timeFetch ) {
			if (weather.error) {
				return (
					<div className="container">
						<Search />
						<ErrorMessage error={this.state.errorGeolocation} />
					</div>
				);
			} else {
				return (	
					<div className="container">
						<Search />
						<Spinner />
					</div>
				);
			}
		}
		const iconClass=this.getIconClass(weather.data.weather[0].id, weather.data.weather[0].icon);
		const dayFormat=this.getDayFormat(weatherForecast.data.list).slice(0, 5);

		return (	
			<div className="container">
				<Search />
				<WeatherCityTemp temp={weather.data.main.temp} city={weather.data.name} 
							country={timeLocation.data.countryName} />
				<WeatherIcon code={iconClass} 
							timeZone={timeLocation.data} cityName={weather.data.name} />
				<WeatherParam desc={weather.data.weather[0].main} sunrise={timeLocation.data.sunrise} 
							sunset={timeLocation.data.sunset} humidity={weather.data.main.humidity} 
							wind={weather.data.wind.speed} pressure={weather.data.main.pressure} />
				<WeatherForecast forecastList={dayFormat} />
			</div>
		);
	}
}

const mapStateToProps=(state) => {
	const { weather, weatherForecast, timeLocation }=state;

	return {
		weather,
		weatherForecast,
		timeLocation
	};
};

export default connect(mapStateToProps)(App);