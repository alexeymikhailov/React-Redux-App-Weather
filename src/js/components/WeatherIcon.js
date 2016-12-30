import React, { PropTypes } from 'react';

const WeatherIcon=({ code, timeZone, cityName }) => {
	return (
		<div className="col-md-6 col-sm-6 weather-time-icon">
			<div className="local-time">
				<h2>Current time in {cityName} <span className="timeZone">{timeZone.time.slice(10)}</span></h2>
			</div>
			<div className={code} />
		</div>
	);
};

WeatherIcon.propTypes={
	code: PropTypes.string.isRequired,
	timeZone: PropTypes.object.isRequired,
	cityName: PropTypes.string.isRequired
};

export default WeatherIcon;