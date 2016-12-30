import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import thunderstorm from '../../img/icons/rain-thunderstorm.svg';
import drizzle from '../../img/icons/rain-drizzle.svg';
import rain from '../../img/icons/rain-rain.svg';
import snow from '../../img/icons/snow.svg';
import atmosphere from '../../img/icons/mist-smoke-forecast.svg';
import sun from '../../img/icons/sun.svg';
import cloudSun from '../../img/icons/cloud-sun.svg';
import cloud from '../../img/icons/cloud.svg';
import unknownForecast from '../../img/icons/unknown-forecast.svg';

const WeatherForecast=({ forecastList }) => {
	const cd=(code) => {
		if (code >= 200 && code < 300) {
			return thunderstorm;
		} else if (code >= 300 && code < 400) {
			return drizzle;
		} else if (code >= 500 && code < 600) {
			return rain;
		} else if (code >= 600 && code < 700) {
			return snow;
		} else if (code >= 700 && code < 800) {
			return atmosphere;
		} else if (code === 800) {
			return sun;
		} else if (code === 801) {
			return cloudSun;
		} else if (code >= 802 && code < 900) {
			return cloud;
		} else {
			return unknownForecast;
		}
	};

	return (
		<div>
			<div className="forecast-title-section text-center">
				<h2>Forecast weather on 5 day</h2>
			</div>
			{forecastList.map((object, index) => {
				const mainTemp=object.main.temp + '';

				const tempForecast=(temp) => {
					if (temp.match(/-\d\d/)) {
						return temp.slice(0, 3);
					} else if (temp.match(/-[1-9]/)) {
						return temp.slice(0, 2);
					} else if (temp.match(/-[0]/)) {
						return temp.slice(1, 2);
					} else if (temp.match(/\d(\d)?/)) {
						return Math.floor(temp);
					}
				};

				return (
					<div className="col-md-3 col-sm-3 col-xs-3 forecast-weather-section" key={index}>
						<div className="forecast-weather-item">
							<div className="forecast-weather-details">
								<p>{object.date === new Date().getDate() ? `Today` : object.dayName}</p>
								<img src={cd(object.weather[0].id)} />
								<p>{object.month} {object.date}</p>
								<p>{tempForecast(mainTemp)}</p>
								<p>{object.weather[0].description}</p>
								<p>Humidity: {object.main.humidity} %</p>
								<p>Wind: {Math.round((object.wind.speed)*0.44704)} m/s</p>
								<p>Pressure: {Math.round((object.main.pressure)*0.75)} mmHg</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

WeatherForecast.propTypes={
	forecastList: PropTypes.array.isRequired
};

export default WeatherForecast;