import React, { Component } from 'react';

const Weather = ({ temp, city }) => {
	return (
		<div className="container">
			<div className="skills-heading">
				<header>
					<div className="logo1">
						<p>{city}</p>
					</div>
					<nav>
						<ul>
							<li>
								<p>{temp}<span className="degree-symbol">°</span>C</p>	
							</li>
						</ul>
					</nav>
				</header>	
			</div>
		</div>
	);
}
export default Weather;