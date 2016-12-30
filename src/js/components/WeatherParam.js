import React, { PropTypes } from 'react';
import sunriseSvg from '../../img/icons/sunrise.svg';
import sunsetSvg from '../../img/icons/sunset.svg';
import thermometerSvg from '../../img/icons/thermometer.svg';
import humiditySvg from '../../img/icons/humidity.svg';
import windSvg from '../../img/icons/wind.svg';
import pressureSvg from '../../img/icons/pressure.svg';

const WeatherParam=({ desc, sunrise, sunset, humidity, wind, pressure }) => {
	return (
		<div className="col-md-6 col-sm-6 weather-time-icon">
			<div className="weather-description">
				<h2>Details</h2>
				<p>{desc}</p>
			</div>
			<ul className="weather-details">
				<li>
					<div className="weather-item">
						<div className="weather-description-item">
							<img src={sunriseSvg} />
							<p>Sunrise: {sunrise.slice(10)}</p>
						</div>
					</div>
				</li>
				<li>
					<div className="weather-item">
						<div className="weather-description-item">
							<img src={sunsetSvg} />
							<p>Sunset: {sunset.slice(10)}</p>
						</div>
					</div>
				</li>
				<li>
					<div className="weather-item">
						<div className="weather-description-item">
							<img src={humiditySvg} />
							<p>Humidity: {humidity}%</p>
						</div>
					</div>
				</li>
				<li>
					<div className="weather-item">
						<div className="weather-description-item">
							<img src={windSvg} />
							<p>Wind: {Math.round((wind)*0.44709)} m/s</p>
						</div>
					</div>
				</li>
				<li>
					<div className="weather-item">
						<div className="weather-description-item">
							<img src={pressureSvg} />
							<p>Pressure: {Math.round((pressure)*0.75)} mmHg</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

WeatherParam.propTypes={
	desc: PropTypes.string.isRequired,
	sunrise: PropTypes.string.isRequired,
	sunset: PropTypes.string.isRequired,
	humidity: PropTypes.number.isRequired,
	wind: PropTypes.number.isRequired,
	pressure: PropTypes.number.isRequired
};

export default WeatherParam;