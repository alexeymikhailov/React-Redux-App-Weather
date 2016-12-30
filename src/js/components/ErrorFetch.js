import React from 'react';
import errorSvg from '../../img/icons/robot.svg';

const ErrorMessage=({ errorGeolocation }) => {
	return (
		<div className="error-fetch-weather">
			<img src={errorSvg} />
			<span className="error">Oops, an error occured.</span>
			<h1>{ errorGeolocation ? errorGeolocation : `Sorry, but the city you requested cannot be found or weather data not available.`}</h1>
		</div>
	);
}; 

export default ErrorMessage;