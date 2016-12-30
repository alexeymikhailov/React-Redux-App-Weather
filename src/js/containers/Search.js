import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWeather, fetchForecast } from '../actions';
import location from '../../img/icons/location-pointer.svg';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state={
			value: ''
		};

		this.onInputChange=(e) => {
			const val=e.target.value;

			this.setState({
				value: val
			});
		};

		this.onHandleSubmit=(e) => {
			e.preventDefault();

			this.props.dispatch(fetchWeather(`q=${this.state.value}`));
			this.props.dispatch(fetchForecast(`q=${this.state.value}`));

			this.setState({
				value: ''
			});
		};
	}

	render() {
		return (
			<div className="header-search">
				<nav className="navbar navbar-default">
					<div className="navbar-header navbar-brand">
						<img src={location} />
					</div>
					<div className="navbar-collapse collapse">
						<form className="navbar-form" onSubmit={this.onHandleSubmit}>
							<div className="input-group pull-right search-weather">
								<input type="text" className="form-control" 
									value={this.state.value}
									onChange={this.onInputChange} 
									placeholder="Enter city and get forecast weather on 5 day" />
								<span className="input-group-addon" />
							</div>
						</form>
					</div>
				</nav>
			</div>
		);
	}
}

export default connect()(Search);
