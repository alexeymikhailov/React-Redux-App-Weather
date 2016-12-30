import React, { PropTypes } from 'react';

const WeatherCityTemp = ({ temp, city, country }) => {
	const mainTemp=temp + '';

	const currentTemp=(temp) => {
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
		<div className="city-country-nowtemp">
			<header>
				<div className="city-country">
					<p>{city}, {country}</p>
				</div>
				<nav>
					<ul>
						<li>
							<p>{currentTemp(mainTemp)}<span className="degree-symbol">°</span>C</p>	
						</li>
					</ul>
				</nav>
			</header>	
		</div>
	);
};

WeatherCityTemp.propTypes={
	temp: PropTypes.number.isRequired,
	city: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired
};

export default WeatherCityTemp;